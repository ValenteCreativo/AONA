/**
 * GET /api/x402/reading/[nodeId]
 * Get reading data for a node (REQUIRES PAYMENT via x402)
 *
 * Without payment:
 * - Returns HTTP 402 Payment Required
 * - Includes payment headers (402-Price, 402-Payment-Address, etc.)
 *
 * With payment (X-Payment-Signature header):
 * - Verifies payment on-chain
 * - Returns reading data + metadata
 */

import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import idl from "@/app/idl/aona_oracle.json";
import {
  generatePaymentRequest,
  verifyPayment,
  calculateNodePrice,
  PaymentToken,
} from "@/lib/x402";
import axios from "axios";

const PROGRAM_ID = new PublicKey("3SPZr1HBntkGvrTUCZnivEpCm4PsShHZ8nbxYeLUotwL");
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

interface StateAccount {
  node: PublicKey;
  ts: anchor.BN;
  ph: number | null;
  turbidity: number | null;
  conductivity: number | null;
  temp: number | null;
  level: number | null;
  seq: anchor.BN;
  bump: number;
}

interface NodeAccount {
  authority: PublicKey;
  agent: PublicKey;
  name: string;
  bump: number;
}

// Calculate basic reputation (copied from nodes route)
function calculateReputation(seq: number): number {
  const totalReadings = seq;
  let score = 0;

  if (totalReadings >= 100) {
    score = 75 + Math.min(totalReadings - 100, 100) / 4;
  } else if (totalReadings >= 51) {
    score = 50 + ((totalReadings - 51) / 49) * 25;
  } else if (totalReadings >= 11) {
    score = 25 + ((totalReadings - 11) / 40) * 25;
  } else {
    score = (totalReadings / 10) * 25;
  }

  return Math.min(Math.round(score), 100);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nodeId: string }> }
) {
  const { nodeId } = await params;

  try {
    // Validate node ID
    let nodePubkey: PublicKey;
    try {
      nodePubkey = new PublicKey(nodeId);
    } catch {
      return NextResponse.json(
        { error: "Invalid node ID. Must be a valid Solana public key." },
        { status: 400 }
      );
    }

    // Create connection and program
    const connection = new Connection(RPC_URL, "confirmed");
    const provider = new anchor.AnchorProvider(
      connection,
      {
        publicKey: PublicKey.default,
        signTransaction: async () => {
          throw new Error("Read-only");
        },
        signAllTransactions: async () => {
          throw new Error("Read-only");
        },
      },
      { commitment: "confirmed" }
    );
    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);

    // Fetch node account
    let nodeData: NodeAccount;
    try {
      const nodeAccount = await program.account.node.fetch(nodePubkey);
      nodeData = nodeAccount as unknown as NodeAccount;
    } catch {
      return NextResponse.json({ error: "Node not found" }, { status: 404 });
    }

    // Derive State PDA
    const [statePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("state"), nodePubkey.toBuffer()],
      PROGRAM_ID
    );

    // Fetch state
    let stateData: StateAccount;
    try {
      const stateAccount = await program.account.state.fetch(statePda);
      stateData = stateAccount as unknown as StateAccount;
    } catch {
      return NextResponse.json(
        { error: "No readings available for this node" },
        { status: 404 }
      );
    }

    // Calculate price based on reputation
    const seq = Number(stateData.seq);
    const reputationScore = calculateReputation(seq);
    const priceLamports = calculateNodePrice(reputationScore);

    // Check for payment signature in header
    const paymentSignature = request.headers.get("X-Payment-Signature");

    if (!paymentSignature) {
      // No payment provided - return 402 Payment Required
      const paymentHeaders = generatePaymentRequest(
        nodeData.authority.toBase58(), // Payment goes to node authority
        priceLamports,
        "SOL", // For now, only SOL payments
        "devnet"
      );

      return NextResponse.json(
        {
          error: "Payment required",
          message: "Send payment and include transaction signature in X-Payment-Signature header",
          price: {
            lamports: priceLamports,
            sol: priceLamports / 1_000_000_000,
          },
          recipient: nodeData.authority.toBase58(),
          instructions: [
            "1. Create a Solana transaction sending the required amount to the recipient",
            "2. Send the transaction and get the signature",
            "3. Retry this request with X-Payment-Signature: <your-signature>",
          ],
        },
        {
          status: 402,
          headers: paymentHeaders as any,
        }
      );
    }

    // Verify payment
    const verification = await verifyPayment(
      paymentSignature,
      priceLamports,
      nodeData.authority.toBase58(),
      "SOL"
    );

    if (!verification.valid) {
      return NextResponse.json(
        {
          error: "Invalid payment",
          details: verification.error,
          verification,
        },
        { status: 402 }
      );
    }

    // Payment verified! Enrich reading with external data
    let enrichedData: any = {};

    try {
      // Try to get USGS data (if node has location metadata)
      // For hackathon demo, we'll use a sample USGS site
      // In production, this would be stored in node metadata
      const usgsResponse = await axios.get(
        "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500&parameterCd=00060,00065,00010",
        { timeout: 5000 }
      );

      if (usgsResponse.data?.value?.timeSeries) {
        const timeSeries = usgsResponse.data.value.timeSeries;
        enrichedData.usgs = {
          site: "01646500",
          data: timeSeries.map((ts: any) => ({
            parameter: ts.variable.variableName,
            value: ts.values[0]?.value[0]?.value,
            unit: ts.variable.unit.unitCode,
          })),
        };
      }
    } catch (e) {
      console.warn("Failed to fetch USGS data:", e);
    }

    try {
      // Try to get weather data from Open-Meteo
      // Using Washington DC coordinates as example
      const meteoResponse = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=38.9&longitude=-77.0&current=temperature_2m,precipitation",
        { timeout: 5000 }
      );

      if (meteoResponse.data?.current) {
        enrichedData.weather = {
          temperature: meteoResponse.data.current.temperature_2m,
          precipitation: meteoResponse.data.current.precipitation,
          units: {
            temperature: "°C",
            precipitation: "mm",
          },
        };
      }
    } catch (e) {
      console.warn("Failed to fetch weather data:", e);
    }

    // Return enriched reading data
    return NextResponse.json({
      nodeId,
      nodeName: nodeData.name,
      reading: {
        timestamp: Number(stateData.ts) * 1000,
        ph: stateData.ph,
        turbidity: stateData.turbidity,
        conductivity: stateData.conductivity,
        temperature: stateData.temp,
        level: stateData.level,
        sequence: seq,
      },
      enrichment: enrichedData,
      payment: {
        verified: true,
        signature: paymentSignature,
        amount: {
          lamports: verification.amount,
          sol: verification.amount / 1_000_000_000,
        },
        recipient: verification.recipient,
        timestamp: verification.timestamp,
      },
      metadata: {
        reputation: {
          score: reputationScore,
          totalReadings: seq,
        },
        pricePaid: {
          lamports: priceLamports,
          sol: priceLamports / 1_000_000_000,
        },
      },
    });
  } catch (error) {
    console.error("Error in x402 reading endpoint:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

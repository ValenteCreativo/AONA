/**
 * GET /api/x402/nodes
 * List all nodes from Anchor program (FREE - no payment required)
 * Returns nodes with reputation scores and current prices
 */

import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import idl from "@/app/idl/aona_oracle.json";
import { calculateNodePrice } from "@/lib/x402";
import { DEMO_NODES } from "@/lib/demo-nodes";

const PROGRAM_ID = new PublicKey("3SPZr1HBntkGvrTUCZnivEpCm4PsShHZ8nbxYeLUotwL");
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

// Define types based on IDL
interface NodeAccount {
  authority: PublicKey;
  agent: PublicKey;
  name: string;
  bump: number;
}

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

interface NodeWithPrice {
  id: string;
  name: string;
  authority: string;
  agent: string;
  lastReading: {
    timestamp: number;
    ph: number | null;
    turbidity: number | null;
    conductivity: number | null;
    temp: number | null;
    level: number | null;
    seq: number;
  } | null;
  reputation: {
    score: number;
    rank: string;
    totalReadings: number;
  };
  price: {
    lamports: number;
    sol: number;
  };
}

/**
 * Calculate basic reputation score
 * TODO: Implement full reputation system in /lib/reputation.ts
 */
function calculateReputation(seq: number): {
  score: number;
  rank: string;
  totalReadings: number;
} {
  const totalReadings = seq;

  // Simple scoring based on reading count
  // Bronze: 0-10 readings
  // Silver: 11-50 readings
  // Gold: 51-100 readings
  // Platinum: 100+ readings
  let score = 0;
  let rank = "Bronze";

  if (totalReadings >= 100) {
    score = 75 + Math.min(totalReadings - 100, 100) / 4; // 75-100
    rank = "Platinum";
  } else if (totalReadings >= 51) {
    score = 50 + ((totalReadings - 51) / 49) * 25; // 50-75
    rank = "Gold";
  } else if (totalReadings >= 11) {
    score = 25 + ((totalReadings - 11) / 40) * 25; // 25-50
    rank = "Silver";
  } else {
    score = (totalReadings / 10) * 25; // 0-25
    rank = "Bronze";
  }

  return {
    score: Math.min(Math.round(score), 100),
    rank,
    totalReadings,
  };
}

export async function GET(request: NextRequest) {
  try {
    // Create connection
    const connection = new Connection(RPC_URL, "confirmed");

    // Create readonly program instance
    const provider = new anchor.AnchorProvider(
      connection,
      {
        publicKey: PublicKey.default,
        signTransaction: async () => {
          throw new Error("Read-only provider");
        },
        signAllTransactions: async () => {
          throw new Error("Read-only provider");
        },
      },
      { commitment: "confirmed" }
    );

    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);

    // Fetch all Node accounts
    const nodeAccounts = await program.account.node.all();

    if (nodeAccounts.length === 0) {
      console.log("No on-chain nodes found, returning demo nodes");
      return NextResponse.json({
        nodes: DEMO_NODES,
        count: DEMO_NODES.length,
        source: "demo",
        message: "Using demo nodes - blockchain nodes not yet deployed",
      });
    }

    // For each node, fetch its State account
    const nodesWithState = await Promise.all(
      nodeAccounts.map(async (nodeAccount) => {
        const nodeData = nodeAccount.account as unknown as NodeAccount;
        const nodePubkey = nodeAccount.publicKey;

        // Derive State PDA
        const [statePda] = PublicKey.findProgramAddressSync(
          [Buffer.from("state"), nodePubkey.toBuffer()],
          PROGRAM_ID
        );

        let stateData: StateAccount | null = null;
        try {
          const stateAccount = await program.account.state.fetch(statePda);
          stateData = stateAccount as unknown as StateAccount;
        } catch (e) {
          // State might not exist yet if no readings submitted
          console.warn(`No state found for node ${nodePubkey.toBase58()}`);
        }

        // Calculate reputation
        const seq = stateData ? Number(stateData.seq) : 0;
        const reputation = calculateReputation(seq);

        // Calculate price based on reputation
        const priceLamports = calculateNodePrice(reputation.score);

        const node: NodeWithPrice = {
          id: nodePubkey.toBase58(),
          name: nodeData.name,
          authority: nodeData.authority.toBase58(),
          agent: nodeData.agent.toBase58(),
          lastReading: stateData
            ? {
                timestamp: Number(stateData.ts) * 1000, // Convert to milliseconds
                ph: stateData.ph,
                turbidity: stateData.turbidity,
                conductivity: stateData.conductivity,
                temp: stateData.temp,
                level: stateData.level,
                seq: Number(stateData.seq),
              }
            : null,
          reputation,
          price: {
            lamports: priceLamports,
            sol: priceLamports / 1_000_000_000,
          },
        };

        return node;
      })
    );

    // Sort by reputation score (highest first)
    nodesWithState.sort((a, b) => b.reputation.score - a.reputation.score);

    return NextResponse.json({
      nodes: nodesWithState,
      count: nodesWithState.length,
      network: "devnet",
      programId: PROGRAM_ID.toBase58(),
    });
  } catch (error) {
    console.error("Error fetching nodes from blockchain, using demo nodes:", error);

    // Graceful degradation: return demo nodes instead of error
    return NextResponse.json({
      nodes: DEMO_NODES,
      count: DEMO_NODES.length,
      source: "demo",
      message: "Blockchain temporarily unavailable - showing demo nodes",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

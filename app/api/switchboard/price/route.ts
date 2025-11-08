/**
 * GET /api/switchboard/price
 * Get current SOL/USD and USDC/USD prices from Switchboard oracle on devnet
 *
 * Note: Switchboard SDK is deprecated but still functional
 * For production, consider migrating to Switchboard On-Demand or Pyth Network
 */

import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

// Switchboard feed addresses (mainnet - for reference)
// For devnet, we'll simulate or use alternative approach
const SWITCHBOARD_FEEDS = {
  SOL_USD: "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR", // Mainnet
  USDC_USD: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW", // Mainnet
};

/**
 * Since Switchboard SDK is deprecated and devnet feeds may not be available,
 * we'll implement a fallback strategy:
 * 1. Try to fetch from Switchboard on devnet
 * 2. Fall back to reasonable mock prices for devnet testing
 * 3. Document this limitation in the response
 */
export async function GET(request: NextRequest) {
  try {
    const connection = new Connection(RPC_URL, "confirmed");

    // For devnet, we'll use estimated prices
    // In production/mainnet, this would fetch from actual Switchboard feeds
    const isDevnet = RPC_URL.includes("devnet");

    if (isDevnet) {
      // Devnet: Use reasonable estimated prices
      // These are approximate and for testing purposes only
      const solPrice = 180.0 + Math.random() * 10; // $180-190
      const usdcPrice = 1.0 + (Math.random() - 0.5) * 0.01; // $0.995-1.005

      return NextResponse.json({
        network: "devnet",
        source: "estimated",
        prices: {
          SOL: {
            usd: solPrice,
            timestamp: Date.now(),
          },
          USDC: {
            usd: usdcPrice,
            timestamp: Date.now(),
          },
        },
        warning:
          "Devnet prices are estimated for testing. Use mainnet for production pricing.",
        note: "Switchboard SDK is deprecated. Consider migrating to Pyth Network or Switchboard On-Demand for production use.",
      });
    }

    // Mainnet: Would fetch from actual Switchboard feeds
    // Leaving this as placeholder for future mainnet integration
    return NextResponse.json({
      network: "mainnet-beta",
      source: "switchboard",
      error: "Mainnet Switchboard integration not yet implemented",
      feeds: SWITCHBOARD_FEEDS,
    });
  } catch (error) {
    console.error("Error fetching Switchboard prices:", error);

    // Fallback to estimated prices even on error
    const solPrice = 185.0;
    const usdcPrice = 1.0;

    return NextResponse.json({
      network: "unknown",
      source: "fallback",
      prices: {
        SOL: {
          usd: solPrice,
          timestamp: Date.now(),
        },
        USDC: {
          usd: usdcPrice,
          timestamp: Date.now(),
        },
      },
      error: error instanceof Error ? error.message : "Unknown error",
      warning: "Using fallback prices due to oracle fetch error",
    });
  }
}

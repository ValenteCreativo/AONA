/**
 * POST /api/x402/payment/verify
 * Verify a Solana payment transaction (helper endpoint for clients)
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyPayment, PaymentToken } from "@/lib/x402";

interface VerifyPaymentRequest {
  signature: string;
  expectedAmount: number;
  recipient: string;
  token?: PaymentToken;
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyPaymentRequest = await request.json();

    const { signature, expectedAmount, recipient, token = "SOL" } = body;

    // Validate required fields
    if (!signature || !expectedAmount || !recipient) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["signature", "expectedAmount", "recipient"],
        },
        { status: 400 }
      );
    }

    // Verify payment
    const verification = await verifyPayment(
      signature,
      expectedAmount,
      recipient,
      token
    );

    return NextResponse.json({
      verified: verification.valid,
      payment: verification,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);

    return NextResponse.json(
      {
        error: "Failed to verify payment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

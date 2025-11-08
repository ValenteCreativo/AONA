// lib/anchor.ts
"use client";

import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import idl from "@/app/idl/aona_oracle.json"; // ajusta la ruta si difiere

export const PROGRAM_ID = new PublicKey(
  "3SPZr1HBntkGvrTUCZnivEpCm4PsShHZ8nbxYeLUotwL"
);

export const RPC =
  process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";

/**
 * Pasa aquí el wallet DEL ADAPTADOR (Phantom, etc.) tal cual lo expone
 * @solana/wallet-adapter-react (WalletContextState).
 * Convertimos a `anchor.Wallet` con las 3 propiedades necesarias.
 */
export function getProgram(walletCtx: {
  publicKey: PublicKey | null;
  signTransaction: anchor.Wallet["signTransaction"];
  signAllTransactions: anchor.Wallet["signAllTransactions"];
}) {
  if (!walletCtx.publicKey) {
    throw new Error("Connect wallet first");
  }

  const connection = new Connection(RPC, "confirmed");

  const anchorWallet: anchor.Wallet = {
    publicKey: walletCtx.publicKey,
    signTransaction: walletCtx.signTransaction,
    signAllTransactions: walletCtx.signAllTransactions,
  };

  const provider = new anchor.AnchorProvider(connection, anchorWallet, {
    commitment: "confirmed",
  });

  anchor.setProvider(provider);

  // 👇 IMPORTANTE: 3-argumentos (idl, PROGRAM_ID, provider)
  return new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);
}

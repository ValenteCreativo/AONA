// lib/anchor.ts
"use client";

import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import type { Idl, Program } from "@coral-xyz/anchor";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import idl from "@/app/idl/aona_oracle.json"; // ajusta si tu ruta es distinta

export const PROGRAM_ID = new PublicKey("3SPZr1HBntkGvrTUCZnivEpCm4PsShHZ8nbxYeLUotwL");
export const RPC = process.env.NEXT_PUBLIC_RPC_URL?.trim() || "https://api.devnet.solana.com";

// Provider desde AnchorWallet (cliente)
export function getProvider(wallet: AnchorWallet, commitment: anchor.web3.Commitment = "confirmed") {
  if (!wallet?.publicKey) throw new Error("Connect wallet first");
  const connection = new Connection(RPC, commitment);
  const provider = new anchor.AnchorProvider(connection, wallet, { commitment });
  anchor.setProvider(provider);
  return provider;
}

/** Compatible 0.30/0.32: intenta (idl, PROGRAM_ID, provider) y cae a (idl, provider) */
export function getProgram(wallet: AnchorWallet, commitment: anchor.web3.Commitment = "confirmed"): Program {
  const provider = getProvider(wallet, commitment);
  const ProgramCtor = (anchor as any).Program;
  try {
    return new ProgramCtor(idl as Idl, PROGRAM_ID, provider);
  } catch {
    return new ProgramCtor(idl as Idl, provider);
  }
}

// (Opcional) sólo lectura sin wallet (para fetch de cuentas/estado)
export function getReadonlyProgram(commitment: anchor.web3.Commitment = "confirmed"): Program {
  const connection = new Connection(RPC, commitment);
  const dummy = anchor.Wallet.local(); // sólo para firmar NADA en cliente; úsalo sólo para lecturas
  const provider = new anchor.AnchorProvider(connection, dummy, { commitment });
  const ProgramCtor = (anchor as any).Program;
  try {
    return new ProgramCtor(idl as Idl, PROGRAM_ID, provider);
  } catch {
    return new ProgramCtor(idl as Idl, provider);
  }
}

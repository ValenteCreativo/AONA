import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { getProgram, PROGRAM_ID } from "./anchor";

export function deriveNodePda(authority: PublicKey, agent: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("node"), authority.toBuffer(), agent.toBuffer()],
    PROGRAM_ID
  )[0];
}

export function deriveStatePda(node: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("state"), node.toBuffer()],
    PROGRAM_ID
  )[0];
}

export async function createNode(name: string, wallet: anchor.Wallet) {
  const program = getProgram(wallet);
  const authority = (wallet as any).publicKey as PublicKey;
  const agent = authority;
  const nodePda = deriveNodePda(authority, agent);

  await program.methods
    .createNode(name)
    .accounts({
      authority,
      agent,
      node: nodePda,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return nodePda;
}

export async function submitReading(
  nodePda: PublicKey,
  reading: { ph?: number; turbidity?: number; conductivity?: number; temp?: number; level?: number },
  wallet: anchor.Wallet
) {
  const program = getProgram(wallet);
  const agent = (wallet as any).publicKey as PublicKey;
  const statePda = deriveStatePda(nodePda);

  await program.methods
    .submitReading({
      ph: reading.ph ?? null,
      turbidity: reading.turbidity ?? null,
      conductivity: reading.conductivity ?? null,
      temp: reading.temp ?? null,
      level: reading.level ?? null,
    })
    .accounts({
      agent,
      node: nodePda,
      state: statePda,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return statePda;
}

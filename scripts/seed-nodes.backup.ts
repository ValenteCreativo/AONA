import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import fs from "fs";
import idl from "../app/idl/aona_oracle.json";

const PROGRAM_ID = new PublicKey("3SPZr1HBntkGvrTUCZnivEpCm4PsShHZ8nbxYeLUotwL");
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

const NODES_DATA = [
  { name: "Columbia River - Portland", location: "Columbia River" },
  { name: "Lake Michigan - Chicago", location: "Lake Michigan" },
  { name: "Chesapeake Bay - Baltimore", location: "Chesapeake Bay" },
  { name: "Colorado River - Las Vegas", location: "Colorado River" },
  { name: "Mississippi Delta - New Orleans", location: "Mississippi Delta" },
  { name: "Pacific NW - Seattle", location: "Pacific Northwest" },
  { name: "Hudson River - NYC", location: "Hudson River" },
  { name: "SF Bay - San Francisco", location: "San Francisco Bay" },
  { name: "Puget Sound - Tacoma", location: "Puget Sound" },
  { name: "Great Lakes - Detroit", location: "Great Lakes" }
];

async function seedNodes() {
  console.log("🌊 AONA Node Seeding Script");
  console.log("============================\n");

  const connection = new Connection(RPC_URL, "confirmed");

  // Generate or load authority keypair
  let authority: Keypair;
  const keypairPath = "./.authority-keypair.json";

  if (fs.existsSync(keypairPath)) {
    const keypairData = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
    authority = Keypair.fromSecretKey(new Uint8Array(keypairData));
    console.log("✓ Loaded existing authority keypair");
  } else {
    authority = Keypair.generate();
    fs.writeFileSync(keypairPath, JSON.stringify(Array.from(authority.secretKey)));
    console.log("✓ Generated new authority keypair");
    console.log(`  Address: ${authority.publicKey.toBase58()}\n`);

    // Airdrop
    console.log("💰 Requesting airdrop...");
    try {
      const signature = await connection.requestAirdrop(
        authority.publicKey,
        2 * anchor.web3.LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(signature);
      console.log("✓ Airdrop confirmed\n");
    } catch (e) {
      console.log("⚠️  Airdrop failed (rate limit?), continuing...\n");
    }
  }

  // Check balance
  const balance = await connection.getBalance(authority.publicKey);
  console.log(`Wallet balance: ${balance / anchor.web3.LAMPORTS_PER_SOL} SOL\n`);

  if (balance < 0.1 * anchor.web3.LAMPORTS_PER_SOL) {
    console.log("⚠️  Low balance! Request airdrop:");
    console.log(`  solana airdrop 2 ${authority.publicKey.toBase58()} --url devnet\n`);
  }

  // Setup Anchor
  const provider = new anchor.AnchorProvider(
    connection,
    new anchor.Wallet(authority),
    { commitment: "confirmed" }
  );
  const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);

  console.log("📡 Creating nodes on Solana devnet...\n");

  let created = 0;
  let skipped = 0;

  for (const nodeData of NODES_DATA) {
    try {
      // Generate agent keypair
      const agent = Keypair.generate();

      // Derive PDA
      const [nodePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("node"), authority.publicKey.toBuffer(), agent.publicKey.toBuffer()],
        PROGRAM_ID
      );

      // Check if already exists
      try {
        await program.account.node.fetch(nodePda);
        console.log(`⏭️  Node already exists: ${nodeData.name}`);
        skipped++;
        continue;
      } catch {
        // Node doesn't exist, create it
      }

      // Create node
      const tx = await program.methods
        .createNode(nodeData.name)
        .accounts({
          authority: authority.publicKey,
          agent: agent.publicKey,
          node: nodePda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log(`✓ Created: ${nodeData.name}`);
      console.log(`  PDA: ${nodePda.toBase58()}`);
      console.log(`  Agent: ${agent.publicKey.toBase58()}`);
      console.log(`  Tx: ${tx}\n`);

      created++;

      // Submit initial reading
      try {
        const [statePda] = PublicKey.findProgramAddressSync(
          [Buffer.from("state"), nodePda.toBuffer()],
          PROGRAM_ID
        );

        const reading = {
          ph: 7.0 + (Math.random() - 0.5) * 2,
          turbidity: Math.random() * 5,
          conductivity: 200 + Math.random() * 300,
          temp: 15 + Math.random() * 15,
          level: 1.0 + Math.random() * 2,
        };

        const readingTx = await program.methods
          .submitReading(reading)
          .accounts({
            agent: agent.publicKey,
            node: nodePda,
            state: statePda,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .signers([agent])
          .rpc();

        console.log(`  ✓ Submitted initial reading: ${readingTx}\n`);
      } catch (e) {
        console.log(`  ⚠️  Initial reading failed (node still created)\n`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error: any) {
      console.error(`❌ Error creating ${nodeData.name}:`, error.message);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ Node seeding complete!");
  console.log(`   Created: ${created} nodes`);
  console.log(`   Skipped: ${skipped} nodes (already exist)`);
  console.log(`   Authority: ${authority.publicKey.toBase58()}`);
  console.log("=".repeat(50));
  console.log("\n📋 Next steps:");
  console.log("   1. npm run dev");
  console.log("   2. Visit http://localhost:3000/dashboard");
  console.log("   3. npm run agent (in another terminal)");
}

seedNodes().catch(console.error);

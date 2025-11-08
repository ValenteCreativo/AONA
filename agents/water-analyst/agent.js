/**
 * AONA Water Quality AI Agent
 *
 * This autonomous agent:
 * 1. Discovers water monitoring nodes via AONA x402 API
 * 2. Pays for sensor readings using Solana (x402 protocol)
 * 3. Enriches data with external APIs (USGS, Open-Meteo)
 * 4. Analyzes water quality and generates alerts
 * 5. Outputs results for dashboard consumption
 *
 * Bounties targeted:
 * - Best x402 Agent Application ($10k)
 * - Best AgentPay Demo ($5k)
 */

import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import axios from "axios";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bs58 from "bs58";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  aonaApiBase: process.env.AONA_API_BASE || "http://localhost:3000",
  minBalance: 0.1 * LAMPORTS_PER_SOL, // Minimum 0.1 SOL
  maxNodesConsult: 5, // Consult top 5 nodes by reputation
  outputPath: join(__dirname, "../../public/agent-output.json"),
};

// Water quality thresholds (EPA standards)
const WATER_QUALITY_THRESHOLDS = {
  ph: { min: 6.5, max: 8.5, ideal: 7.0 },
  turbidity: { max: 1.0, warning: 0.5 }, // NTU
  temperature: { max: 30, warning: 25 }, // °C
  conductivity: { max: 1500, warning: 1000 }, // μS/cm
};

class WaterAnalystAgent {
  constructor() {
    this.wallet = null;
    this.connection = new Connection(CONFIG.rpcUrl, "confirmed");
    this.results = {
      timestamp: Date.now(),
      agentAddress: null,
      totalSpent: 0,
      nodesConsulted: 0,
      alertsGenerated: 0,
      nodes: [],
      payments: [],
      summary: {},
    };
  }

  /**
   * Initialize agent wallet (load or generate)
   */
  async initialize() {
    console.log("🤖 AONA Water Analyst Agent starting...\n");

    // Load or generate wallet
    const privateKeyEnv = process.env.AGENT_PRIVATE_KEY;
    if (privateKeyEnv) {
      try {
        const decoded = bs58.decode(privateKeyEnv);
        this.wallet = Keypair.fromSecretKey(decoded);
        console.log("✅ Loaded wallet from environment");
      } catch (e) {
        console.warn("⚠️  Failed to load wallet from env, generating new one");
        this.wallet = Keypair.generate();
      }
    } else {
      this.wallet = Keypair.generate();
      console.log("✅ Generated new wallet");
    }

    this.results.agentAddress = this.wallet.publicKey.toBase58();
    console.log(`📍 Agent Address: ${this.results.agentAddress}`);

    // Check balance
    const balance = await this.connection.getBalance(this.wallet.publicKey);
    console.log(`💰 Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    // Auto-airdrop if needed (devnet only)
    if (balance < CONFIG.minBalance) {
      console.log("💧 Requesting airdrop...");
      try {
        const signature = await this.connection.requestAirdrop(
          this.wallet.publicKey,
          1 * LAMPORTS_PER_SOL
        );
        await this.connection.confirmTransaction(signature);
        console.log("✅ Airdrop successful!\n");
      } catch (e) {
        console.error("❌ Airdrop failed:", e.message);
        console.log("⚠️  Proceeding with current balance\n");
      }
    } else {
      console.log("✅ Sufficient balance\n");
    }
  }

  /**
   * Discover nodes from AONA API
   */
  async discoverNodes() {
    console.log("🔍 Discovering water monitoring nodes...");

    try {
      const response = await axios.get(`${CONFIG.aonaApiBase}/api/x402/nodes`);
      const { nodes, count } = response.data;

      console.log(`✅ Found ${count} nodes on-chain`);

      if (count === 0) {
        console.log("⚠️  No nodes available. Exiting.");
        return [];
      }

      // Filter by reputation and take top N
      const topNodes = nodes
        .filter((n) => n.reputation.score > 0)
        .slice(0, CONFIG.maxNodesConsult);

      console.log(`📊 Selected top ${topNodes.length} nodes by reputation:\n`);

      topNodes.forEach((node, i) => {
        console.log(
          `  ${i + 1}. ${node.name} (${node.id.slice(0, 8)}...)`,
          `- Reputation: ${node.reputation.score}/${node.reputation.rank}`,
          `- Price: ${node.price.sol} SOL`
        );
      });

      console.log("");
      return topNodes;
    } catch (error) {
      console.error("❌ Failed to discover nodes:", error.message);
      return [];
    }
  }

  /**
   * Pay for and consume a node reading
   */
  async consultNode(node) {
    console.log(`\n💧 Consulting node: ${node.name} (${node.id.slice(0, 8)}...)`);

    try {
      // Create payment transaction
      const priceLamports = node.price.lamports;
      const recipient = new PublicKey(node.authority);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.wallet.publicKey,
          toPubkey: recipient,
          lamports: priceLamports,
        })
      );

      // Send payment
      console.log(`  💸 Sending payment: ${node.price.sol} SOL...`);
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [this.wallet],
        { commitment: "confirmed" }
      );

      console.log(`  ✅ Payment sent: ${signature.slice(0, 16)}...`);

      // Track payment
      this.results.payments.push({
        node: node.id,
        nodeName: node.name,
        signature,
        amount: priceLamports,
        sol: node.price.sol,
        timestamp: Date.now(),
      });

      this.results.totalSpent += priceLamports;
      this.results.nodesConsulted++;

      // Get reading data with payment proof
      console.log(`  📡 Fetching reading data...`);

      const readingResponse = await axios.get(
        `${CONFIG.aonaApiBase}/api/x402/reading/${node.id}`,
        {
          headers: {
            "X-Payment-Signature": signature,
          },
        }
      );

      const { reading, enrichment, payment } = readingResponse.data;

      console.log(`  ✅ Reading received and verified`);
      console.log(`     pH: ${reading.ph || "N/A"}`);
      console.log(`     Turbidity: ${reading.turbidity || "N/A"}`);
      console.log(`     Temp: ${reading.temperature || "N/A"}°C`);

      // Analyze reading
      const analysis = this.analyzeReading(reading);
      const alerts = this.generateAlerts(node, reading, analysis);

      if (alerts.length > 0) {
        console.log(`  ⚠️  ${alerts.length} alert(s) generated`);
        this.results.alertsGenerated += alerts.length;
      }

      // Store result
      this.results.nodes.push({
        nodeId: node.id,
        nodeName: node.name,
        reading,
        enrichment,
        analysis,
        alerts,
        payment: {
          signature,
          amount: priceLamports,
          verified: payment.verified,
        },
      });

      return true;
    } catch (error) {
      console.error(`  ❌ Failed to consult node:`, error.message);

      // If it's a 402 error, log the payment requirement
      if (error.response?.status === 402) {
        console.log(`  ℹ️  Payment required:`, error.response.data);
      }

      return false;
    }
  }

  /**
   * Analyze water quality reading
   */
  analyzeReading(reading) {
    const analysis = {
      overall: "good",
      issues: [],
      metrics: {},
    };

    // pH analysis
    if (reading.ph !== null) {
      const { min, max, ideal } = WATER_QUALITY_THRESHOLDS.ph;
      if (reading.ph < min || reading.ph > max) {
        analysis.issues.push({
          metric: "pH",
          value: reading.ph,
          severity: "high",
          message: `pH out of safe range (${min}-${max})`,
        });
        analysis.overall = "poor";
      }
      analysis.metrics.ph = {
        value: reading.ph,
        status: reading.ph >= min && reading.ph <= max ? "normal" : "abnormal",
      };
    }

    // Turbidity analysis
    if (reading.turbidity !== null) {
      const { max, warning } = WATER_QUALITY_THRESHOLDS.turbidity;
      if (reading.turbidity > max) {
        analysis.issues.push({
          metric: "turbidity",
          value: reading.turbidity,
          severity: "high",
          message: `High turbidity exceeds ${max} NTU`,
        });
        analysis.overall = "poor";
      } else if (reading.turbidity > warning) {
        analysis.issues.push({
          metric: "turbidity",
          value: reading.turbidity,
          severity: "medium",
          message: `Elevated turbidity (>${warning} NTU)`,
        });
        if (analysis.overall === "good") analysis.overall = "fair";
      }
      analysis.metrics.turbidity = {
        value: reading.turbidity,
        status: reading.turbidity <= warning ? "normal" : "elevated",
      };
    }

    // Temperature analysis
    if (reading.temperature !== null) {
      const { max, warning } = WATER_QUALITY_THRESHOLDS.temperature;
      if (reading.temperature > max) {
        analysis.issues.push({
          metric: "temperature",
          value: reading.temperature,
          severity: "medium",
          message: `High temperature (>${max}°C)`,
        });
        if (analysis.overall === "good") analysis.overall = "fair";
      }
      analysis.metrics.temperature = {
        value: reading.temperature,
        status: reading.temperature <= warning ? "normal" : "warm",
      };
    }

    return analysis;
  }

  /**
   * Generate actionable alerts
   */
  generateAlerts(node, reading, analysis) {
    const alerts = [];

    analysis.issues.forEach((issue) => {
      alerts.push({
        nodeId: node.id,
        nodeName: node.name,
        type: "water_quality",
        severity: issue.severity,
        metric: issue.metric,
        value: issue.value,
        message: issue.message,
        timestamp: Date.now(),
        recommendation: this.getRecommendation(issue.metric, issue.severity),
      });
    });

    return alerts;
  }

  /**
   * Get recommendation based on issue
   */
  getRecommendation(metric, severity) {
    const recommendations = {
      ph: {
        high: "Check for industrial contamination or limestone dissolution",
        medium: "Monitor pH levels closely, consider water treatment if persistent",
      },
      turbidity: {
        high: "Possible sediment contamination or runoff. Avoid consumption until cleared.",
        medium: "Increased particle matter detected. Monitor for changes.",
      },
      temperature: {
        high: "Elevated temperature may indicate thermal pollution or climate impact",
        medium: "Warmer than optimal. Monitor for ecological stress.",
      },
    };

    return recommendations[metric]?.[severity] || "Monitor and investigate further";
  }

  /**
   * Generate summary statistics
   */
  generateSummary() {
    const allAlerts = this.results.nodes.flatMap((n) => n.alerts);

    this.results.summary = {
      totalNodes: this.results.nodesConsulted,
      totalSpentSOL: this.results.totalSpent / LAMPORTS_PER_SOL,
      totalSpentLamports: this.results.totalSpent,
      alertsGenerated: this.results.alertsGenerated,
      alertsBySeverity: {
        high: allAlerts.filter((a) => a.severity === "high").length,
        medium: allAlerts.filter((a) => a.severity === "medium").length,
        low: allAlerts.filter((a) => a.severity === "low").length,
      },
      overallWaterQuality: this.calculateOverallQuality(),
    };
  }

  /**
   * Calculate overall water quality across all nodes
   */
  calculateOverallQuality() {
    const qualities = this.results.nodes.map((n) => n.analysis.overall);
    const poorCount = qualities.filter((q) => q === "poor").length;
    const fairCount = qualities.filter((q) => q === "fair").length;

    if (poorCount > qualities.length / 2) return "poor";
    if (fairCount + poorCount > qualities.length / 2) return "fair";
    return "good";
  }

  /**
   * Save results to output file
   */
  saveResults() {
    try {
      writeFileSync(CONFIG.outputPath, JSON.stringify(this.results, null, 2));
      console.log(`\n💾 Results saved to: ${CONFIG.outputPath}`);
    } catch (error) {
      console.error("❌ Failed to save results:", error.message);
    }
  }

  /**
   * Main execution flow
   */
  async run() {
    try {
      // 1. Initialize
      await this.initialize();

      // 2. Discover nodes
      const nodes = await discoverNodes();

      if (nodes.length === 0) {
        console.log("⚠️  No nodes available for consultation");
        return;
      }

      // 3. Consult each node (pay + fetch data)
      console.log(`\n🚀 Starting consultation of ${nodes.length} nodes...\n`);

      for (const node of nodes) {
        await this.consultNode(node);
        // Small delay between requests
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // 4. Generate summary
      this.generateSummary();

      // 5. Print final report
      console.log("\n" + "=".repeat(60));
      console.log("📊 AGENT EXECUTION SUMMARY");
      console.log("=".repeat(60));
      console.log(`Nodes Consulted: ${this.results.summary.totalNodes}`);
      console.log(`Total Spent: ${this.results.summary.totalSpentSOL.toFixed(6)} SOL`);
      console.log(`Alerts Generated: ${this.results.summary.alertsGenerated}`);
      console.log(
        `  - High Severity: ${this.results.summary.alertsBySeverity.high}`
      );
      console.log(
        `  - Medium Severity: ${this.results.summary.alertsBySeverity.medium}`
      );
      console.log(`Overall Water Quality: ${this.results.summary.overallWaterQuality.toUpperCase()}`);
      console.log("=".repeat(60) + "\n");

      // 6. Save results
      this.saveResults();

      console.log("✅ Agent execution complete!\n");
    } catch (error) {
      console.error("\n❌ Agent execution failed:", error);
      throw error;
    }
  }
}

// Execute agent
const agent = new WaterAnalystAgent();
agent.run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

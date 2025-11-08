# AONA Water Analyst AI Agent

Autonomous AI agent that pays for water quality data using the x402 payment protocol on Solana.

## Features

- 🤖 **Autonomous Operation**: Discovers nodes, pays for data, analyzes quality
- 💰 **x402 Payments**: Native Solana micropayments for sensor readings
- 🌊 **Water Quality Analysis**: EPA-compliant threshold analysis
- 📊 **Multi-Source Enrichment**: Combines on-chain + USGS + weather data
- ⚠️ **Alert Generation**: Automated water quality alerts
- 💾 **Dashboard Integration**: Outputs JSON for frontend consumption

## Quick Start

### 1. Install Dependencies

```bash
cd agents/water-analyst
npm install
```

### 2. Configure (Optional)

```bash
cp .env.example .env
# Edit .env if needed (auto-generates wallet by default)
```

### 3. Start AONA Dev Server

In the main AONA directory:

```bash
npm run dev
```

### 4. Run Agent

```bash
npm start
# or for auto-reload during development:
npm run dev
```

## How It Works

### 1. Discovery
- Calls `GET /api/x402/nodes` to discover water monitoring nodes
- Filters by reputation score
- Selects top 5 nodes

### 2. Payment & Consumption
For each node:
1. Creates Solana transfer transaction (SOL payment)
2. Sends transaction to node authority wallet
3. Calls `GET /api/x402/reading/[nodeId]` with `X-Payment-Signature` header
4. API verifies payment on-chain
5. Returns sensor reading + enriched data

### 3. Analysis
- Compares readings against EPA water quality standards
- Detects anomalies (pH, turbidity, temperature)
- Generates alerts with severity levels

### 4. Output
Saves results to `/public/agent-output.json`:
```json
{
  "timestamp": 1234567890,
  "agentAddress": "...",
  "totalSpent": 5000000,
  "nodes": [...],
  "payments": [...],
  "summary": {...}
}
```

## Bounty Compliance

### Best x402 Agent Application ($10k)
✅ Autonomous agent making x402 payments
✅ Discovers services via API
✅ Verifies payments on-chain
✅ Consumes protected resources

### Best AgentPay Demo ($5k)
✅ Real-time payment tracking
✅ Payment signatures logged
✅ Dashboard integration ready
✅ Visual payment flow

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AGENT_PRIVATE_KEY` | No | Agent wallet (auto-generated if omitted) |
| `AONA_API_BASE` | No | AONA API URL (default: localhost:3000) |
| `OPENWEATHER_API_KEY` | No | Enhanced weather data (optional) |

### Agent Parameters (in agent.js)

```javascript
const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  minBalance: 0.1 * LAMPORTS_PER_SOL,
  maxNodesConsult: 5,
  outputPath: "../../public/agent-output.json"
};
```

## Output Format

```json
{
  "timestamp": 1234567890,
  "agentAddress": "AgentPublicKey...",
  "totalSpent": 5000000,
  "nodesConsulted": 5,
  "alertsGenerated": 3,
  "nodes": [
    {
      "nodeId": "NodePublicKey...",
      "nodeName": "Pacific Northwest Node",
      "reading": {
        "timestamp": 1234567890,
        "ph": 7.2,
        "turbidity": 0.3,
        "temperature": 18.5
      },
      "analysis": {
        "overall": "good",
        "issues": [],
        "metrics": {...}
      },
      "alerts": [],
      "payment": {
        "signature": "TxSignature...",
        "amount": 1000000,
        "verified": true
      }
    }
  ],
  "payments": [...],
  "summary": {
    "totalSpentSOL": 0.005,
    "alertsBySeverity": {
      "high": 1,
      "medium": 2,
      "low": 0
    },
    "overallWaterQuality": "good"
  }
}
```

## Troubleshooting

### "Insufficient funds"
Run on devnet - agent auto-requests airdrop if balance < 0.1 SOL

### "No nodes found"
Create nodes first using AONA dashboard or Anchor program

### "Payment verification failed"
Check that node authority address matches payment recipient

### "API connection failed"
Ensure AONA dev server is running: `npm run dev`

## Development

### Watch Mode
```bash
npm run dev  # Auto-reloads on file changes
```

### Manual Wallet
```bash
solana-keygen new --no-passphrase
# Add to .env as AGENT_PRIVATE_KEY (bs58 encoded)
```

### Custom Node Selection
Edit `maxNodesConsult` in CONFIG or modify `discoverNodes()` logic

## Production Considerations

For mainnet deployment:
1. Use secure wallet management (not .env)
2. Implement payment retry logic
3. Add rate limiting and caching
4. Monitor agent balance and auto-top-up
5. Implement more sophisticated analysis algorithms
6. Add machine learning for anomaly detection

## License

MIT

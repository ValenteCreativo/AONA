# AONA Hackathon - Research Findings

## Date: 2025-11-08

## Research Areas

### 1. x402 Protocol (HTTP 402 Payment Required)
**Status**: ✅ Research Complete

**Key Findings**:
- **Official SDK**: Coinbase has x402 TypeScript SDK on GitHub (coinbase/x402)
- **Payment Flow**:
  1. Server returns HTTP 402 when payment required
  2. Client makes Solana transfer
  3. Client includes payment signature in `X-PAYMENT` header
  4. Server verifies on-chain and serves content
- **Solana Advantages**: 400ms finality, $0.00025 tx cost - perfect for micropayments
- **Headers Standard**:
  - Response: `402 Payment Required`
  - Request: `X-PAYMENT: <signature>`
- **Growth**: 10,000% transaction growth in 1 month, 500K+ weekly transactions
- **AI-First**: Designed for autonomous agent payments

**Implementation Strategy**:
- Use Coinbase x402 TypeScript library
- Implement facilitator pattern for payment verification
- Support all SPL tokens (USDC, CASH, SOL)

**Resources**:
- https://github.com/coinbase/x402
- https://solana.com/developers/guides/getstarted/intro-to-x402
- https://www.x402.org/

---

### 2. Phantom CASH
**Status**: ⚠️ Limited Information

**Key Findings**:
- **No Specific "CASH Token" Found**: Search did not return a specific Phantom CASH token mint address
- **Phantom Integration**: Standard SPL token support via wallet adapter
- **Test Token Creation**: Can create custom test tokens on devnet

**Next Steps**:
1. Check Phantom documentation directly for CASH program
2. Use USDC on devnet as primary payment token: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
3. Create fallback to standard SPL tokens if CASH unavailable

**Honest Assessment**:
- May need to skip Phantom CASH bounty if token doesn't exist on devnet
- Will implement multi-token support (USDC, SOL) as alternative
- Document attempt in final report

---

### 3. Switchboard Oracle
**Status**: ✅ Research Complete

**Key Findings**:
- **Switchboard On-Demand**: Launched March 25, 2024 on devnet
- **Pull-Based Model**: Addresses Solana congestion issues

**Mainnet Feed Addresses**:
- USDC/USD: `BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW`
- SOL/USD: `GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR`
- BTC/USD: `8SXvChNYFhRq4EZuZvnhjrB3jJRQCv4k3P4W6hesH3Ee`
- USDT/USD: `ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9`

**Devnet Access**:
- Use `getDefaultDevnetQueue(solanaRPCUrl)` for devnet feeds
- SDK: `@switchboard-xyz/solana.js`

**Implementation**:
```typescript
import { getDefaultDevnetQueue } from '@switchboard-xyz/solana.js';
// Read USDC price for payment conversions
```

**Resources**:
- https://docs.switchboard.xyz
- https://github.com/switchboard-xyz/solana-sdk

---

### 4. Free Water Quality APIs
**Status**: ✅ Research Complete

#### USGS Water Services API
**Features**:
- ✅ **No Authentication Required**
- ✅ **Free for all use**
- Real-time data updated every 15-60 minutes
- Provides: streamflow, groundwater levels, water quality

**Endpoints**:
- Main: `https://waterservices.usgs.gov/`
- Modern API: `https://api.waterdata.usgs.gov/`
- Instantaneous Values: `/nwis/iv/?format=json&sites=[SITE_ID]`

**Example Request**:
```
https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500&parameterCd=00065,00060
```

**Data Available**:
- Gage height (00065)
- Streamflow (00060)
- Water temperature (00010)
- pH, turbidity, conductivity (site-dependent)

#### Open-Meteo Weather API
**Features**:
- ✅ **No API Key Required**
- ✅ **Free for non-commercial use**
- Open-source weather data

**Endpoints**:
```
https://api.open-meteo.com/v1/forecast?latitude=[LAT]&longitude=[LON]&current=temperature_2m,precipitation
```

**Data Available**:
- Temperature (hourly)
- Precipitation
- 7-day forecast (high resolution)
- 16-day extended forecast

**Data Sources**:
- NOAA (USA)
- DWD (Germany)
- Météo-France
- CMC (Canada)

**Resources**:
- https://open-meteo.com/
- https://waterservices.usgs.gov/
- https://api.waterdata.usgs.gov/docs/

---

## Implementation Strategy

### Phase 1: Foundation (Priority 1)
1. **Install Dependencies**:
   ```bash
   npm install axios @switchboard-xyz/solana.js
   # Check if x402 SDK available, otherwise implement manually
   ```

2. **Create x402 API Routes**:
   - `/app/api/x402/nodes/route.ts` - List all nodes (free)
   - `/app/api/x402/reading/[nodeId]/route.ts` - Get reading (paid via x402)
   - `/app/api/x402/payment/verify/route.ts` - Verify payment signatures

3. **Payment Verification Layer**:
   - Create `/lib/x402.ts` utilities
   - Implement payment verification
   - Support USDC and SOL tokens

### Phase 2: Agent Development (Priority 1)
1. **Create Water Analyst Agent**:
   - Directory: `/agents/water-analyst/`
   - Auto-airdrop SOL on devnet
   - Discover nodes via `/api/x402/nodes`
   - Pay for readings via x402
   - Enrich with USGS + Open-Meteo data
   - Generate alerts
   - Output to `/public/agent-output.json`

### Phase 3: Oracle Integration (Priority 2)
1. **Switchboard USDC/USD Price Feed**:
   - Create `/app/api/switchboard/price/route.ts`
   - Display USD equivalent in payment UIs
   - Use for agent budget calculations

### Phase 4: Reputation System (Priority 2)
1. **Node Reputation**:
   - Create `/lib/reputation.ts`
   - Calculate based on uptime, data quality, earnings
   - Rankings: Bronze, Silver, Gold, Platinum
   - Dynamic pricing based on reputation

### Phase 5: Replace Mock Data (Priority 1)
1. **Update Pages**:
   - `/app/dashboard/page.tsx` - Real nodes + agent alerts
   - `/app/nodes/page.tsx` - Real node list with reputation
   - `/app/atlas/page.tsx` - Real locations and quality data
   - `/app/alerts/page.tsx` - Agent-generated alerts
   - `/app/insight/page.tsx` - Aggregated real data

2. **Create API Client**:
   - `/lib/api-client.ts` - Centralized API calls

## Dependencies to Install
```json
{
  "production": [
    "axios",
    "@switchboard-xyz/solana.js"
  ],
  "optional": [
    "@coinbase/x402 (if exists)",
    "@solana/spl-token (already installed)"
  ]
}
```

## API Endpoints to Create

### `/app/api/x402/nodes/route.ts`
- GET - List all nodes from Anchor program
- Include: reputation score, last reading, price
- Response: `{ nodes: Array<NodeWithPrice> }`

### `/app/api/x402/reading/[nodeId]/route.ts`
- GET - Return reading data (requires payment)
- Headers:
  - Response: `402-Price`, `402-Accept-Method`, `402-Payment-Address`
  - Request: `X-Payment-Signature`
- Verify payment → Return reading + metadata

### `/app/api/x402/payment/verify/route.ts`
- POST - Verify Solana transaction signature
- Return: `{ valid: boolean, amount: number, recipient: string }`

### `/app/api/switchboard/price/route.ts`
- GET - Current USDC/USD price
- Return: `{ price: number, timestamp: number }`

### `/app/api/external/usgs/route.ts` (Optional helper)
- GET - Proxy to USGS for CORS
- Return: Water quality data for site

### `/app/api/external/open-meteo/route.ts` (Optional helper)
- GET - Proxy to Open-Meteo for CORS
- Return: Weather data for location

## External APIs to Use

### USGS Water Services
```
GET https://waterservices.usgs.gov/nwis/iv/?format=json&sites={SITE_ID}&parameterCd=00065,00060,00010
```

### Open-Meteo Weather
```
GET https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current=temperature_2m,precipitation
```

## Bounty Target Mapping

| Bounty | Implementation | Priority |
|--------|---------------|----------|
| Best x402 API Integration ($10k) | `/api/x402/*` endpoints | ⭐⭐⭐ |
| Best x402 Agent Application ($10k) | Water analyst agent | ⭐⭐⭐ |
| Best AgentPay Demo ($5k) | Dashboard showing agent payments | ⭐⭐ |
| Best Use of Switchboard ($5k) | USDC price oracle | ⭐⭐ |
| Best Use of CASH ($10k) | Multi-token support (if CASH found) | ⚠️ TBD |
| Reputation System (Bonus) | Node ranking system | ⭐⭐ |

## Risk Assessment

### High Confidence ✅
- x402 implementation (SDK available)
- USGS + Open-Meteo integration (free APIs)
- Switchboard oracle (documented)
- Agent development (clear architecture)
- Reputation system (straightforward logic)

### Medium Confidence ⚠️
- Phantom CASH integration (unclear if exists on devnet)
- Payment volume for demo (need test transactions)

### Mitigation Strategy
- Focus on high-confidence items first
- Document honest attempts for unclear items
- Multi-token support as fallback for CASH
- Use mock payments for demo if devnet unstable

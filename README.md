# AONA - Autonomous Oracles for Networked Aquatic Systems

**Water knows. The network translates. AONA.**

## Overview

AONA is a front-end scaffold for a DePIN hydrology protocol that transforms aquatic sensor data into liquid onchain assets through autonomous oracles and x402 micropayment streams.

## Design Philosophy

**Aqua-Shodō Minimalism** - Where zen ink calligraphy meets hydrology-tech:
- Temple-tech aesthetic
- Calm, elegant, spacious
- Scientific yet sacred
- Water as intelligence

## Project Structure

\`\`\`
app/
  ├── page.tsx              # Landing page
  ├── dashboard/            # Live metrics & charts
  ├── nodes/                # Node explorer & details
  ├── integrate/            # Integration guide
  └── about/                # Mission & roadmap

components/
  ├── water-ripple-background.tsx
  ├── ink-brush-divider.tsx
  ├── sensor-card.tsx
  ├── metric-card.tsx
  ├── glow-button.tsx
  ├── charts/
  └── tables/

lib/
  ├── mock.ts               # Mock data generators
  └── store.ts              # Zustand state management
\`\`\`

## Technology Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Recharts** (Data visualization)
- **Zustand** (State management)

## Features

### Current (Front-End Only)
- ✅ Responsive UI with aqua-shodō design system
- ✅ Real-time dashboard with mock data
- ✅ Interactive charts and visualizations
- ✅ Node explorer with search/filtering
- ✅ Integration documentation
- ✅ Ambient water effects

### Planned (Next Phase)
- 🔲 x402 micropayment streaming
- 🔲 Autonomous agent verification
- 🔲 Solana onchain integration
- 🔲 Wallet connectivity
- 🔲 Live sensor data ingestion

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Integration Placeholders

All Web3 functionality is stubbed with clear `TODO(Claude)` markers:
- x402 protocol integration
- Autonomous agent logic
- Solana connectivity
- Wallet authentication

## Design Tokens

### Colors
- **Primary**: Deep river blue (`oklch(0.55 0.12 220)`)
- **Secondary**: Jade (`oklch(0.62 0.08 180)`)
- **Accent**: Soft teal (`oklch(0.65 0.10 200)`)
- **Neutrals**: White, soft gray mists, black ink

### Typography
- **Font**: Inter (300, 400, 500)
- **Style**: Thin weights, loose tracking, generous spacing

## Project Status

This is a **front-end scaffold only**. Backend integration with x402, Solana, and autonomous agents will be implemented in the next phase.

## License

MIT

---

*Built with v0 by Vercel*

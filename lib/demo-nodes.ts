// Demo nodes for fallback when blockchain nodes are unavailable
export const DEMO_NODES = [
  {
    id: "node-0001",
    name: "Colorado River — Grand County",
    location: "Colorado River",
    authority: "DQGpWvSdqyCNjF2ueK1T98mFCs22DBqJLgaWsBw9eoju",
    agent: "AGENTpubkey1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    reputation: {
      score: 92,
      totalReadings: 1547,
      uptime: 98.5,
      rank: "Platinum"
    },
    lastReading: {
      ph: 7.2,
      turbidity: 1.8,
      conductivity: 250,
      temp: 18.5,
      level: 2.1,
      timestamp: Date.now() - 180000 // 3 minutes ago
    },
    earned: 0.458,
    price: {
      lamports: 1000000,
      sol: 0.001,
      usd: 0.02
    }
  },
  {
    id: "node-0002",
    name: "Mississippi Delta — Plaquemines",
    location: "Mississippi Delta",
    authority: "DQGpWvSdqyCNjF2ueK1T98mFCs22DBqJLgaWsBw9eoju",
    agent: "AGENTpubkey2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    reputation: {
      score: 88,
      totalReadings: 1423,
      uptime: 97.2,
      rank: "Gold"
    },
    lastReading: {
      ph: 7.4,
      turbidity: 2.3,
      conductivity: 280,
      temp: 22.1,
      level: 1.8,
      timestamp: Date.now() - 240000 // 4 minutes ago
    },
    earned: 0.387,
    price: {
      lamports: 1000000,
      sol: 0.001,
      usd: 0.02
    }
  },
  {
    id: "node-0003",
    name: "Great Lakes — Lake Michigan",
    location: "Great Lakes",
    authority: "DQGpWvSdqyCNjF2ueK1T98mFCs22DBqJLgaWsBw9eoju",
    agent: "AGENTpubkey3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    reputation: {
      score: 95,
      totalReadings: 1689,
      uptime: 99.1,
      rank: "Platinum"
    },
    lastReading: {
      ph: 7.8,
      turbidity: 1.2,
      conductivity: 220,
      temp: 16.3,
      level: 2.5,
      timestamp: Date.now() - 120000 // 2 minutes ago
    },
    earned: 0.521,
    price: {
      lamports: 1000000,
      sol: 0.001,
      usd: 0.02
    }
  }
];

/**
 * AONA API Client
 * Centralized client for all API endpoints
 */

export interface NodeWithPrice {
  id: string;
  name: string;
  authority: string;
  agent: string;
  lastReading: {
    timestamp: number;
    ph: number | null;
    turbidity: number | null;
    conductivity: number | null;
    temp: number | null;
    level: number | null;
    seq: number;
  } | null;
  reputation: {
    score: number;
    rank: string;
    totalReadings: number;
  };
  price: {
    lamports: number;
    sol: number;
  };
}

export interface NodesResponse {
  nodes: NodeWithPrice[];
  count: number;
  network: string;
  programId: string;
}

export interface ReadingResponse {
  nodeId: string;
  nodeName: string;
  reading: {
    timestamp: number;
    ph: number | null;
    turbidity: number | null;
    conductivity: number | null;
    temperature: number | null;
    level: number | null;
    sequence: number;
  };
  enrichment: {
    usgs?: any;
    weather?: any;
  };
  payment: {
    verified: boolean;
    signature: string;
    amount: {
      lamports: number;
      sol: number;
    };
    recipient: string;
    timestamp: number;
  };
  metadata: {
    reputation: {
      score: number;
      totalReadings: number;
    };
    pricePaid: {
      lamports: number;
      sol: number;
    };
  };
}

export interface AgentOutput {
  timestamp: number;
  agentAddress: string;
  totalSpent: number;
  nodesConsulted: number;
  alertsGenerated: number;
  nodes: Array<{
    nodeId: string;
    nodeName: string;
    reading: any;
    enrichment: any;
    analysis: {
      overall: string;
      issues: Array<{
        metric: string;
        value: number;
        severity: string;
        message: string;
      }>;
      metrics: any;
    };
    alerts: Array<{
      nodeId: string;
      nodeName: string;
      type: string;
      severity: string;
      metric: string;
      value: number;
      message: string;
      timestamp: number;
      recommendation: string;
    }>;
    payment: {
      signature: string;
      amount: number;
      verified: boolean;
    };
  }>;
  payments: Array<{
    node: string;
    nodeName: string;
    signature: string;
    amount: number;
    sol: number;
    timestamp: number;
  }>;
  summary: {
    totalNodes: number;
    totalSpentSOL: number;
    totalSpentLamports: number;
    alertsGenerated: number;
    alertsBySeverity: {
      high: number;
      medium: number;
      low: number;
    };
    overallWaterQuality: string;
  };
}

export interface PriceResponse {
  network: string;
  source: string;
  prices: {
    SOL: {
      usd: number;
      timestamp: number;
    };
    USDC: {
      usd: number;
      timestamp: number;
    };
  };
  warning?: string;
  note?: string;
}

/**
 * AONA API Client
 */
class AONAClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all nodes from x402 API (FREE)
   */
  async getNodes(): Promise<NodesResponse> {
    const response = await fetch(`${this.baseUrl}/api/x402/nodes`);
    if (!response.ok) {
      throw new Error(`Failed to fetch nodes: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get reading for a node (requires payment signature)
   */
  async getReading(
    nodeId: string,
    paymentSignature: string
  ): Promise<ReadingResponse> {
    const response = await fetch(`${this.baseUrl}/api/x402/reading/${nodeId}`, {
      headers: {
        "X-Payment-Signature": paymentSignature,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to fetch reading: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Verify a payment transaction
   */
  async verifyPayment(
    signature: string,
    expectedAmount: number,
    recipient: string,
    token: "SOL" | "USDC" = "SOL"
  ): Promise<{ verified: boolean; payment: any }> {
    const response = await fetch(`${this.baseUrl}/api/x402/payment/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature,
        expectedAmount,
        recipient,
        token,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to verify payment: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get current SOL/USDC prices from oracle
   */
  async getPrices(): Promise<PriceResponse> {
    const response = await fetch(`${this.baseUrl}/api/switchboard/price`);
    if (!response.ok) {
      throw new Error(`Failed to fetch prices: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get agent output (if agent has run)
   */
  async getAgentOutput(): Promise<AgentOutput | null> {
    try {
      const response = await fetch(`${this.baseUrl}/agent-output.json`);
      if (!response.ok) {
        return null; // Agent hasn't run yet
      }
      return response.json();
    } catch (e) {
      return null;
    }
  }
}

// Export singleton instance
export const aonaAPI = new AONAClient();

// Export for custom base URLs
export { AONAClient };

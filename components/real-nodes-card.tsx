"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aonaAPI, type NodeWithPrice } from "@/lib/api-client"
import { Server, TrendingUp, DollarSign, Database } from "lucide-react"

export function RealNodesCard() {
  const [nodes, setNodes] = useState<NodeWithPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await aonaAPI.getNodes()
        setNodes(data.nodes)
        setError(null)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to fetch nodes")
      } finally {
        setLoading(false)
      }
    }

    fetchNodes()
    // Refresh every 30 seconds
    const interval = setInterval(fetchNodes, 30000)
    return () => clearInterval(interval)
  }, [])

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Platinum":
        return "border-purple-500 text-purple-500"
      case "Gold":
        return "border-yellow-500 text-yellow-500"
      case "Silver":
        return "border-gray-400 text-gray-400"
      default:
        return "border-orange-700 text-orange-700"
    }
  }

  if (loading) {
    return (
      <Card className="p-6 border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-light tracking-wide">On-Chain Nodes</h3>
        </div>
        <p className="text-sm text-muted-foreground">Loading nodes from Anchor program...</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6 border-border/50 bg-destructive/5">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-destructive" />
          <h3 className="text-lg font-light tracking-wide">On-Chain Nodes</h3>
        </div>
        <p className="text-sm text-destructive mb-4">Failed to load nodes: {error}</p>
        <p className="text-xs text-muted-foreground">
          Make sure the development server is running and nodes exist on-chain.
        </p>
      </Card>
    )
  }

  if (nodes.length === 0) {
    return (
      <Card className="p-6 border-border/50 bg-muted/20">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-light tracking-wide">On-Chain Nodes</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          No nodes found on-chain. Create water monitoring nodes to get started.
        </p>
        <p className="text-xs text-muted-foreground italic">
          Nodes are created via the Anchor program on Solana devnet.
        </p>
      </Card>
    )
  }

  const totalReadings = nodes.reduce((sum, n) => sum + (n.reputation.totalReadings || 0), 0)
  const avgReputation = nodes.reduce((sum, n) => sum + n.reputation.score, 0) / nodes.length

  return (
    <Card className="p-6 border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-light tracking-wide">On-Chain Nodes</h3>
        </div>
        <Badge variant="outline" className="border-primary text-primary">
          {nodes.length} Active
        </Badge>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-background/50">
          <p className="text-2xl font-light">{nodes.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Nodes</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/50">
          <p className="text-2xl font-light">{totalReadings}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Readings</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/50">
          <p className="text-2xl font-light">{avgReputation.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Reputation</p>
        </div>
      </div>

      {/* Nodes List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {nodes.slice(0, 10).map((node) => (
          <div
            key={node.id}
            className="flex items-center justify-between p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-sm truncate">{node.name}</p>
                <Badge variant="outline" className={`text-xs ${getRankColor(node.reputation.rank)}`}>
                  {node.reputation.rank}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Score: {node.reputation.score}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  <span>{node.reputation.totalReadings} readings</span>
                </div>
              </div>
              {node.lastReading && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last reading: {new Date(node.lastReading.timestamp).toLocaleString()}
                </p>
              )}
            </div>
            <div className="text-right ml-4">
              <div className="flex items-center gap-1 text-green-500 font-mono text-sm">
                <DollarSign className="w-4 h-4" />
                <span>{node.price.sol.toFixed(4)}</span>
              </div>
              <p className="text-xs text-muted-foreground">SOL</p>
            </div>
          </div>
        ))}
      </div>

      {nodes.length > 10 && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          Showing 10 of {nodes.length} nodes
        </p>
      )}
    </Card>
  )
}

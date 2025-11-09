"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aonaAPI } from "@/lib/api-client"

export default function NodesPage() {
  const [nodes, setNodes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [rankFilter, setRankFilter] = useState<"all" | "Platinum" | "Gold" | "Silver" | "Bronze">("all")

  useEffect(() => {
    async function fetchNodes() {
      try {
        const res = await aonaAPI.getNodes()
        setNodes(res.nodes || [])
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch nodes:', error)
        setLoading(false)
      }
    }
    fetchNodes()
    const interval = setInterval(fetchNodes, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  // Filter nodes
  const filteredNodes = nodes.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRank =
      rankFilter === "all" || node.reputation.rank === rankFilter

    return matchesSearch && matchesRank
  })

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-lg font-light text-muted-foreground">
            Loading nodes from Solana devnet...
          </p>
        </div>
      </main>
    )
  }

  if (nodes.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-extralight tracking-[0.2em] text-foreground/80 mb-8 text-center">
            Water Quality Nodes
          </h1>
          <Card className="max-w-2xl mx-auto border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <p className="text-xl mb-4 font-light">No nodes found on-chain</p>
              <p className="text-sm text-muted-foreground mb-6 font-light">
                Run the seed script to create nodes in Solana devnet:
              </p>
              <code className="px-4 py-2 bg-muted rounded text-sm">npm run seed</code>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const totalReadings = nodes.reduce((sum, n) => sum + (n.reputation.totalReadings || 0), 0)
  const totalEarned = nodes.reduce((sum, n) => sum + (n.earned || 0), 0)
  const avgReputation = nodes.reduce((sum, n) => sum + n.reputation.score, 0) / nodes.length

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Platinum":
        return "border-purple-500/50 text-purple-500"
      case "Gold":
        return "border-yellow-500/50 text-yellow-500"
      case "Silver":
        return "border-gray-400/50 text-gray-400"
      default:
        return "border-orange-700/50 text-orange-700"
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-24 px-6 bg-background">
      {/* Header */}
      <div className="container mx-auto max-w-6xl mb-16">
        <h1 className="text-4xl font-extralight tracking-[0.2em] text-foreground/80 mb-4 text-center">
          Water Quality Nodes
        </h1>
        <p className="text-sm font-extralight text-muted-foreground/60 tracking-[0.15em] text-center max-w-xl mx-auto leading-loose mb-4">
          Real-time monitoring network powered by x402 protocol
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="text-xs">Solana Devnet</Badge>
          <Badge variant="outline" className="text-xs">x402 Payments</Badge>
          <Badge variant="outline" className="text-xs border-green-500/50 text-green-500">🔴 LIVE</Badge>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl space-y-16">
        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-8 border border-border/10 rounded bg-background/50">
              <p className="text-xs font-extralight text-muted-foreground/50 tracking-[0.15em] uppercase mb-3">
                Total Nodes
              </p>
              <p className="text-2xl font-extralight text-foreground/90">{nodes.length}</p>
            </div>
            <div className="p-8 border border-border/10 rounded bg-background/50">
              <p className="text-xs font-extralight text-muted-foreground/50 tracking-[0.15em] uppercase mb-3">
                Avg Reputation
              </p>
              <p className="text-2xl font-extralight text-foreground/90">{avgReputation.toFixed(0)}</p>
            </div>
            <div className="p-8 border border-border/10 rounded bg-background/50">
              <p className="text-xs font-extralight text-muted-foreground/50 tracking-[0.15em] uppercase mb-3">
                Total Readings
              </p>
              <p className="text-2xl font-extralight text-foreground/90">{totalReadings.toLocaleString()}</p>
            </div>
            <div className="p-8 border border-border/10 rounded bg-background/50">
              <p className="text-xs font-extralight text-muted-foreground/50 tracking-[0.15em] uppercase mb-3">
                Total Earned
              </p>
              <p className="text-2xl font-extralight text-foreground/90">{totalEarned.toFixed(3)} SOL</p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section>
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Search nodes by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded border border-border/20 bg-background text-sm font-extralight tracking-wide focus:outline-none focus:border-primary/40 transition-colors"
            />
            <div className="flex gap-2">
              {["all", "Platinum", "Gold", "Silver", "Bronze"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRankFilter(filter as any)}
                  className={`px-4 py-3 rounded text-xs font-extralight tracking-wide transition-all duration-500 ${
                    rankFilter === filter
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-background border border-border/20 text-foreground/70 hover:border-primary/30"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Node Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNodes.map(node => (
              <Card key={node.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg font-light">
                    <span className="truncate">{node.name}</span>
                    <Badge variant="outline" className={`text-xs ml-2 ${getRankColor(node.reputation.rank)}`}>
                      {node.reputation.rank}
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground font-light">{node.id.slice(0, 8)}...</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm font-light">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reputation:</span>
                      <span className="text-foreground">{node.reputation.score.toFixed(0)}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Readings:</span>
                      <span className="text-foreground">{node.reputation.totalReadings || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Earned:</span>
                      <span className="text-foreground">{(node.earned || 0).toFixed(3)} SOL</span>
                    </div>

                    <div className="pt-3 border-t border-border/20">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-normal">Price per Reading:</span>
                        <div className="text-right">
                          <div className="text-green-500 font-mono">{node.price.sol.toFixed(4)} SOL</div>
                          <div className="text-xs text-muted-foreground">
                            ~${(node.price.sol * 20).toFixed(2)} USD
                          </div>
                        </div>
                      </div>
                    </div>

                    {node.lastReading && (
                      <div className="pt-3 border-t border-border/20">
                        <p className="text-xs text-muted-foreground mb-2">Last Reading:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {node.lastReading.ph !== null && (
                            <div>
                              <span className="text-muted-foreground">pH:</span>
                              <span className="ml-1">{node.lastReading.ph.toFixed(2)}</span>
                            </div>
                          )}
                          {node.lastReading.turbidity !== null && (
                            <div>
                              <span className="text-muted-foreground">Turbidity:</span>
                              <span className="ml-1">{node.lastReading.turbidity.toFixed(2)}</span>
                            </div>
                          )}
                          {node.lastReading.temp !== null && (
                            <div>
                              <span className="text-muted-foreground">Temp:</span>
                              <span className="ml-1">{node.lastReading.temp.toFixed(1)}°C</span>
                            </div>
                          )}
                          {node.lastReading.conductivity !== null && (
                            <div>
                              <span className="text-muted-foreground">Cond:</span>
                              <span className="ml-1">{node.lastReading.conductivity.toFixed(0)}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(node.lastReading.timestamp).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

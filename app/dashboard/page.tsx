"use client"

import { useEffect, useState } from "react"
import { MetricCard } from "@/components/metric-card"
import { LineChart } from "@/components/charts/line-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { MapPlaceholder } from "@/components/map-placeholder"
import { RecentReadingsTable } from "@/components/tables/recent-readings-table"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AgentActivityCard } from "@/components/agent-activity-card"
import { RealNodesCard } from "@/components/real-nodes-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aonaAPI } from "@/lib/api-client"
import { useStore } from "@/lib/store"

export default function DashboardPage() {
  const { readings, updateReadings, lastUpdate } = useStore()
  const [mounted, setMounted] = useState(false)
  const [nodes, setNodes] = useState<any[]>([])
  const [agentData, setAgentData] = useState<any>(null)
  const [usdcPrice, setUsdcPrice] = useState<number>(1.0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch real x402 network data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch real nodes
        const nodesRes = await aonaAPI.getNodes()
        setNodes(nodesRes.nodes || [])

        // Fetch agent activity
        const agent = await aonaAPI.getAgentOutput()
        setAgentData(agent)

        // Fetch USDC price from Switchboard
        try {
          const price = await aonaAPI.getPrices()
          setUsdcPrice(price.prices?.USDC?.usd || 1.0)
        } catch (e) {
          console.log('Price fetch failed, using fallback')
          setUsdcPrice(1.0)
        }

        setLoading(false)
      } catch (error) {
        console.error('Dashboard fetch error:', error)
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  // Update readings every 10 seconds for demo
  useEffect(() => {
    const interval = setInterval(updateReadings, 10000)
    return () => clearInterval(interval)
  }, [updateReadings])

  if (!mounted) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <LoadingSpinner />
        </div>
      </main>
    )
  }

  // Calculate current metrics from latest reading
  const latestReading = readings[readings.length - 1]

  // Calculate network stats
  const totalEarned = agentData?.summary?.totalSpentSOL || 0
  const avgReputation = nodes.length > 0
    ? nodes.reduce((sum, n) => sum + n.reputation.score, 0) / nodes.length
    : 0

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Hydrology Dashboard</h1>
              <p className="text-muted-foreground font-light text-sm tracking-wide">
                Real-time aquatic system monitoring
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-light text-muted-foreground">Last updated</p>
              <p className="text-sm font-light text-primary">{new Date(lastUpdate).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        <InkBrushDivider />

        {/* x402 Network Hero Stats */}
        <section className="mt-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light tracking-wide text-muted-foreground">Active Nodes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-light mb-2">{nodes.length}</div>
                <Badge variant="outline" className="text-xs border-green-500/50 text-green-500">
                  🔴 LIVE
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light tracking-wide text-muted-foreground">Agent Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-light mb-1">{totalEarned.toFixed(3)}</div>
                <div className="text-xs text-muted-foreground font-light">
                  SOL · ${(totalEarned * 20).toFixed(2)} USD
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light tracking-wide text-muted-foreground">Network Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-light mb-1">{avgReputation.toFixed(0)}</div>
                <div className="text-xs text-muted-foreground font-light">Average Score</div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light tracking-wide text-muted-foreground">USDC Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-light mb-1">${usdcPrice.toFixed(4)}</div>
                <Badge variant="outline" className="text-xs">Switchboard Oracle</Badge>
              </CardContent>
            </Card>
          </div>

          {/* x402 Protocol Explainer */}
          <Card className="mt-6 border-border/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-light tracking-wide">
                🔐 x402 Payment Protocol Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm font-light text-muted-foreground">
                This dashboard shows REAL data from the x402 HTTP 402 Payment Required protocol.
                Nodes charge micropayments for water quality readings. The agent pays with real
                SOL on Solana devnet.
              </p>
              <div className="flex gap-3">
                <Badge variant="outline" className="text-xs">Solana Devnet</Badge>
                <Badge variant="outline" className="text-xs">HTTP 402</Badge>
                <Badge variant="outline" className="text-xs">Real Payments</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Metrics */}
        <section className="mt-12 mb-16">
          <h2 className="text-2xl mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard
              label="pH Level"
              value={latestReading?.ph.toFixed(2) || "7.00"}
              unit=""
              trend="+0.2"
              status="normal"
            />
            <MetricCard
              label="Turbidity"
              value={latestReading?.turbidity.toFixed(1) || "0.0"}
              unit="NTU"
              trend="-1.5"
              status="good"
            />
            <MetricCard
              label="Conductivity"
              value={latestReading?.conductivity.toFixed(0) || "0"}
              unit="µS/cm"
              trend="+12"
              status="normal"
            />
            <MetricCard
              label="Temperature"
              value={latestReading?.temperature.toFixed(1) || "0.0"}
              unit="°C"
              trend="+0.5"
              status="normal"
            />
            <MetricCard
              label="Water Level"
              value={latestReading?.level.toFixed(0) || "0"}
              unit="%"
              trend="-2"
              status="normal"
            />
          </div>
        </section>

        {/* Real-time x402 Network Activity */}
        <section className="mb-16">
          <h2 className="text-2xl mb-6">x402 Network Status</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RealNodesCard />
            <AgentActivityCard />
          </div>
        </section>

        {/* Charts */}
        <section className="mb-16">
          <h2 className="text-2xl mb-6">Historical Data</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-light mb-4 tracking-wide">pH Trend</h3>
              <LineChart data={readings} dataKey="ph" color="var(--color-primary)" />
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-light mb-4 tracking-wide">Turbidity Levels</h3>
              <AreaChart data={readings} dataKey="turbidity" color="var(--color-secondary)" />
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-light mb-4 tracking-wide">Conductivity</h3>
              <LineChart data={readings} dataKey="conductivity" color="var(--color-accent)" />
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-light mb-4 tracking-wide">Temperature</h3>
              <AreaChart data={readings} dataKey="temperature" color="var(--color-chart-4)" />
            </div>
          </div>
        </section>

        {/* Network Map */}
        <section className="mb-16">
          <h2 className="text-2xl mb-6">Network Status</h2>
          <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
            <MapPlaceholder />
          </div>
        </section>

        {/* Recent Readings */}
        <section>
          <h2 className="text-2xl mb-6">Recent Readings</h2>
          <RecentReadingsTable readings={readings.slice(-10).reverse()} />
        </section>
      </div>
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aonaAPI, type AgentOutput } from "@/lib/api-client"
import { AlertCircle, CheckCircle2, DollarSign, Activity } from "lucide-react"

export function AgentActivityCard() {
  const [agentData, setAgentData] = useState<AgentOutput | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const data = await aonaAPI.getAgentOutput()
        setAgentData(data)
      } catch (e) {
        console.warn("Agent data not available")
      } finally {
        setLoading(false)
      }
    }

    fetchAgentData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchAgentData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-light tracking-wide">AI Agent Activity</h3>
        </div>
        <p className="text-sm text-muted-foreground">Loading agent data...</p>
      </Card>
    )
  }

  if (!agentData) {
    return (
      <Card className="p-6 border-border/50 bg-gradient-to-br from-muted/20 to-muted/10">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-light tracking-wide">AI Agent Activity</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          No agent activity detected. Run the water analyst agent to see autonomous payments and analysis.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded">npm run agent</code>
      </Card>
    )
  }

  const { summary, payments, nodes } = agentData
  const lastRun = new Date(agentData.timestamp).toLocaleString()

  return (
    <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-light tracking-wide">AI Agent Activity</h3>
          <Badge variant="outline" className="ml-2 border-green-500 text-green-500">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Last run: {lastRun}</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-background/50">
          <p className="text-2xl font-light">{summary.totalNodes}</p>
          <p className="text-xs text-muted-foreground mt-1">Nodes Consulted</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/50">
          <p className="text-2xl font-light text-primary">
            {summary.totalSpentSOL.toFixed(4)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">SOL Spent</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/50">
          <p className="text-2xl font-light text-orange-500">{summary.alertsGenerated}</p>
          <p className="text-xs text-muted-foreground mt-1">Alerts</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/50">
          <p className="text-2xl font-light capitalize">{summary.overallWaterQuality}</p>
          <p className="text-xs text-muted-foreground mt-1">Water Quality</p>
        </div>
      </div>

      {/* Alert Breakdown */}
      {summary.alertsGenerated > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-background/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-medium">Alert Breakdown</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">High: {summary.alertsBySeverity.high}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-muted-foreground">Medium: {summary.alertsBySeverity.medium}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Low: {summary.alertsBySeverity.low}</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Payments */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-green-500" />
          <p className="text-sm font-medium">Recent x402 Payments</p>
        </div>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {payments.slice(0, 5).map((payment, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded bg-background/30 text-xs"
            >
              <div className="flex-1">
                <p className="font-medium truncate">{payment.nodeName}</p>
                <p className="text-muted-foreground truncate">
                  {payment.signature.slice(0, 16)}...
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-green-500">{payment.sol.toFixed(4)} SOL</p>
                <p className="text-muted-foreground">
                  {new Date(payment.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Address */}
      <div className="mt-4 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          Agent Address:{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-[10px]">
            {agentData.agentAddress.slice(0, 8)}...{agentData.agentAddress.slice(-8)}
          </code>
        </p>
      </div>
    </Card>
  )
}

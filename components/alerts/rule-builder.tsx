"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import type { AlertRule } from "@/lib/mock"

interface RuleBuilderProps {
  onSave: (rule: AlertRule) => void
  onCancel: () => void
}

export function RuleBuilder({ onSave, onCancel }: RuleBuilderProps) {
  const [metric, setMetric] = useState<"ph" | "turbidity" | "conductivity" | "temperature" | "level">("ph")
  const [operator, setOperator] = useState<">" | "<" | "=" | "!=">("<")
  const [threshold, setThreshold] = useState<number>(6.5)
  const [duration, setDuration] = useState<number>(60)
  const [scope, setScope] = useState<"node" | "region">("node")
  const [scopeId, setScopeId] = useState<string>("node-0001")
  const [channels, setChannels] = useState<string[]>(["email"])

  const handleSave = () => {
    const newRule: AlertRule = {
      id: `rule-${Date.now()}`,
      metric,
      operator,
      threshold,
      duration,
      scope,
      scopeId,
      channels,
      enabled: true,
    }
    onSave(newRule)
  }

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter((c) => c !== channel))
    } else {
      setChannels([...channels, channel])
    }
  }

  return (
    <Card className="p-8 border border-primary/40 bg-primary/5">
      <h3 className="text-lg font-light tracking-widest text-foreground mb-6">Create Alert Rule</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Metric */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as any)}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
          >
            <option value="ph">pH</option>
            <option value="turbidity">Turbidity</option>
            <option value="conductivity">Conductivity</option>
            <option value="temperature">Temperature</option>
            <option value="level">Water Level</option>
          </select>
        </div>

        {/* Operator */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">Operator</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value as any)}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
          >
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="=">=</option>
            <option value="!=">!=</option>
          </select>
        </div>

        {/* Threshold */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">Threshold</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number.parseFloat(e.target.value))}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number.parseInt(e.target.value))}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
          />
        </div>

        {/* Scope */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">Scope</label>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value as any)}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
          >
            <option value="node">Node</option>
            <option value="region">Region</option>
          </select>
        </div>

        {/* Scope ID */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">
            {scope === "node" ? "Node ID" : "Region Name"}
          </label>
          <input
            type="text"
            value={scopeId}
            onChange={(e) => setScopeId(e.target.value)}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
            placeholder={scope === "node" ? "node-0001" : "pacific-northwest"}
          />
        </div>
      </div>

      {/* Delivery channels */}
      <div className="mt-6">
        <label className="text-xs font-light text-muted-foreground mb-3 block">Delivery Channels</label>
        <div className="flex flex-wrap gap-3">
          {["email", "webhook", "farcaster", "on-chain"].map((channel) => (
            <button
              key={channel}
              onClick={() => toggleChannel(channel)}
              className={`px-4 py-2 text-xs font-light rounded-md border transition-colors ${
                channels.includes(channel)
                  ? "border-primary bg-primary text-white"
                  : "border-border/40 hover:bg-muted/50"
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-primary text-white rounded-md font-light text-sm hover:bg-primary/90 transition-colors"
        >
          Save Rule
        </button>
        <button
          onClick={onCancel}
          className="px-8 py-3 border border-border/40 rounded-md font-light text-sm hover:bg-muted/50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </Card>
  )
}

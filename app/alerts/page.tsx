"use client"

import { useState } from "react"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { RuleBuilder } from "@/components/alerts/rule-builder"
import { AlertHistoryTable } from "@/components/alerts/alert-history-table"
import { generateMockRules } from "@/lib/mock"
import type { AlertRule } from "@/lib/mock"

export default function AlertsPage() {
  const [rules, setRules] = useState<AlertRule[]>(generateMockRules())
  const [showBuilder, setShowBuilder] = useState(false)

  const toggleRule = (ruleId: string) => {
    setRules(rules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId))
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">Signal & Threshold Alerts</h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Create intelligent alert rules that monitor water quality metrics across nodes and regions. Get notified via
            email, webhook, or on-chain events when thresholds are breached.
          </p>
        </div>
      </div>

      <InkBrushDivider />

      {/* Active rules */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light tracking-widest text-foreground">Active Rules</h2>
          <button
            onClick={() => setShowBuilder(!showBuilder)}
            className="px-6 py-3 bg-primary text-white rounded-md font-light text-sm hover:bg-primary/90 transition-colors"
          >
            {showBuilder ? "Cancel" : "Create New Rule"}
          </button>
        </div>

        {showBuilder && (
          <div className="mb-8">
            <RuleBuilder onSave={(rule) => setRules([...rules, rule])} onCancel={() => setShowBuilder(false)} />
          </div>
        )}

        <div className="space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-6 border border-border/40 rounded-lg bg-background hover:border-primary/40 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-sm font-light text-foreground">
                      {rule.metric.toUpperCase()} {rule.operator} {rule.threshold}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-light rounded ${
                        rule.enabled ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700"
                      }`}
                    >
                      {rule.enabled ? "Active" : "Disabled"}
                    </span>
                  </div>

                  <div className="text-xs font-light text-muted-foreground space-y-1">
                    <div>
                      Duration: {rule.duration} minutes • Scope: {rule.scope} ({rule.scopeId})
                    </div>
                    <div>Channels: {rule.channels.join(", ")}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className="px-3 py-1 text-xs font-light rounded-md border border-border/40 hover:bg-muted/50 transition-colors"
                  >
                    {rule.enabled ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="px-3 py-1 text-xs font-light rounded-md border border-border/40 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert history */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-light tracking-widest text-foreground mb-6">Recent Alerts</h2>
        <AlertHistoryTable />
      </div>

      {/* Integration hooks */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-muted/30 border border-border/40 rounded-lg p-8 max-w-4xl">
          <h3 className="text-sm font-light tracking-widest text-primary mb-4">TODO (Claude Integration)</h3>
          <ul className="space-y-2 text-sm font-light text-muted-foreground">
            <li>• Rules engine with temporal logic</li>
            <li>• Alert queue & deduplication</li>
            <li>• Email delivery (SendGrid/Resend)</li>
            <li>• Webhook dispatching</li>
            <li>• Farcaster integration</li>
            <li>• On-chain event emission</li>
            <li>• Alert acknowledgment & escalation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

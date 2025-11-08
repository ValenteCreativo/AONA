"use client"

import { Card } from "@/components/ui/card"

interface ModelControlsProps {
  metric: string
  window: number
  seasonality: boolean
  confidence: number
  onMetricChange: (metric: string) => void
  onWindowChange: (window: number) => void
  onSeasonalityChange: (enabled: boolean) => void
  onConfidenceChange: (confidence: number) => void
}

export function ModelControls({
  metric,
  window,
  seasonality,
  confidence,
  onMetricChange,
  onWindowChange,
  onSeasonalityChange,
  onConfidenceChange,
}: ModelControlsProps) {
  return (
    <Card className="p-6 border border-border/40">
      <h3 className="text-sm font-light tracking-widest text-foreground mb-6">Model Parameters</h3>

      <div className="space-y-6">
        {/* Metric selector */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">Metric</label>
          <select
            value={metric}
            onChange={(e) => onMetricChange(e.target.value)}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
          >
            <option value="ph">pH</option>
            <option value="turbidity">Turbidity</option>
            <option value="conductivity">Conductivity</option>
            <option value="temperature">Temperature</option>
            <option value="level">Water Level</option>
          </select>
        </div>

        {/* Window slider */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">
            Moving Average Window: {window} days
          </label>
          <input
            type="range"
            min="3"
            max="30"
            value={window}
            onChange={(e) => onWindowChange(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Seasonality toggle */}
        <div className="flex items-center justify-between">
          <label className="text-xs font-light text-muted-foreground">Account for Seasonality</label>
          <input
            type="checkbox"
            checked={seasonality}
            onChange={(e) => onSeasonalityChange(e.target.checked)}
            className="h-4 w-4 rounded border-border/40"
          />
        </div>

        {/* Confidence selector */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">Confidence Level</label>
          <select
            value={confidence}
            onChange={(e) => onConfidenceChange(Number.parseFloat(e.target.value))}
            className="w-full px-3 py-2 text-sm font-light rounded-md border border-border/40 bg-background"
          >
            <option value="0.90">90%</option>
            <option value="0.95">95%</option>
            <option value="0.99">99%</option>
          </select>
        </div>
      </div>
    </Card>
  )
}

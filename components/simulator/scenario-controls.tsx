"use client"

import { Card } from "@/components/ui/card"
import type { Scenario } from "@/lib/mock"

interface ScenarioControlsProps {
  scenario: Scenario
  onChange: (field: keyof Scenario, value: number) => void
  disabled: boolean
}

export function ScenarioControls({ scenario, onChange, disabled }: ScenarioControlsProps) {
  return (
    <Card className="p-6 border border-border/40">
      <h3 className="text-sm font-light tracking-widest text-foreground mb-6">Scenario Parameters</h3>

      <div className="space-y-6">
        {/* Rainfall */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">
            Rainfall Change: {scenario.rainfallPct > 0 ? "+" : ""}
            {scenario.rainfallPct}%
          </label>
          <input
            type="range"
            min="-50"
            max="100"
            step="5"
            value={scenario.rainfallPct}
            onChange={(e) => onChange("rainfallPct", Number.parseInt(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between mt-1 text-xs font-light text-muted-foreground">
            <span>-50%</span>
            <span>0%</span>
            <span>+100%</span>
          </div>
        </div>

        {/* Demand */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">
            Demand Change: {scenario.demandPct > 0 ? "+" : ""}
            {scenario.demandPct}%
          </label>
          <input
            type="range"
            min="-30"
            max="50"
            step="5"
            value={scenario.demandPct}
            onChange={(e) => onChange("demandPct", Number.parseInt(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between mt-1 text-xs font-light text-muted-foreground">
            <span>-30%</span>
            <span>0%</span>
            <span>+50%</span>
          </div>
        </div>

        {/* Sensor Density */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">
            Sensor Density: {scenario.sensorDensity}x
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={scenario.sensorDensity}
            onChange={(e) => onChange("sensorDensity", Number.parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between mt-1 text-xs font-light text-muted-foreground">
            <span>0.5x</span>
            <span>1x</span>
            <span>5x</span>
          </div>
        </div>

        {/* Contamination Events */}
        <div>
          <label className="text-xs font-light text-muted-foreground mb-2 block">
            Contamination Events: {scenario.contaminationEvents}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={scenario.contaminationEvents}
            onChange={(e) => onChange("contaminationEvents", Number.parseInt(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between mt-1 text-xs font-light text-muted-foreground">
            <span>0</span>
            <span>2-3</span>
            <span>5</span>
          </div>
        </div>
      </div>

      {disabled && (
        <div className="mt-6 p-3 bg-muted/30 rounded-lg">
          <p className="text-xs font-light text-muted-foreground">Select "Custom" to adjust parameters</p>
        </div>
      )}
    </Card>
  )
}

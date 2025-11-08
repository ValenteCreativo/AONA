"use client"

import { useState } from "react"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { ScenarioControls } from "@/components/simulator/scenario-controls"
import { ScenarioCharts } from "@/components/simulator/scenario-charts"
import { ScenarioMap } from "@/components/simulator/scenario-map"
import { generateMockScenarios } from "@/lib/mock"
import type { Scenario } from "@/lib/mock"

export default function SimulatorPage() {
  const scenarios = generateMockScenarios()
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0])
  const [customScenario, setCustomScenario] = useState<Scenario>({
    id: "custom",
    name: "Custom Scenario",
    rainfallPct: 0,
    demandPct: 0,
    sensorDensity: 1,
    contaminationEvents: 0,
  })

  const handleScenarioChange = (field: keyof Scenario, value: number) => {
    setCustomScenario({ ...customScenario, [field]: value })
  }

  const currentScenario = activeScenario.id === "custom" ? customScenario : activeScenario

  // Calculate mock outputs based on scenario
  const availability = 50 + currentScenario.rainfallPct * 0.5 - currentScenario.demandPct * 0.3
  const stressIndex = Math.max(
    0,
    Math.min(100, 50 - currentScenario.rainfallPct * 0.4 + currentScenario.demandPct * 0.6),
  )
  const riskScore = Math.max(
    0,
    Math.min(100, 30 + currentScenario.contaminationEvents * 20 - currentScenario.sensorDensity * 5),
  )

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">Scenario Simulator</h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Explore what-if scenarios for water systems. Adjust rainfall, demand, sensor density, and contamination
            events to understand system resilience and predict outcomes.
          </p>
        </div>
      </div>

      <InkBrushDivider />

      {/* Preset scenarios */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-light tracking-widest text-foreground mb-4">Preset Scenarios</h2>
          <div className="flex flex-wrap gap-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario)}
                className={`px-4 py-2 text-sm font-light rounded-md border transition-colors ${
                  activeScenario.id === scenario.id
                    ? "border-primary bg-primary text-white"
                    : "border-border/40 hover:bg-muted/50"
                }`}
              >
                {scenario.name}
              </button>
            ))}
            <button
              onClick={() => setActiveScenario({ ...customScenario, id: "custom" })}
              className={`px-4 py-2 text-sm font-light rounded-md border transition-colors ${
                activeScenario.id === "custom"
                  ? "border-primary bg-primary text-white"
                  : "border-border/40 hover:bg-muted/50"
              }`}
            >
              Custom
            </button>
          </div>
        </div>
      </div>

      {/* Main simulator */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls sidebar */}
          <div className="lg:col-span-4">
            <ScenarioControls
              scenario={currentScenario}
              onChange={handleScenarioChange}
              disabled={activeScenario.id !== "custom"}
            />

            {/* Current outputs summary */}
            <div className="mt-6 p-6 border border-border/40 rounded-lg bg-background">
              <h3 className="text-sm font-light tracking-widest text-foreground mb-4">Current Outputs</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-light text-muted-foreground mb-1">Water Availability</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${Math.max(0, Math.min(100, availability))}%` }}
                      />
                    </div>
                    <span className="text-sm font-light text-foreground">{availability.toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-light text-muted-foreground mb-1">Stress Index</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 transition-all" style={{ width: `${stressIndex}%` }} />
                    </div>
                    <span className="text-sm font-light text-foreground">{stressIndex.toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-light text-muted-foreground mb-1">Risk Score</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 transition-all" style={{ width: `${riskScore}%` }} />
                    </div>
                    <span className="text-sm font-light text-foreground">{riskScore.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save/Share actions */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-primary text-white rounded-md font-light text-sm hover:bg-primary/90 transition-colors">
                Save Scenario
              </button>
              <button className="px-4 py-2 border border-border/40 rounded-md font-light text-sm hover:bg-muted/50 transition-colors">
                Share
              </button>
            </div>
          </div>

          {/* Charts & map */}
          <div className="lg:col-span-8 space-y-8">
            <ScenarioCharts
              scenario={currentScenario}
              availability={availability}
              stressIndex={stressIndex}
              riskScore={riskScore}
            />
            <ScenarioMap scenario={currentScenario} />
          </div>
        </div>

        {/* Integration hooks */}
        <div className="mt-12 bg-muted/30 border border-border/40 rounded-lg p-8 max-w-4xl">
          <h3 className="text-sm font-light tracking-widest text-primary mb-4">TODO (Claude Integration)</h3>
          <ul className="space-y-2 text-sm font-light text-muted-foreground">
            <li>• Simulation API with hydrological models</li>
            <li>• Historical validation datasets</li>
            <li>• Monte Carlo uncertainty quantification</li>
            <li>• Scenario sharing & permalink generation</li>
            <li>• Export scenario results (JSON/CSV)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

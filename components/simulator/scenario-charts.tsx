"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { Scenario } from "@/lib/mock"

interface ScenarioChartsProps {
  scenario: Scenario
  availability: number
  stressIndex: number
  riskScore: number
}

export function ScenarioCharts({ scenario, availability, stressIndex, riskScore }: ScenarioChartsProps) {
  // Generate time series projections
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const data = months.map((month, i) => ({
    month,
    availability: availability + Math.sin(i * 0.5) * 10,
    stressIndex: stressIndex + Math.cos(i * 0.4) * 15,
    riskScore: riskScore + Math.sin(i * 0.6) * 8,
  }))

  return (
    <Card className="p-6 border border-border/40">
      <h3 className="text-sm font-light tracking-widest text-foreground mb-6">12-Month Projection</h3>

      <div className="w-full overflow-x-auto">
        <LineChart width={700} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#71717a" }} />
          <YAxis tick={{ fontSize: 11, fill: "#71717a" }} label={{ value: "Score (%)", angle: -90, fontSize: 11 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "white", border: "1px solid #e5e5e5", borderRadius: "8px" }}
            labelStyle={{ fontSize: 12, color: "#18181b" }}
            itemStyle={{ fontSize: 11 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="availability" stroke="#0ea5e9" strokeWidth={2} name="Availability" />
          <Line type="monotone" dataKey="stressIndex" stroke="#f97316" strokeWidth={2} name="Stress" />
          <Line type="monotone" dataKey="riskScore" stroke="#ef4444" strokeWidth={2} name="Risk" />
        </LineChart>
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <p className="text-xs font-light text-muted-foreground">
          Projections based on historical patterns and scenario parameters. Higher sensor density improves detection and
          reduces risk scores.
        </p>
      </div>
    </Card>
  )
}

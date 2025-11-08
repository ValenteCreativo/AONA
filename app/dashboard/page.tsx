"use client"

import { useEffect, useState } from "react"
import { MetricCard } from "@/components/metric-card"
import { LineChart } from "@/components/charts/line-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { MapPlaceholder } from "@/components/map-placeholder"
import { RecentReadingsTable } from "@/components/tables/recent-readings-table"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useStore } from "@/lib/store"

export default function DashboardPage() {
  const { readings, updateReadings, lastUpdate } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

        {/* Micropayments Earned (Mock) */}
        <section className="mb-16">
          <div className="p-8 rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-muted-foreground tracking-wide mb-2">Total Earned (Mock Data)</p>
                <p className="text-4xl font-light tracking-wide">$1,247.50</p>
                <p className="text-sm font-light text-muted-foreground mt-2">via x402 micropayments</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-light text-secondary">+$12.30</p>
                <p className="text-xs font-light text-muted-foreground">last hour</p>
              </div>
            </div>
            <p className="text-xs font-light text-muted-foreground mt-6 italic">
              TODO(Claude): x402 + onchain integration
            </p>
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

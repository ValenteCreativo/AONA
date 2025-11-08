"use client"

import { useState } from "react"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { ModelControls } from "@/components/models/model-controls"
import { ForecastChart } from "@/components/models/forecast-chart"
import { AnomalyTable } from "@/components/models/anomaly-table"
import { generateMockAnomalies } from "@/lib/mock"
import { forecastLinear, calculateConfidenceBands, detectSeasonality } from "@/lib/science"

type ModelTab = "anomaly" | "forecast" | "drought"

export default function ModelsPage() {
  const [activeTab, setActiveTab] = useState<ModelTab>("anomaly")
  const [metric, setMetric] = useState<string>("ph")
  const [window, setWindow] = useState<number>(7)
  const [seasonality, setSeasonality] = useState<boolean>(true)
  const [confidence, setConfidence] = useState<number>(0.95)

  const anomalyData = generateMockAnomalies(90)
  const values = anomalyData.map((d) => d.value)
  const forecast = forecastLinear(values, 14)
  const bands = calculateConfidenceBands(values, forecast, confidence)
  const hasSeasonality = detectSeasonality(values, 7)

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">Model Lab</h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Interactive model playground for water quality forecasting and anomaly detection. Explore trend analysis,
            confidence bands, and drought indices with adjustable parameters.
          </p>
        </div>
      </div>

      <InkBrushDivider />

      {/* Tabs */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-4 border-b border-border/40 pb-4">
          <button
            onClick={() => setActiveTab("anomaly")}
            className={`px-4 py-2 text-sm font-light tracking-wide transition-colors ${
              activeTab === "anomaly"
                ? "text-primary border-b-2 border-primary -mb-[1px]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Anomaly Detection
          </button>
          <button
            onClick={() => setActiveTab("forecast")}
            className={`px-4 py-2 text-sm font-light tracking-wide transition-colors ${
              activeTab === "forecast"
                ? "text-primary border-b-2 border-primary -mb-[1px]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Trend & Forecast
          </button>
          <button
            onClick={() => setActiveTab("drought")}
            className={`px-4 py-2 text-sm font-light tracking-wide transition-colors ${
              activeTab === "drought"
                ? "text-primary border-b-2 border-primary -mb-[1px]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Drought Index
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls sidebar */}
          <div className="lg:col-span-3">
            <ModelControls
              metric={metric}
              window={window}
              seasonality={seasonality}
              confidence={confidence}
              onMetricChange={setMetric}
              onWindowChange={setWindow}
              onSeasonalityChange={setSeasonality}
              onConfidenceChange={setConfidence}
            />

            {/* Detected seasonality indicator */}
            {activeTab === "forecast" && (
              <div className="mt-6 p-4 bg-muted/30 border border-border/40 rounded-lg">
                <div className="text-xs font-light text-muted-foreground mb-2">Seasonality Detected</div>
                <div className="text-sm font-light text-foreground">{hasSeasonality ? "Yes" : "No"}</div>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="lg:col-span-9 space-y-8">
            {activeTab === "anomaly" && (
              <>
                <ForecastChart data={anomalyData} title="pH Anomaly Detection" showBaseline={true} showAnomaly={true} />
                <AnomalyTable data={anomalyData.filter((d) => Math.abs(d.zscore || 0) > 2)} />
              </>
            )}

            {activeTab === "forecast" && (
              <>
                <ForecastChart
                  data={anomalyData}
                  forecast={forecast}
                  bands={bands}
                  title={`${metric.toUpperCase()} 14-Day Forecast`}
                  showBaseline={false}
                  showAnomaly={false}
                />
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-primary text-white rounded-md font-light text-sm hover:bg-primary/90 transition-colors">
                    Download CSV
                  </button>
                  <button className="px-6 py-3 border border-border/40 rounded-md font-light text-sm hover:bg-muted/50 transition-colors">
                    Export PNG
                  </button>
                </div>
              </>
            )}

            {activeTab === "drought" && (
              <>
                <ForecastChart
                  data={anomalyData.map((d, i) => ({
                    ...d,
                    value: 50 + Math.sin(i * 0.1) * 30 + (Math.random() - 0.5) * 10,
                  }))}
                  title="Drought Stress Index (0-100)"
                  showBaseline={false}
                  showAnomaly={false}
                />
                <div className="p-6 bg-muted/30 border border-border/40 rounded-lg">
                  <div className="text-sm font-light text-muted-foreground mb-4">
                    Drought index combines precipitation deficit, evapotranspiration, and soil moisture. Values below 30
                    indicate severe drought conditions.
                  </div>
                  <div className="flex gap-4 text-xs font-light">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Severe (&lt;30)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span>Moderate (30-50)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Normal (&gt;50)</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Integration hooks */}
        <div className="mt-12 bg-muted/30 border border-border/40 rounded-lg p-8 max-w-4xl">
          <h3 className="text-sm font-light tracking-widest text-primary mb-4">TODO (Claude Integration)</h3>
          <ul className="space-y-2 text-sm font-light text-muted-foreground">
            <li>• Model endpoints: Prophet, ARIMA, Bayesian inference</li>
            <li>• Model registry & versioning</li>
            <li>• Real-time anomaly detection pipeline</li>
            <li>• Confidence interval calculations (bootstrap, analytical)</li>
            <li>• Drought index computation (SPI, SPEI, PDSI)</li>
            <li>• CSV/JSON export with metadata</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

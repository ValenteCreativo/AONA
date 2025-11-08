"use client"

import { Card } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ComposedChart } from "recharts"
import type { AnomalyPoint } from "@/lib/mock"

interface ForecastChartProps {
  data: AnomalyPoint[]
  forecast?: number[]
  bands?: { upper: number[]; lower: number[] }
  title: string
  showBaseline?: boolean
  showAnomaly?: boolean
}

export function ForecastChart({ data, forecast, bands, title, showBaseline, showAnomaly }: ForecastChartProps) {
  // Prepare chart data
  const historicalData = data.map((d) => ({
    date: d.ts,
    value: d.value,
    baseline: d.baseline,
    zscore: d.zscore,
  }))

  // Add forecast if provided
  const forecastData =
    forecast?.map((value, i) => {
      const lastDate = new Date(data[data.length - 1].ts)
      lastDate.setDate(lastDate.getDate() + i + 1)
      return {
        date: lastDate.toISOString().split("T")[0],
        forecast: value,
        upper: bands?.upper[i],
        lower: bands?.lower[i],
      }
    }) || []

  const combinedData = [...historicalData, ...forecastData]

  return (
    <Card className="p-6 border border-border/40">
      <h3 className="text-sm font-light tracking-widest text-foreground mb-6">{title}</h3>

      <div className="w-full overflow-x-auto">
        <ComposedChart width={800} height={400} data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#71717a" }}
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          />
          <YAxis tick={{ fontSize: 11, fill: "#71717a" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "white", border: "1px solid #e5e5e5", borderRadius: "8px" }}
            labelStyle={{ fontSize: 12, color: "#18181b" }}
            itemStyle={{ fontSize: 11 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />

          {/* Confidence bands */}
          {bands && (
            <>
              <Area type="monotone" dataKey="upper" stroke="none" fill="#0ea5e9" fillOpacity={0.1} />
              <Area type="monotone" dataKey="lower" stroke="none" fill="#0ea5e9" fillOpacity={0.1} />
            </>
          )}

          {/* Historical data */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
            name="Observed"
            connectNulls
          />

          {/* Baseline */}
          {showBaseline && (
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#10b981"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Baseline"
            />
          )}

          {/* Forecast */}
          {forecast && (
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#f97316"
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={false}
              name="Forecast"
            />
          )}
        </ComposedChart>
      </div>
    </Card>
  )
}

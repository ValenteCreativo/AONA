"use client"

import { Card } from "@/components/ui/card"
import type { AnomalyPoint } from "@/lib/mock"

interface AnomalyTableProps {
  data: AnomalyPoint[]
}

export function AnomalyTable({ data }: AnomalyTableProps) {
  return (
    <Card className="p-6 border border-border/40">
      <h3 className="text-sm font-light tracking-widest text-foreground mb-4">Detected Anomalies (|z| &gt; 2)</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Date</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Value</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Baseline</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Z-Score</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Severity</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-sm font-light text-muted-foreground py-8">
                  No anomalies detected
                </td>
              </tr>
            ) : (
              data.map((point, index) => {
                const severity = Math.abs(point.zscore || 0)
                const severityLabel = severity > 3 ? "Critical" : severity > 2.5 ? "High" : "Medium"
                const severityColor =
                  severity > 3 ? "text-red-500" : severity > 2.5 ? "text-orange-500" : "text-yellow-500"

                return (
                  <tr key={index} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                    <td className="text-sm font-light text-foreground py-3 px-4">
                      {new Date(point.ts).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-sm font-light text-foreground py-3 px-4">{point.value}</td>
                    <td className="text-sm font-light text-muted-foreground py-3 px-4">{point.baseline}</td>
                    <td className="text-sm font-light text-foreground py-3 px-4">{point.zscore?.toFixed(2)}</td>
                    <td className={`text-sm font-light py-3 px-4 ${severityColor}`}>{severityLabel}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

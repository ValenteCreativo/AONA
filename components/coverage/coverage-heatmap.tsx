"use client"

import { Card } from "@/components/ui/card"
import type { CoverageCell } from "@/lib/mock"

interface CoverageHeatmapProps {
  data: CoverageCell[]
  onBasinSelect: (basinId: string | null) => void
  selectedBasin: string | null
}

export function CoverageHeatmap({ data, onBasinSelect, selectedBasin }: CoverageHeatmapProps) {
  return (
    <Card className="p-6 border border-border/40">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {data.map((cell) => {
          const opacity = 1 - cell.coveragePct / 100
          const isSelected = selectedBasin === cell.basinId

          return (
            <button
              key={cell.id}
              onClick={() => onBasinSelect(isSelected ? null : cell.basinId)}
              className={`aspect-square rounded-md transition-all hover:scale-105 ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
              style={{
                backgroundColor: `rgba(14, 165, 233, ${opacity * 0.8 + 0.2})`,
              }}
              title={`${cell.basinName}: ${cell.coveragePct}% coverage, ${cell.sensors} sensors`}
            >
              <div className="text-xs font-light text-white">{cell.sensors}</div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-xs font-light text-muted-foreground">Coverage Score</div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 25, 50, 75, 100].map((pct) => {
              const opacity = 1 - pct / 100
              return (
                <div
                  key={pct}
                  className="w-8 h-4 rounded"
                  style={{ backgroundColor: `rgba(14, 165, 233, ${opacity * 0.8 + 0.2})` }}
                />
              )
            })}
          </div>
          <div className="text-xs font-light text-muted-foreground ml-2">
            <span>Low</span>
            <span className="mx-4">→</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

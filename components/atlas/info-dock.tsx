"use client"

import { Card } from "@/components/ui/card"
import type { Layer } from "@/lib/mock"

interface InfoDockProps {
  point: { lat: number; lng: number }
  layers: Layer[]
  timeIndex: number
}

export function InfoDock({ point, layers, timeIndex }: InfoDockProps) {
  // Mock data based on selected point
  const mockValues = layers.map((layer) => {
    const value = (Math.sin(point.lat * 0.1) * Math.cos(point.lng * 0.1) * 50).toFixed(2)
    return { layer, value }
  })

  const basinName = "Colorado River Basin"
  const trend = Math.random() > 0.5 ? "increasing" : "decreasing"

  return (
    <Card className="bg-background/95 backdrop-blur-md p-6 w-80 border border-border/40">
      <h3 className="text-sm font-light tracking-widest text-foreground mb-4">Point Info</h3>

      <div className="space-y-4">
        {/* Coordinates */}
        <div>
          <div className="text-xs font-light text-muted-foreground mb-1">Coordinates</div>
          <div className="text-sm font-light text-foreground">
            {point.lat.toFixed(4)}°, {point.lng.toFixed(4)}°
          </div>
        </div>

        {/* Basin */}
        <div>
          <div className="text-xs font-light text-muted-foreground mb-1">Basin</div>
          <div className="text-sm font-light text-foreground">{basinName}</div>
        </div>

        {/* Layer values */}
        {mockValues.map(({ layer, value }) => (
          <div key={layer.id}>
            <div className="text-xs font-light text-muted-foreground mb-1">{layer.name}</div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-light text-foreground">
                {value} {layer.units}
              </div>
              <div className="text-xs font-light text-primary">{trend}</div>
            </div>
          </div>
        ))}

        {/* Trend sparkline (mock) */}
        <div>
          <div className="text-xs font-light text-muted-foreground mb-2">30-day Trend</div>
          <div className="h-12 flex items-end gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const height = 30 + Math.sin(i * 0.3) * 20
              return <div key={i} className="flex-1 bg-primary/30 rounded-t" style={{ height: `${height}%` }} />
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}

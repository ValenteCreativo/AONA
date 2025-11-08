"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import type { Scenario } from "@/lib/mock"

interface ScenarioMapProps {
  scenario: Scenario
}

export function ScenarioMap({ scenario }: ScenarioMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = "#fafafa"
    ctx.fillRect(0, 0, width, height)

    // Draw base map
    drawBaseMap(ctx, width, height)

    // Draw scenario-specific overlays
    drawScenarioOverlay(ctx, width, height, scenario)
  }, [scenario])

  return (
    <Card className="p-6 border border-border/40">
      <h3 className="text-sm font-light tracking-widest text-foreground mb-4">Geographic Impact</h3>
      <canvas ref={canvasRef} className="w-full h-64 rounded-lg" />
      <div className="mt-4 flex items-center gap-4 text-xs font-light text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Low stress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>High stress</span>
        </div>
      </div>
    </Card>
  )
}

function drawBaseMap(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Simplified watershed boundaries
  ctx.strokeStyle = "#d4d4d8"
  ctx.lineWidth = 1

  for (let i = 0; i < 6; i++) {
    const x = (width / 7) * (i + 1)
    const y = height * 0.4 + Math.sin(i) * 40

    ctx.beginPath()
    ctx.arc(x, y, 50, 0, Math.PI * 2)
    ctx.stroke()
  }
}

function drawScenarioOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, scenario: Scenario) {
  // Color regions based on scenario impacts
  const stressLevel = 50 - scenario.rainfallPct * 0.4 + scenario.demandPct * 0.6

  for (let i = 0; i < 6; i++) {
    const x = (width / 7) * (i + 1)
    const y = height * 0.4 + Math.sin(i) * 40

    const localStress = stressLevel + (Math.random() - 0.5) * 20

    let color
    if (localStress < 30) {
      color = "rgba(34, 197, 94, 0.3)"
    } else if (localStress < 60) {
      color = "rgba(234, 179, 8, 0.3)"
    } else {
      color = "rgba(239, 68, 68, 0.3)"
    }

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, 50, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw sensor network density
  const sensorCount = Math.floor(scenario.sensorDensity * 15)
  ctx.fillStyle = "#0ea5e9"

  for (let i = 0; i < sensorCount; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type { Layer } from "@/lib/mock"

interface AtlasMapProps {
  layers: Layer[]
  splitView: boolean
  timeIndex: number
  onPointSelect: (point: { lat: number; lng: number }) => void
}

export function AtlasMap({ layers, splitView, timeIndex, onPointSelect }: AtlasMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.fillStyle = "#fafafa"
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw base map (simplified continents)
    drawBaseMap(ctx, canvas.offsetWidth, canvas.offsetHeight)

    // Draw layers
    layers.forEach((layer, index) => {
      if (layer.enabled) {
        drawLayer(ctx, layer, canvas.offsetWidth, canvas.offsetHeight, timeIndex, splitView, index)
      }
    })

    // Draw hover indicator
    if (hoveredPoint) {
      ctx.strokeStyle = "#0ea5e9"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(hoveredPoint.x, hoveredPoint.y, 8, 0, Math.PI * 2)
      ctx.stroke()
    }
  }, [layers, timeIndex, splitView, hoveredPoint])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert to lat/lng (simplified)
    const lng = ((x / rect.width) * 360 - 180).toFixed(4)
    const lat = (90 - (y / rect.height) * 180).toFixed(4)

    onPointSelect({ lat: Number.parseFloat(lat), lng: Number.parseFloat(lng) })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setHoveredPoint({ x, y })
  }

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
      />
      {splitView && (
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/50 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 rounded text-xs font-light">
            Compare
          </div>
        </div>
      )}
    </div>
  )
}

function drawBaseMap(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Simplified continents outlines
  ctx.strokeStyle = "#e5e5e5"
  ctx.lineWidth = 1
  ctx.fillStyle = "#f5f5f5"

  // North America (simplified)
  ctx.beginPath()
  ctx.moveTo(width * 0.15, height * 0.25)
  ctx.lineTo(width * 0.3, height * 0.2)
  ctx.lineTo(width * 0.35, height * 0.35)
  ctx.lineTo(width * 0.25, height * 0.5)
  ctx.lineTo(width * 0.15, height * 0.45)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // South America (simplified)
  ctx.beginPath()
  ctx.moveTo(width * 0.3, height * 0.55)
  ctx.lineTo(width * 0.35, height * 0.5)
  ctx.lineTo(width * 0.35, height * 0.7)
  ctx.lineTo(width * 0.28, height * 0.75)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Europe/Asia (simplified)
  ctx.beginPath()
  ctx.moveTo(width * 0.45, height * 0.25)
  ctx.lineTo(width * 0.75, height * 0.2)
  ctx.lineTo(width * 0.85, height * 0.35)
  ctx.lineTo(width * 0.7, height * 0.45)
  ctx.lineTo(width * 0.5, height * 0.4)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Africa (simplified)
  ctx.beginPath()
  ctx.moveTo(width * 0.48, height * 0.45)
  ctx.lineTo(width * 0.55, height * 0.4)
  ctx.lineTo(width * 0.55, height * 0.65)
  ctx.lineTo(width * 0.48, height * 0.7)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Australia (simplified)
  ctx.beginPath()
  ctx.moveTo(width * 0.75, height * 0.65)
  ctx.lineTo(width * 0.85, height * 0.63)
  ctx.lineTo(width * 0.87, height * 0.73)
  ctx.lineTo(width * 0.77, height * 0.75)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

function drawLayer(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  width: number,
  height: number,
  timeIndex: number,
  splitView: boolean,
  layerIndex: number,
) {
  const viewWidth = splitView ? width / 2 : width

  // Draw mock data visualization based on layer type
  if (layer.type === "raster") {
    // Draw heatmap cells
    const cellSize = 40
    for (let x = 0; x < viewWidth; x += cellSize) {
      for (let y = 0; y < height; y += cellSize) {
        const value = Math.sin((x + timeIndex * 5) * 0.05) * Math.cos(y * 0.05) * 0.5 + 0.5
        const opacity = value * 0.4

        if (layer.id === "grace-groundwater") {
          ctx.fillStyle = `rgba(14, 165, 233, ${opacity})`
        } else if (layer.id === "gpm-precipitation") {
          ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`
        } else {
          ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`
        }

        ctx.fillRect(x, y, cellSize, cellSize)
      }
    }
  } else if (layer.type === "vector") {
    // Draw watershed boundaries
    ctx.strokeStyle = `rgba(100, 116, 139, 0.5)`
    ctx.lineWidth = 2

    for (let i = 0; i < 8; i++) {
      const x = (viewWidth / 9) * (i + 1)
      const y = height * 0.4 + Math.sin(i) * 50

      ctx.beginPath()
      ctx.arc(x, y, 60, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  // Draw split view comparison (same layer, different time)
  if (splitView) {
    ctx.save()
    ctx.translate(width / 2, 0)
    // Draw the same layer with a different time offset for comparison
    if (layer.type === "raster") {
      const cellSize = 40
      for (let x = 0; x < viewWidth; x += cellSize) {
        for (let y = 0; y < height; y += cellSize) {
          const value = Math.sin((x + (timeIndex - 30) * 5) * 0.05) * Math.cos(y * 0.05) * 0.5 + 0.5
          const opacity = value * 0.4

          if (layer.id === "grace-groundwater") {
            ctx.fillStyle = `rgba(14, 165, 233, ${opacity})`
          } else if (layer.id === "gpm-precipitation") {
            ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`
          } else {
            ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`
          }

          ctx.fillRect(x, y, cellSize, cellSize)
        }
      }
    }
    ctx.restore()
  }
}

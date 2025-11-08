"use client"

import { useState } from "react"
import { AtlasMap } from "@/components/atlas/atlas-map"
import { LayerPanel } from "@/components/atlas/layer-panel"
import { TimeSlider } from "@/components/atlas/time-slider"
import { InfoDock } from "@/components/atlas/info-dock"
import { generateMockLayers } from "@/lib/mock"
import type { Layer } from "@/lib/mock"

export default function AtlasPage() {
  const [layers, setLayers] = useState<Layer[]>(generateMockLayers())
  const [splitView, setSplitView] = useState(false)
  const [timeIndex, setTimeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState<{ lat: number; lng: number } | null>(null)

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map((layer) => (layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer)))
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="text-xs font-extralight tracking-[0.15em] text-muted-foreground/50 leading-loose">
          The planet's water, revealed in time and space.
        </p>
      </div>

      {/* Full-screen map interface */}
      <div className="relative h-[calc(100vh-64px)] min-h-[700px]">
        {/* Layer controls (left) - minimal vertical panel */}
        <div className="absolute left-4 top-4 z-10">
          <LayerPanel layers={layers} onToggleLayer={toggleLayer} splitView={splitView} onToggleSplit={setSplitView} />
        </div>

        {/* Info dock (right) - whisper details on hover */}
        {selectedPoint && (
          <div className="absolute right-4 top-4 z-10">
            <InfoDock point={selectedPoint} layers={layers.filter((l) => l.enabled)} timeIndex={timeIndex} />
          </div>
        )}

        {/* Map */}
        <AtlasMap
          layers={layers.filter((l) => l.enabled)}
          splitView={splitView}
          timeIndex={timeIndex}
          onPointSelect={setSelectedPoint}
        />

        {/* Time slider (bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-6">
          <TimeSlider
            timeIndex={timeIndex}
            onTimeChange={setTimeIndex}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            maxSteps={365}
          />
        </div>
      </div>
    </div>
  )
}

"use client"

import type { Layer } from "@/lib/mock"

interface LayerPanelProps {
  layers: Layer[]
  onToggleLayer: (layerId: string) => void
  splitView: boolean
  onToggleSplit: (enabled: boolean) => void
}

export function LayerPanel({ layers, onToggleLayer, splitView, onToggleSplit }: LayerPanelProps) {
  return (
    <div className="bg-background/80 backdrop-blur-sm border border-border/20 rounded-md p-5 w-64">
      <h3 className="text-xs font-extralight tracking-[0.15em] text-foreground/70 mb-6 uppercase">Layers</h3>

      <div className="space-y-4 mb-6">
        {layers.map((layer) => (
          <label key={layer.id} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={layer.enabled}
              onChange={() => onToggleLayer(layer.id)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-border/30 cursor-pointer"
            />
            <div className="flex-1">
              <div className="text-sm font-extralight text-foreground/80 tracking-wide group-hover:text-primary transition-colors duration-500">
                {layer.name}
              </div>
              <div className="text-xs font-extralight text-muted-foreground/50 mt-0.5 tracking-wide">{layer.type}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="border-t border-border/10 pt-4">
        <button
          onClick={() => onToggleSplit(!splitView)}
          className="w-full px-3 py-2 text-xs font-extralight tracking-wide rounded border border-border/20 hover:border-primary/30 hover:text-primary transition-all duration-500 text-foreground/70"
        >
          {splitView ? "Single" : "Compare"}
        </button>
      </div>
    </div>
  )
}

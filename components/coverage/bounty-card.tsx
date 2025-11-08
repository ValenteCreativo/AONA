"use client"

import type { CoverageCell } from "@/lib/mock"

interface BountyCardProps {
  cell: CoverageCell
}

export function BountyCard({ cell }: BountyCardProps) {
  return (
    <div className="p-6 border border-border/10 rounded bg-background/50 hover:border-primary/20 transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-sm font-extralight text-foreground/80 tracking-wide">{cell.basinName}</h4>
          <div className="text-xs font-extralight text-muted-foreground/50 mt-1 tracking-wide">
            {cell.lat.toFixed(2)}°, {cell.lng.toFixed(2)}°
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-extralight text-primary/80">{cell.bounty}</div>
          <div className="text-xs font-extralight text-muted-foreground/50 tracking-wide">x402</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-xs font-extralight text-muted-foreground/60 mb-1 tracking-wide">Coverage</div>
          <div className="text-sm font-extralight text-foreground/80">{cell.coveragePct}%</div>
        </div>
        <div>
          <div className="text-xs font-extralight text-muted-foreground/60 mb-1 tracking-wide">Sensors</div>
          <div className="text-sm font-extralight text-foreground/80">{cell.sensors}</div>
        </div>
      </div>

      <button className="w-full px-4 py-2.5 text-xs font-extralight tracking-wide rounded border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all duration-500">
        Claim
      </button>
    </div>
  )
}

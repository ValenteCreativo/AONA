"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function WaterCrisisModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-base font-extralight tracking-[0.15em] text-foreground/50 hover:text-primary/70 transition-all duration-500 py-3"
      >
        Why Water Matters
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-background border border-border/20 rounded p-12 space-y-12">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1} />
            </button>

            <div className="space-y-16">
              {/* Global freshwater loss */}
              <div className="space-y-4 pb-8 border-b border-border/10">
                <p className="text-xs font-extralight tracking-[0.15em] text-muted-foreground/50 uppercase">
                  Groundwater Depletion
                </p>
                <p className="text-2xl font-extralight tracking-[0.12em] text-foreground/80 leading-relaxed">
                  Global freshwater resources are declining at 1 cm per year
                </p>
                <p className="text-xs font-extralight tracking-[0.12em] text-muted-foreground/60 leading-loose">
                  NASA GRACE satellite data, 2002-2023
                </p>
              </div>

              {/* UN water stress */}
              <div className="space-y-4 pb-8 border-b border-border/10">
                <p className="text-xs font-extralight tracking-[0.15em] text-muted-foreground/50 uppercase">
                  Water Scarcity
                </p>
                <p className="text-2xl font-extralight tracking-[0.12em] text-foreground/80 leading-relaxed">
                  2 billion people live in regions with high water stress
                </p>
                <p className="text-xs font-extralight tracking-[0.12em] text-muted-foreground/60 leading-loose">
                  United Nations World Water Development Report
                </p>
              </div>

              {/* Measurement gap */}
              <div className="space-y-4 pb-8 border-b border-border/10">
                <p className="text-xs font-extralight tracking-[0.15em] text-muted-foreground/50 uppercase">
                  Monitoring Gap
                </p>
                <p className="text-2xl font-extralight tracking-[0.12em] text-foreground/80 leading-relaxed">
                  Most watersheds have no real-time monitoring infrastructure
                </p>
                <p className="text-xs font-extralight tracking-[0.12em] text-muted-foreground/60 leading-loose">
                  Water scarcity is measurable — and preventable
                </p>
              </div>

              {/* Closing wisdom */}
              <div className="pt-8">
                <p className="text-lg font-extralight tracking-[0.15em] text-primary/70 leading-loose text-center">
                  Knowing is the beginning of protecting.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

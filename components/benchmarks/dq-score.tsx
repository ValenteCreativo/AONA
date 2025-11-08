"use client"

import type { DataQuality } from "@/lib/mock"

interface DQScoreProps {
  data: DataQuality
}

export function DQScore({ data }: DQScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-primary/80"
    if (score >= 75) return "text-muted-foreground/70"
    return "text-muted-foreground/50"
  }

  return (
    <div className="p-6 border border-border/10 rounded bg-background/50 hover:border-primary/20 transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-sm font-extralight text-foreground/80 tracking-wide">{data.nodeId}</h4>
          <div className="text-xs font-extralight text-muted-foreground/50 mt-1 tracking-wide">{data.location}</div>
        </div>
        <div className={`text-xl font-extralight ${getScoreColor(data.score)}`}>{data.score.toFixed(0)}</div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="font-extralight text-muted-foreground/60 tracking-wide">Completeness</span>
          <span className="font-extralight text-foreground/80">{data.completeness.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="font-extralight text-muted-foreground/60 tracking-wide">Drift</span>
          <span className="font-extralight text-foreground/80">{data.drift.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="font-extralight text-muted-foreground/60 tracking-wide">Last Calibration</span>
          <span className="font-extralight text-foreground/80">{data.calibrationDays}d ago</span>
        </div>
      </div>

      {data.agentSigned && (
        <div className="mt-5 pt-5 border-t border-border/10">
          <div className="flex items-center gap-2 text-xs font-extralight text-primary/60 tracking-wide">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Verified</span>
          </div>
        </div>
      )}
    </div>
  )
}

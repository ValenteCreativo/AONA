"use client"

import { useEffect } from "react"

interface TimeSliderProps {
  timeIndex: number
  onTimeChange: (index: number) => void
  isPlaying: boolean
  onPlayPause: () => void
  maxSteps: number
}

export function TimeSlider({ timeIndex, onTimeChange, isPlaying, onPlayPause, maxSteps }: TimeSliderProps) {
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      onTimeChange((timeIndex + 1) % maxSteps)
    }, 200)

    return () => clearInterval(interval)
  }, [isPlaying, timeIndex, maxSteps, onTimeChange])

  const formatDate = (index: number) => {
    const date = new Date(2024, 0, 1)
    date.setDate(date.getDate() + index)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="bg-background/80 backdrop-blur-sm border border-border/20 rounded-md p-5">
      <div className="flex items-center gap-6">
        {/* Play/Pause */}
        <button
          onClick={onPlayPause}
          className="h-9 w-9 rounded-full border border-border/30 hover:border-primary/40 hover:text-primary transition-all duration-500 flex items-center justify-center text-foreground/70"
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Slider */}
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={maxSteps - 1}
            value={timeIndex}
            onChange={(e) => onTimeChange(Number.parseInt(e.target.value))}
            className="w-full h-1.5 bg-muted/30 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <div className="flex justify-between mt-3">
            <span className="text-xs font-extralight text-muted-foreground/50 tracking-wide">{formatDate(0)}</span>
            <span className="text-xs font-extralight text-foreground/80 tracking-wide">{formatDate(timeIndex)}</span>
            <span className="text-xs font-extralight text-muted-foreground/50 tracking-wide">
              {formatDate(maxSteps - 1)}
            </span>
          </div>
        </div>

        {/* Speed controls - minimal */}
        <div className="flex gap-2">
          <button
            onClick={() => onTimeChange(Math.max(0, timeIndex - 7))}
            className="px-3 py-1.5 text-xs font-extralight tracking-wide rounded border border-border/20 hover:border-primary/30 hover:text-primary transition-all duration-500 text-foreground/70"
          >
            -7d
          </button>
          <button
            onClick={() => onTimeChange(Math.min(maxSteps - 1, timeIndex + 7))}
            className="px-3 py-1.5 text-xs font-extralight tracking-wide rounded border border-border/20 hover:border-primary/30 hover:text-primary transition-all duration-500 text-foreground/70"
          >
            +7d
          </button>
        </div>
      </div>
    </div>
  )
}

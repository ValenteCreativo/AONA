import { cn } from "@/lib/utils"

interface SensorCardProps {
  id: string
  location: string
  status: "active" | "offline" | "maintenance"
  metrics: {
    ph: number
    turbidity: number
    conductivity: number
    temperature: number
    level: number
  }
}

export function SensorCard({ id, location, status, metrics }: SensorCardProps) {
  return (
    <div className="group relative p-6 rounded-lg border border-border/50 bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-light tracking-wide text-muted-foreground">{id}</h4>
          <p className="text-lg font-light mt-1">{location}</p>
        </div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-light tracking-wide",
            status === "active" && "bg-secondary/20 text-secondary",
            status === "offline" && "bg-muted text-muted-foreground",
            status === "maintenance" && "bg-accent/20 text-accent",
          )}
        >
          {status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <p className="text-muted-foreground font-light">pH</p>
          <p className="font-light">{metrics.ph.toFixed(1)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground font-light">Turbidity</p>
          <p className="font-light">{metrics.turbidity.toFixed(1)} NTU</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground font-light">Conductivity</p>
          <p className="font-light">{metrics.conductivity.toFixed(0)} µS/cm</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground font-light">Temp</p>
          <p className="font-light">{metrics.temperature.toFixed(1)}°C</p>
        </div>
      </div>
    </div>
  )
}

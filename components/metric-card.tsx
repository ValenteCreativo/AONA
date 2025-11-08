import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string
  unit: string
  trend: string
  status: "good" | "normal" | "warning" | "critical"
}

export function MetricCard({ label, value, unit, trend, status }: MetricCardProps) {
  const isPositive = trend.startsWith("+")

  return (
    <div className="p-6 rounded-lg border border-border/50 bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
      <p className="text-xs font-light text-muted-foreground tracking-wide uppercase mb-2">{label}</p>
      <div className="flex items-baseline gap-1 mb-2">
        <p className="text-3xl font-light tracking-tight">{value}</p>
        {unit && <p className="text-sm font-light text-muted-foreground">{unit}</p>}
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-xs font-light",
            isPositive && trend !== "+0" ? "text-secondary" : "text-muted-foreground",
          )}
        >
          {trend}
        </span>
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            status === "good" && "bg-secondary",
            status === "normal" && "bg-accent",
            status === "warning" && "bg-yellow-500",
            status === "critical" && "bg-destructive",
          )}
        />
      </div>
    </div>
  )
}

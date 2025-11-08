import type { Reading } from "@/lib/mock"

interface RecentReadingsTableProps {
  readings: Reading[]
}

export function RecentReadingsTable({ readings }: RecentReadingsTableProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border/50">
            <tr className="bg-muted/20">
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                pH
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Turbidity
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Conductivity
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Temp
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {readings.map((reading, i) => (
              <tr key={i} className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4 text-sm font-light">
                  {new Date(reading.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="px-6 py-4 text-sm font-light">{reading.ph.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm font-light">{reading.turbidity.toFixed(1)}</td>
                <td className="px-6 py-4 text-sm font-light">{reading.conductivity.toFixed(0)}</td>
                <td className="px-6 py-4 text-sm font-light">{reading.temperature.toFixed(1)}°C</td>
                <td className="px-6 py-4 text-sm font-light">{reading.level.toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

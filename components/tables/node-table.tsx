import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Node } from "@/lib/mock"

interface NodeTableProps {
  nodes: Node[]
}

export function NodeTable({ nodes }: NodeTableProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border/50">
            <tr className="bg-muted/20">
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Node ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Uptime
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Data Points
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Earned
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-muted-foreground tracking-wide uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {nodes.map((node) => (
              <tr key={node.id} className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/nodes/${node.id}`} className="text-sm font-light text-primary hover:underline">
                    {node.id}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm font-light">{node.location}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-light">{node.uptimePct.toFixed(1)}%</span>
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        node.uptimePct >= 95 && "bg-secondary",
                        node.uptimePct >= 85 && node.uptimePct < 95 && "bg-accent",
                        node.uptimePct < 85 && "bg-muted-foreground",
                      )}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-light">{node.dataPoints.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-light text-primary">${node.earned.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-light tracking-wide",
                      node.uptimePct >= 95 && "bg-secondary/20 text-secondary",
                      node.uptimePct >= 85 && node.uptimePct < 95 && "bg-accent/20 text-accent",
                      node.uptimePct < 85 && "bg-muted text-muted-foreground",
                    )}
                  >
                    {node.uptimePct >= 95 ? "Excellent" : node.uptimePct >= 85 ? "Good" : "Fair"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {nodes.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-sm font-light text-muted-foreground tracking-wide">
            No nodes found matching your criteria
          </p>
        </div>
      )}
    </div>
  )
}

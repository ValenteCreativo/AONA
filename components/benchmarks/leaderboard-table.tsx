"use client"

import { Card } from "@/components/ui/card"
import type { DataQuality } from "@/lib/mock"

interface LeaderboardTableProps {
  data: DataQuality[]
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  // Sort by score descending
  const sortedData = [...data].sort((a, b) => b.score - a.score)

  return (
    <Card className="p-6 border border-border/40">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Rank</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Node</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Location</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Score</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Completeness</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Verified</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((node, index) => (
              <tr key={node.nodeId} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                <td className="text-sm font-light text-foreground py-3 px-4">#{index + 1}</td>
                <td className="text-sm font-light text-foreground py-3 px-4">{node.nodeId}</td>
                <td className="text-sm font-light text-muted-foreground py-3 px-4">{node.location}</td>
                <td className="text-sm font-light text-foreground py-3 px-4">{node.score.toFixed(0)}</td>
                <td className="text-sm font-light text-muted-foreground py-3 px-4">{node.completeness.toFixed(1)}%</td>
                <td className="text-sm font-light py-3 px-4">
                  {node.agentSigned ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

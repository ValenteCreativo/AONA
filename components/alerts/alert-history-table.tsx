"use client"

import { Card } from "@/components/ui/card"

export function AlertHistoryTable() {
  // Mock alert history
  const alerts = [
    {
      id: "alert-1",
      rule: "pH < 6.5",
      node: "node-0001",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      value: 6.2,
      status: "acknowledged",
    },
    {
      id: "alert-2",
      rule: "Turbidity > 40",
      node: "pacific-northwest",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      value: 45.3,
      status: "active",
    },
    {
      id: "alert-3",
      rule: "Water Level < 20",
      node: "node-0003",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      value: 18.5,
      status: "resolved",
    },
  ]

  return (
    <Card className="p-6 border border-border/40">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Timestamp</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Rule</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Node/Region</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Value</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Status</th>
              <th className="text-left text-xs font-light text-muted-foreground py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                <td className="text-sm font-light text-foreground py-3 px-4">
                  {alert.timestamp.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </td>
                <td className="text-sm font-light text-foreground py-3 px-4">{alert.rule}</td>
                <td className="text-sm font-light text-foreground py-3 px-4">{alert.node}</td>
                <td className="text-sm font-light text-foreground py-3 px-4">{alert.value}</td>
                <td className="text-sm font-light py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      alert.status === "active"
                        ? "bg-red-500/20 text-red-700"
                        : alert.status === "acknowledged"
                          ? "bg-yellow-500/20 text-yellow-700"
                          : "bg-green-500/20 text-green-700"
                    }`}
                  >
                    {alert.status}
                  </span>
                </td>
                <td className="text-sm font-light py-3 px-4">
                  {alert.status === "active" && (
                    <button className="text-xs font-light text-primary hover:underline">Acknowledge</button>
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

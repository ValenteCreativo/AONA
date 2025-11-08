"use client"

import { Card } from "@/components/ui/card"
import type { Playbook } from "@/lib/mock"

interface PlaybookCardProps {
  playbook: Playbook
}

export function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <Card className="p-8 border border-border/40 hover:border-primary/40 transition-colors">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <span className="px-3 py-1 text-xs font-light rounded-full bg-primary/10 text-primary">
            {playbook.category}
          </span>
          {playbook.bountyLinked && (
            <span className="px-3 py-1 text-xs font-light rounded-full bg-secondary/10 text-secondary">
              Bounty Linked
            </span>
          )}
        </div>
        <h3 className="text-xl font-light tracking-wide text-foreground mb-2">{playbook.title}</h3>
        <p className="text-sm font-light text-muted-foreground leading-relaxed">{playbook.summary}</p>
      </div>

      {/* Prerequisites */}
      <div className="mb-6">
        <div className="text-xs font-light text-muted-foreground mb-2">Data Prerequisites</div>
        <ul className="space-y-1">
          {playbook.prerequisites.map((prereq, i) => (
            <li key={i} className="text-xs font-light text-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{prereq}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps preview */}
      <div className="mb-6">
        <div className="text-xs font-light text-muted-foreground mb-2">
          Implementation Steps ({playbook.steps.length})
        </div>
        <ol className="space-y-1">
          {playbook.steps.slice(0, 3).map((step, i) => (
            <li key={i} className="text-xs font-light text-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
          {playbook.steps.length > 3 && (
            <li className="text-xs font-light text-muted-foreground">+ {playbook.steps.length - 3} more steps</li>
          )}
        </ol>
      </div>

      {/* Impact badge */}
      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <div className="text-xs font-light text-muted-foreground mb-1">Expected Impact</div>
        <div className="text-sm font-light text-green-700">{playbook.estImpact}</div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 bg-primary text-white rounded-md font-light text-sm hover:bg-primary/90 transition-colors">
          View Full Guide
        </button>
        {playbook.bountyLinked && (
          <button className="px-4 py-2 border border-border/40 rounded-md font-light text-sm hover:bg-muted/50 transition-colors">
            See Bounty
          </button>
        )}
      </div>
    </Card>
  )
}

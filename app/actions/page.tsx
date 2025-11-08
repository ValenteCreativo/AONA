"use client"

import { useState } from "react"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { PlaybookCard } from "@/components/actions/playbook-card"
import { generateMockPlaybooks } from "@/lib/mock"

export default function ActionsPage() {
  const playbooks = generateMockPlaybooks()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "Conservation", "Infrastructure", "Agriculture", "Community", "Groundwater"]
  const filteredPlaybooks =
    selectedCategory === "all" ? playbooks : playbooks.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">Action Playbooks</h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Transform water intelligence into real-world stewardship. Explore evidence-based playbooks that guide
            communities from data signals to sustainable water practices.
          </p>
        </div>
      </div>

      <InkBrushDivider />

      {/* Category filter */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-light rounded-md border transition-colors ${
                selectedCategory === category
                  ? "border-primary bg-primary text-white"
                  : "border-border/40 hover:bg-muted/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Playbooks grid */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPlaybooks.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} />
          ))}
        </div>
      </div>

      {/* Integration hooks */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-muted/30 border border-border/40 rounded-lg p-8 max-w-4xl">
          <h3 className="text-sm font-light tracking-widest text-primary mb-4">TODO (Claude Integration)</h3>
          <ul className="space-y-2 text-sm font-light text-muted-foreground">
            <li>• Partner APIs for local water utilities</li>
            <li>• Offline toolkit downloads (PDF, mobile app)</li>
            <li>• Playbook versioning & community contributions</li>
            <li>• Impact tracking & reporting</li>
            <li>• Link to /coverage bounties for hardware needs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

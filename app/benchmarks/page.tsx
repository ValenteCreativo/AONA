"use client"

import { InkBrushDivider } from "@/components/ink-brush-divider"
import { DQScore } from "@/components/benchmarks/dq-score"
import { IntegrityBadge } from "@/components/benchmarks/integrity-badge"
import { LeaderboardTable } from "@/components/benchmarks/leaderboard-table"
import { generateMockDataQuality } from "@/lib/mock"

export default function BenchmarksPage() {
  const qualityData = generateMockDataQuality()

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">Data Integrity & Sensor QA</h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Build trust through transparency. Monitor data quality scores, agent signatures, and sensor reliability
            metrics across the AONA network.
          </p>
        </div>
      </div>

      <InkBrushDivider />

      {/* Quality metrics */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-light tracking-widest text-foreground mb-6">Node Quality Scores</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualityData.slice(0, 6).map((node) => (
            <DQScore key={node.nodeId} data={node} />
          ))}
        </div>
      </div>

      {/* Integrity overview */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-light tracking-widest text-foreground mb-6">Agent Verification Status</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 border border-border/40 rounded-lg bg-background">
            <div className="flex items-center gap-4 mb-4">
              <IntegrityBadge verified={true} />
              <div>
                <h3 className="text-lg font-light text-foreground">Agent-Signed Data</h3>
                <p className="text-sm font-light text-muted-foreground">
                  {qualityData.filter((d) => d.agentSigned).length} of {qualityData.length} nodes
                </p>
              </div>
            </div>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">
              Autonomous agents cryptographically sign all sensor readings, ensuring data provenance and tamper
              detection.
            </p>
          </div>

          <div className="p-8 border border-border/40 rounded-lg bg-background">
            <div className="text-4xl font-light text-primary mb-2">
              {((qualityData.filter((d) => d.agentSigned).length / qualityData.length) * 100).toFixed(1)}%
            </div>
            <h3 className="text-lg font-light text-foreground mb-2">Network Integrity</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">
              Percentage of data points with valid cryptographic signatures from oracle agents.
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-light tracking-widest text-foreground mb-6">Reliability Leaderboard</h2>
        <LeaderboardTable data={qualityData} />
      </div>

      {/* Integration hooks */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-muted/30 border border-border/40 rounded-lg p-8 max-w-4xl">
          <h3 className="text-sm font-light tracking-widest text-primary mb-4">TODO (Claude Integration)</h3>
          <ul className="space-y-2 text-sm font-light text-muted-foreground">
            <li>• Oracle signature verification (Ed25519/ECDSA)</li>
            <li>• Attestation storage (on-chain/IPFS)</li>
            <li>• Data quality scoring algorithm</li>
            <li>• Calibration tracking & alerts</li>
            <li>• Reputation system & slashing conditions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

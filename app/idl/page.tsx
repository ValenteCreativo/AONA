"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { PageHeading } from "@/components/page-heading"
import idl from "@/app/idl/aona_oracle.json"

export default function IDLPage() {
  const programAddress = idl.address

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        <PageHeading
          title="AONA Oracle Program"
          subtitle="Decentralized water quality monitoring on Solana. Store sensor readings on-chain with autonomous agent verification."
          badges={[
            { label: "Solana Program", icon: "⛓️" },
            { label: "Anchor Framework", icon: "⚓" },
            { label: "Devnet", icon: "🔧" }
          ]}
        />
      </div>

      <InkBrushDivider />

      {/* Program Address */}
      <div className="container mx-auto px-6 py-8">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-cyan-500/10 border-primary/30">
          <CardHeader>
            <CardTitle className="text-xl font-light tracking-wide">Program Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <code className="text-sm font-mono bg-black/20 px-4 py-2 rounded flex-1 overflow-x-auto">
                {programAddress}
              </code>
              <Badge variant="outline" className="text-xs whitespace-nowrap">Devnet</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              View on Solana Explorer:{" "}
              <a
                href={`https://explorer.solana.com/address/${programAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {programAddress.slice(0, 8)}...
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Program Overview */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-light tracking-widest text-foreground mb-8">Program Architecture</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg font-light tracking-wide flex items-center gap-2">
                <span>📦</span>
                Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-light text-primary mb-2">Node Account</h4>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  Represents a physical water monitoring sensor. Stores authority (owner), agent (authorized submitter), name, and PDA bump.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-light text-primary mb-2">State Account</h4>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  Stores the latest sensor reading with timestamp, pH, turbidity, conductivity, temperature, water level, and sequence number.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg font-light tracking-wide flex items-center gap-2">
                <span>⚙️</span>
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-light text-primary mb-2">create_node</h4>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  Initialize a new monitoring node. Creates PDA using seeds: ["node", authority, agent].
                </p>
              </div>
              <div>
                <h4 className="text-sm font-light text-primary mb-2">submit_reading</h4>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  Submit water quality data from authorized agent. Emits ReadingEvent and updates State PDA with new readings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Water Quality Metrics */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-light tracking-widest text-foreground mb-8">Water Quality Metrics</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              metric: "pH Level",
              field: "ph",
              type: "f32",
              description: "Acidity/alkalinity measurement (0-14 scale)",
              safe: "6.5 - 8.5"
            },
            {
              metric: "Turbidity",
              field: "turbidity",
              type: "f32",
              description: "Water clarity measurement in NTU (Nephelometric Turbidity Units)",
              safe: "< 1.0 NTU"
            },
            {
              metric: "Conductivity",
              field: "conductivity",
              type: "f32",
              description: "Electrical conductivity in µS/cm (dissolved solids indicator)",
              safe: "< 1500 µS/cm"
            },
            {
              metric: "Temperature",
              field: "temp",
              type: "f32",
              description: "Water temperature in Celsius",
              safe: "< 30°C"
            },
            {
              metric: "Water Level",
              field: "level",
              type: "f32",
              description: "Water level measurement in meters",
              safe: "Varies"
            },
            {
              metric: "Timestamp",
              field: "ts",
              type: "i64",
              description: "Unix timestamp of reading submission",
              safe: "Current time"
            }
          ].map((item, i) => (
            <Card key={i} className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-sm font-light tracking-wide">{item.metric}</CardTitle>
                <Badge variant="outline" className="text-xs w-fit">
                  {item.field}: {item.type}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-light text-muted-foreground mb-3 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-xs font-light">
                  <span className="text-primary">Safe Range:</span> {item.safe}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Program Flow */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-light tracking-widest text-foreground mb-8">How It Works</h2>
        
        <Card className="border-border/50 bg-card/50">
          <CardContent className="py-8">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Node Registration",
                  description: "Authority (sensor owner) calls create_node with agent public key and node name. Program creates Node PDA to track ownership and authorization."
                },
                {
                  step: "2",
                  title: "Agent Authorization",
                  description: "Only the designated agent (autonomous AI or sensor firmware) can submit readings. Agent must sign submit_reading transactions."
                },
                {
                  step: "3",
                  title: "Reading Submission",
                  description: "Authorized agent submits ReadingInput struct with water quality metrics. Program validates agent signature against Node account."
                },
                {
                  step: "4",
                  title: "State Update",
                  description: "Program creates or updates State PDA with new readings, increments sequence number, and emits ReadingEvent for indexers."
                },
                {
                  step: "5",
                  title: "Data Access",
                  description: "Frontend queries Node and State accounts via RPC. AI agents analyze readings and generate alerts. x402 protocol enables micropayment for data access."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-light">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-light text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Error Handling */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-light tracking-widest text-foreground mb-8">Security Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg font-light tracking-wide">Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm font-light text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Only authorized agent can submit readings for a node</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Agent signature verified on every submit_reading call</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>PDAs prevent unauthorized account modifications</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Authority retains ownership and control over node</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg font-light tracking-wide">Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <code className="text-xs font-mono bg-black/20 px-2 py-1 rounded">6000: UnauthorizedAgent</code>
                  <p className="text-xs font-light text-muted-foreground mt-2">
                    Thrown when a non-authorized agent attempts to submit readings. Prevents data tampering.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Start */}
      <div className="container mx-auto px-6 py-8 mb-12">
        <h2 className="text-3xl font-light tracking-widest text-foreground mb-8">Quick Start</h2>
        
        <Card className="border-border/50 bg-card/50">
          <CardContent className="py-8 space-y-6">
            <div>
              <h4 className="text-sm font-light text-primary mb-3">1. Seed Nodes (Development)</h4>
              <code className="text-sm font-mono bg-black/20 px-4 py-2 rounded block">npm run seed</code>
              <p className="text-xs font-light text-muted-foreground mt-2">
                Creates demo water monitoring nodes on Solana devnet with sample readings.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-light text-primary mb-3">2. Run Autonomous Agent</h4>
              <code className="text-sm font-mono bg-black/20 px-4 py-2 rounded block">npm run agent</code>
              <p className="text-xs font-light text-muted-foreground mt-2">
                Launches AI agent that discovers nodes, pays for data access via x402, and analyzes water quality.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-light text-primary mb-3">3. View Dashboard</h4>
              <code className="text-sm font-mono bg-black/20 px-4 py-2 rounded block">npm run dev</code>
              <p className="text-xs font-light text-muted-foreground mt-2">
                Start Next.js frontend to visualize on-chain data, agent alerts, and network metrics.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

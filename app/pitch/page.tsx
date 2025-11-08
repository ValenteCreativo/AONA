import Link from "next/link"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { ArrowLeft } from "lucide-react"

export default function PitchPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="fixed top-24 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-extralight text-muted-foreground hover:text-foreground transition-colors tracking-wide"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-32 space-y-32">
        {/* Mission One-liner */}
        <section className="text-center space-y-8 min-h-[60vh] flex flex-col justify-center">
          <h1 className="font-extralight tracking-[0.2em] text-balance">AONA</h1>
          <InkBrushDivider />
          <p className="text-2xl md:text-3xl font-extralight tracking-[0.12em] text-foreground/70 leading-relaxed max-w-3xl mx-auto text-balance">
            Autonomous intelligence for Earth's water systems
          </p>
          <InkBrushDivider />
        </section>

        {/* Problem */}
        <section className="space-y-12">
          <h2 className="text-center font-extralight tracking-[0.1em]">The Intelligence Gap</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              Global water systems face unprecedented stress. Climate change, pollution, and resource depletion demand
              real-time intelligence.
            </p>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              Yet current monitoring is fragmented, delayed, and expensive. Data silos prevent coordination. Communities
              lack access to critical information.
            </p>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              Water knows what's happening. But the knowledge doesn't flow.
            </p>
          </div>
        </section>

        <InkBrushDivider />

        {/* Solution */}
        <section className="space-y-12">
          <h2 className="text-center font-extralight tracking-[0.1em]">The Network Translates</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              AONA creates an autonomous oracle network for hydrological data. Sensors deployed across watersheds stream
              real-time information.
            </p>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              Autonomous agents verify data integrity through cryptographic signatures. The x402 protocol enables
              continuous micropayments for data provision.
            </p>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              Information becomes liquid. Data flows like water itself.
            </p>
          </div>
        </section>

        <InkBrushDivider />

        {/* Architecture */}
        <section className="space-y-12">
          <h2 className="text-center font-extralight tracking-[0.1em]">Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                layer: "Sensor Layer",
                description:
                  "Distributed IoT sensors measuring pH, turbidity, conductivity, temperature, and water level across watersheds",
              },
              {
                layer: "Agent Layer",
                description:
                  "Autonomous verification agents validate data integrity and provide cryptographic proof of authenticity",
              },
              {
                layer: "Protocol Layer",
                description: "x402 micropayments on Solana enable continuous value flow for real-time data provision",
              },
            ].map((item) => (
              <div
                key={item.layer}
                className="space-y-4 p-8 rounded-lg border border-border/30 bg-card/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="text-lg font-light tracking-[0.08em] text-primary/80">{item.layer}</h3>
                <p className="text-sm font-extralight leading-relaxed text-muted-foreground tracking-wide text-pretty">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <InkBrushDivider />

        {/* Why Solana + x402 */}
        <section className="space-y-12">
          <h2 className="text-center font-extralight tracking-[0.1em]">Why Solana + x402</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-light tracking-[0.08em] text-primary/80">Speed</h3>
              <p className="text-base font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
                400ms block times enable near-instantaneous data verification and payment settlement for real-time
                intelligence.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-light tracking-[0.08em] text-primary/80">Economics</h3>
              <p className="text-base font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
                Sub-cent transaction costs make continuous micropayments viable. Data providers earn sustainably.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-light tracking-[0.08em] text-primary/80">Interoperability</h3>
              <p className="text-base font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
                x402 protocol enables seamless value streaming between agents. Water data becomes composable
                infrastructure.
              </p>
            </div>
          </div>
        </section>

        <InkBrushDivider />

        <section className="space-y-12">
          <h2 className="text-center font-extralight tracking-[0.1em]">Global Intelligence Layer</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              AONA provides a comprehensive intelligence platform that transforms raw sensor data into actionable water
              stewardship.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { feature: "Atlas", description: "GIS visualization of global water data layers across time" },
                { feature: "Models", description: "Anomaly detection, forecasting, and drought indices" },
                { feature: "Coverage", description: "DePIN incentives for sensor deployment in coverage gaps" },
                { feature: "Simulator", description: "What-if scenario modeling for resilience planning" },
              ].map((item) => (
                <div
                  key={item.feature}
                  className="p-6 rounded-lg border border-border/30 bg-card/20 backdrop-blur-sm space-y-2"
                >
                  <h3 className="text-sm font-light tracking-[0.08em] text-primary/80">{item.feature}</h3>
                  <p className="text-sm font-extralight leading-relaxed text-muted-foreground tracking-wide text-pretty">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* </CHANGE> */}

        <InkBrushDivider />

        {/* Manifesto Moment */}
        <section className="text-center space-y-12 py-16">
          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl font-extralight tracking-[0.12em] text-foreground/80 leading-relaxed">
              Water knows.
            </p>
            <p className="text-2xl md:text-3xl font-extralight tracking-[0.12em] text-foreground/80 leading-relaxed">
              The network translates.
            </p>
            <p className="text-2xl md:text-3xl font-extralight tracking-[0.12em] text-foreground/80 leading-relaxed">
              Communities act.
            </p>
          </div>
        </section>

        <InkBrushDivider />

        {/* Pilot Plan */}
        <section className="space-y-12">
          <h2 className="text-center font-extralight tracking-[0.1em]">Pilot Deployment</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide text-pretty">
              Initial deployment targets water-stressed regions in Latin America. Partnership with local communities and
              research institutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { phase: "Phase 1", focus: "Deploy 50 sensor nodes across 3 watersheds" },
                { phase: "Phase 2", focus: "Validate agent verification and x402 micropayments" },
                { phase: "Phase 3", focus: "Open network to third-party data consumers" },
                { phase: "Phase 4", focus: "Scale to 500 nodes, expand to new regions" },
              ].map((item) => (
                <div
                  key={item.phase}
                  className="p-6 rounded-lg border border-border/30 bg-card/20 backdrop-blur-sm space-y-2"
                >
                  <h3 className="text-sm font-light tracking-[0.08em] text-primary/80">{item.phase}</h3>
                  <p className="text-sm font-extralight leading-relaxed text-muted-foreground tracking-wide text-pretty">
                    {item.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InkBrushDivider />

        {/* Call to Action */}
        <section className="text-center space-y-12 pb-16">
          <h2 className="font-extralight tracking-[0.1em]">Join the Flow</h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-foreground/70 tracking-wide max-w-2xl mx-auto text-pretty">
            Partner with us to build intelligence infrastructure for Earth's water systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link href="/integrate">
              <button className="px-8 py-4 rounded-full border border-primary/40 bg-primary/10 text-primary font-extralight tracking-[0.12em] hover:bg-primary/20 transition-all duration-300">
                Deploy Infrastructure
              </button>
            </Link>
            <Link href="/atlas">
              <button className="px-8 py-4 rounded-full border border-border/40 text-foreground/70 font-extralight tracking-[0.12em] hover:border-primary/40 hover:text-foreground transition-all duration-300">
                Explore Atlas
              </button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

import Link from "next/link"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { WaterRippleBackground } from "@/components/water-ripple-background"
import { HeroInkBrush } from "@/components/hero-ink-brush"
import { HydrologyContours } from "@/components/hydrology-contours"
import { WaterCrisisModal } from "@/components/water-crisis-modal"
import WaterParticles from "@/components/ui/WaterParticles"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <WaterRippleBackground />
      <HydrologyContours />

      {/* ✅ capa sutil de partículas */}
      <WaterParticles className="pointer-events-none absolute inset-0 -z-10" />

      <section className="relative pt-48 pb-40 px-6 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-20">
            <HeroInkBrush />

            <div className="space-y-20">
              <h1 className="font-extralight tracking-[0.2em] text-balance">
                <span className="inline-block">AONA</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground/60 font-extralight tracking-[0.15em] max-w-2xl mx-auto leading-loose">
                Autonomous Oracles for Networked Aquatic Systems
              </p>

              <p className="text-xs text-muted-foreground/40 font-extralight tracking-[0.18em] max-w-xl mx-auto leading-relaxed">
                Hydrology for planetary resilience
              </p>
            </div>

            <div className="py-24">
              <InkBrushDivider />
              <div className="py-16 space-y-6">
                <p className="text-base md:text-lg font-extralight tracking-[0.18em] text-foreground/60">
                  Water knows.
                </p>
                <p className="text-base md:text-lg font-extralight tracking-[0.18em] text-foreground/60">
                  The network translates.
                </p>
                <p className="text-base md:text-lg font-extralight tracking-[0.18em] text-foreground/60">
                  AONA.
                </p>
              </div>
              <InkBrushDivider />
            </div>

            <div className="space-y-20 py-24">
              <div className="space-y-12">
                <h2 className="text-2xl font-extralight tracking-[0.2em] text-foreground/70">Why AONA Exists</h2>

                <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                  <div className="space-y-4">
                    <p className="text-sm font-extralight tracking-[0.15em] text-foreground/80 leading-loose">
                      Water systems are collapsing quietly.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-extralight tracking-[0.15em] text-foreground/80 leading-loose">
                      Most regions lack real-time hydrological intelligence.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-extralight tracking-[0.15em] text-foreground/80 leading-loose">
                      What we cannot measure, we cannot protect.
                    </p>
                  </div>
                </div>

                <div className="pt-12">
                  <p className="text-base md:text-lg font-extralight tracking-[0.15em] text-primary/80 leading-loose max-w-3xl mx-auto">
                    AONA turns distributed water sensing into insight, integrity, and action.
                  </p>
                </div>
              </div>

              <InkBrushDivider />

              <div className="space-y-12 pt-12">
                <h2 className="text-2xl font-extralight tracking-[0.2em] text-foreground/70">How It Works</h2>

                <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                  <div className="space-y-4">
                    <div className="text-3xl font-extralight text-primary/60">01</div>
                    <h3 className="text-sm font-extralight tracking-[0.15em] text-foreground/80">Sensors speak</h3>
                    <p className="text-xs font-extralight tracking-[0.12em] text-muted-foreground/60 leading-loose">
                      Distributed nodes measure what matters
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="text-3xl font-extralight text-primary/60">02</div>
                    <h3 className="text-sm font-extralight tracking-[0.15em] text-foreground/80">Agents verify</h3>
                    <p className="text-xs font-extralight tracking-[0.12em] text-muted-foreground/60 leading-loose">
                      Cryptographic signatures ensure integrity
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="text-3xl font-extralight text-primary/60">03</div>
                    <h3 className="text-sm font-extralight tracking-[0.15em] text-foreground/80">Signals guide</h3>
                    <p className="text-xs font-extralight tracking-[0.12em] text-muted-foreground/60 leading-loose">
                      Data becomes protection
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 items-center pt-16">
              <Link href="/atlas" className="group text-base font-extralight tracking-[0.15em] text-foreground/70 hover:text-primary transition-all duration-500 py-3">
                Observe the Waters →
              </Link>
              <Link href="/insight" className="group text-base font-extralight tracking-[0.15em] text-foreground/70 hover:text-primary transition-all duration-500 py-3">
                Read the Signals →
              </Link>
              <Link href="/integrate" className="group text-base font-extralight tracking-[0.15em] text-foreground/70 hover:text-primary transition-all duration-500 py-3">
                Join the Network →
              </Link>

              <WaterCrisisModal />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

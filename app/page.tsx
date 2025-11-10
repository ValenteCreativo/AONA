import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, Droplets, Network, Shield, Zap } from "lucide-react"
import { HeroInkBrush } from "@/components/hero-ink-brush"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { WaterRippleBackground } from "@/components/water-ripple-background"
import WaterParticles from "@/components/ui/WaterParticles"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <WaterRippleBackground />
      <WaterParticles className="pointer-events-none absolute inset-0 -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
        <div className="container mx-auto max-w-5xl text-center">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/Aona-Favicon.svg"
              alt="AONA"
              width={80}
              height={80}
              className="opacity-80"
            />
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-extralight tracking-[0.3em] text-foreground/90 mb-6">
            AONA
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light tracking-widest text-foreground/60 mb-8">
            Autonomous Intelligence for Water Security
          </p>

          {/* Tech badges */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            <Badge variant="outline" className="text-xs">⛓️ Solana Blockchain</Badge>
            <Badge variant="outline" className="text-xs">🤖 AI Agents</Badge>
            <Badge variant="outline" className="text-xs">🔐 HTTP 402</Badge>
            <Badge variant="outline" className="text-xs">🌐 Open APIs</Badge>
          </div>

          {/* Poetic tagline */}
          <div className="max-w-2xl mx-auto space-y-4 mb-12">
            <p className="text-lg font-light tracking-wide text-foreground/80">
              Water knows.
            </p>
            <p className="text-lg font-light tracking-wide text-foreground/80">
              The network translates.
            </p>
            <p className="text-lg font-light tracking-wide text-foreground/80">
              Crisis becomes prevention.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                View Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/atlas">
              <Button size="lg" variant="outline" className="gap-2">
                Explore Atlas
              </Button>
            </Link>
            <Link href="https://github.com/ValenteCreativo/AONA" target="_blank">
              <Button size="lg" variant="ghost" className="gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Button>
            </Link>
          </div>
        </div>

        <HeroInkBrush />
      </section>

      <InkBrushDivider />

      {/* Why AONA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-12">
            Why AONA
          </h2>

          <div className="prose prose-lg max-w-none text-center">
            <p className="text-lg font-light leading-relaxed text-foreground/80 mb-6">
              Water contamination events often go undetected until after populations are affected.
              Traditional monitoring is centralized, expensive, and reactive.
            </p>
            <p className="text-lg font-light leading-relaxed text-foreground/80 mb-6">
              AONA is decentralized, autonomous, and predictive—
              creating early warning infrastructure for planetary hydrology.
            </p>
            <p className="text-xl font-light leading-relaxed text-foreground mb-8 italic">
              What we cannot measure, we cannot protect.
            </p>
          </div>

          <div className="text-center">
            <Link href="/about">
              <Button variant="link" className="gap-2">
                Read the full story <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <InkBrushDivider />

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Four layers of autonomous intelligence protecting water systems
          </p>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Step 1 */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extralight text-primary/60">01</div>
                  <div>
                    <CardTitle className="text-2xl font-light mb-2">Sense</CardTitle>
                    <Badge variant="outline" className="text-xs">On-chain State</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  Distributed sensor nodes monitor water quality continuously.
                </p>
                <div className="space-y-1 text-xs font-light text-muted-foreground">
                  <p>• pH, Turbidity, Temperature, Conductivity, Flow</p>
                  <p>• Readings stored on Solana blockchain</p>
                  <p>• Cryptographic signatures ensure integrity</p>
                </div>
                <div className="mt-4">
                  <Link href="/nodes">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      Explore nodes <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extralight text-primary/60">02</div>
                  <div>
                    <CardTitle className="text-2xl font-light mb-2">Verify</CardTitle>
                    <Badge variant="outline" className="text-xs">HTTP 402 Protocol</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  AI agents pay for readings using blockchain micropayments.
                </p>
                <div className="space-y-1 text-xs font-light text-muted-foreground">
                  <p>• Autonomous agents with Solana wallets</p>
                  <p>• Pay 0.001-0.01 SOL per reading</p>
                  <p>• Economic incentive for data quality</p>
                </div>
                <div className="mt-4">
                  <Link href="/integrate">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      API documentation <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extralight text-primary/60">03</div>
                  <div>
                    <CardTitle className="text-2xl font-light mb-2">Predict</CardTitle>
                    <Badge variant="outline" className="text-xs">Multi-source Analysis</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  Machine learning analyzes patterns across multiple data sources.
                </p>
                <div className="space-y-1 text-xs font-light text-muted-foreground">
                  <p>• Sensor readings (on-chain)</p>
                  <p>• Weather forecasts (Open-Meteo API)</p>
                  <p>• River flow data (USGS Water Services)</p>
                </div>
                <div className="mt-4">
                  <Link href="/models">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      View models <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extralight text-primary/60">04</div>
                  <div>
                    <CardTitle className="text-2xl font-light mb-2">Protect</CardTitle>
                    <Badge variant="outline" className="text-xs">Automated Response</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  Autonomous alerts activate response protocols.
                </p>
                <div className="space-y-1 text-xs font-light text-muted-foreground">
                  <p>• EPA and regulatory agencies</p>
                  <p>• Local water authorities</p>
                  <p>• Affected communities</p>
                </div>
                <div className="mt-4">
                  <Link href="/alerts">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      View alerts <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <InkBrushDivider />

      {/* Technology Stack Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-4">
            The Technology
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Built on Solana for planetary-scale water security
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solana */}
            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <Shield className="h-5 w-5 text-purple-500" />
                  Solana Blockchain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground mb-4">
                  400ms transaction finality. $0.00025 per transaction.
                  Enables real-time micropayments at planetary scale.
                </p>
                <div className="flex gap-2">
                  <Link href="/idl">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      View IDL <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* HTTP 402 */}
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <Zap className="h-5 w-5 text-blue-500" />
                  HTTP 402 Protocol
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground mb-4">
                  Payment Required status code. Sensors earn revenue for data quality.
                  Creates economic incentive for network expansion.
                </p>
                <div className="flex gap-2">
                  <Link href="/integrate">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      API docs <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* AI Agents */}
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <Network className="h-5 w-5 text-green-500" />
                  Autonomous AI Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground mb-4">
                  Self-executing intelligence with no human oversight.
                  Discovers nodes, pays for data, validates integrity, generates predictions.
                </p>
                <div className="flex gap-2">
                  <Link href="/actions">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      View actions <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Open APIs */}
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <Droplets className="h-5 w-5 text-orange-500" />
                  Free & Open APIs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground mb-4">
                  USGS Water Services. Open-Meteo. Switchboard Oracle.
                  No vendor lock-in. Community-owned infrastructure.
                </p>
                <div className="flex gap-2">
                  <Link href="/atlas">
                    <Button variant="link" size="sm" className="gap-1 px-0">
                      See live data <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <InkBrushDivider />

      {/* Network Status Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 text-xs">🟢 NETWORK STATUS: LIVE</Badge>
          <h2 className="text-4xl font-extralight tracking-[0.2em] mb-6">
            Explore the Network
          </h2>
          <p className="text-lg font-light text-muted-foreground mb-12 max-w-2xl mx-auto">
            Real-time data. Real protection. Open infrastructure.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="font-light text-sm mb-1">Dashboard</p>
                  <p className="text-xs text-muted-foreground">Network metrics</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/atlas">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="font-light text-sm mb-1">Atlas</p>
                  <p className="text-xs text-muted-foreground">Interactive map</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/nodes">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="font-light text-sm mb-1">Nodes</p>
                  <p className="text-xs text-muted-foreground">Sensor network</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/alerts">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="font-light text-sm mb-1">Alerts</p>
                  <p className="text-xs text-muted-foreground">Active warnings</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <InkBrushDivider />

      {/* Join Network Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-16">
            Join the Network
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Communities */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-light">For Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground mb-4">
                  Report water quality issues with your smartphone.
                  Your phone becomes a sensor.
                </p>
                <Link href="/contribute">
                  <Button variant="outline" className="w-full gap-2">
                    Contribute Data <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* For Developers */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-light">For Developers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground mb-4">
                  Open source. Public APIs. Solana devnet.
                  Build applications on AONA infrastructure.
                </p>
                <Link href="/integrate">
                  <Button variant="outline" className="w-full gap-2">
                    Documentation <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* For Authorities */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-light">For Water Authorities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-muted-foreground mb-4">
                  Integrate AONA alerts into existing emergency response.
                  Free API access for government agencies.
                </p>
                <Link href="/pitch">
                  <Button variant="outline" className="w-full gap-2">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <InkBrushDivider />

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="text-2xl font-extralight tracking-wide mb-6 text-foreground/80">
            Built with intelligence and urgency.
          </p>
          <p className="text-xl font-light tracking-wide mb-12 text-foreground/60">
            Water is finite. Protection is infinite.
          </p>
          <div className="text-6xl font-extralight tracking-[0.3em] text-foreground/90">
            AONA
          </div>
        </div>
      </section>
    </div>
  )
}

import { InkBrushDivider } from "@/components/ink-brush-divider"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6 relative">
      {/* Zen water ink background */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100,500 Q300,300 500,500 T900,500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
          <circle
            cx="500"
            cy="500"
            r="300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary"
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-2">About AONA</h1>
          <p className="text-muted-foreground font-light text-sm tracking-wide">
            Autonomous Oracles for Networked Aquatic Systems
          </p>
        </div>

        <InkBrushDivider />

        {/* Poem */}
        <section className="my-16 text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <p className="text-2xl font-light tracking-wider leading-relaxed text-balance">Water knows.</p>
            <p className="text-2xl font-light tracking-wider leading-relaxed text-balance">The network translates.</p>
            <p className="text-2xl font-light tracking-wider leading-relaxed text-balance">AONA.</p>
          </div>
        </section>

        <InkBrushDivider />

        {/* Mission */}
        <section className="my-16">
          <h2 className="text-3xl mb-8 text-center">Mission</h2>
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty">
              AONA transforms hydrological data into liquid onchain assets through autonomous oracles and continuous
              micropayment streams.
            </p>
            <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty">
              We believe that environmental data should flow as freely as water itself—verified by autonomous agents,
              compensated through x402, and preserved onchain for the collective good.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="my-16">
          <h2 className="text-3xl mb-8 text-center">Vision</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              <div className="p-8 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="text-xl font-light mb-3 tracking-wide">Sacred Data</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Water is sacred. The data it carries about our environment deserves the same reverence—transparent,
                  verified, and accessible to all.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="text-xl font-light mb-3 tracking-wide">Liquid Intelligence</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Like water finding its path, environmental intelligence should flow seamlessly through networks,
                  creating value at every node.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="text-xl font-light mb-3 tracking-wide">Protocol Meets Nature</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  By bridging DePIN infrastructure with natural systems, we create regenerative networks that benefit
                  both technology and environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InkBrushDivider />

        {/* Roadmap */}
        <section className="my-16">
          <h2 className="text-3xl mb-8 text-center">Roadmap</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                phase: "Phase 1",
                title: "Foundation",
                status: "In Progress",
                items: ["Front-end scaffold (Complete)", "Design system & UX", "Mock data & visualization"],
              },
              {
                phase: "Phase 2",
                title: "Protocol Integration",
                status: "Next",
                items: ["x402 micropayment streaming", "Autonomous agent deployment", "Solana onchain integration"],
              },
              {
                phase: "Phase 3",
                title: "Network Launch",
                status: "Planned",
                items: ["Sensor network deployment", "Data marketplace", "Community governance"],
              },
              {
                phase: "Phase 4",
                title: "Ecosystem Growth",
                status: "Future",
                items: ["Multi-chain expansion", "Advanced AI oracles", "Global water intelligence network"],
              },
            ].map((phase, i) => (
              <div key={i} className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-light text-primary tracking-wide uppercase mb-1">{phase.phase}</p>
                    <h3 className="text-lg font-light tracking-wide">{phase.title}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-light tracking-wide bg-primary/20 text-primary">
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-light text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Repository Link */}
        <section className="my-16 text-center">
          <div className="p-8 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-light mb-4 tracking-wide">Open Source</h3>
            <p className="text-sm font-light text-muted-foreground mb-6">
              AONA is being built in the open. View the repository and contribute to the project.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-light tracking-wide text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub (Placeholder)
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

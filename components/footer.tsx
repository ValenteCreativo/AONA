import { InkBrushDivider } from "./ink-brush-divider"
import Link from "next/link"

const REPO_URL = "https://github.com/ValenteCreativo/AONA"

const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Atlas", href: "/atlas" },
  { label: "Insight", href: "/insight" },
  { label: "Nodes", href: "/nodes" },
  { label: "Integrate", href: "/integrate" },
  { label: "Story", href: "/pitch" },
  { label: "About", href: "/about" },
]

const NAV_MORE = [
  { label: "Impact", href: "/impact" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Contribute", href: "/contribute" },
  { label: "Coverage", href: "/coverage" },
  { label: "Simulator", href: "/simulator" },
  { label: "IDL", href: "/idl" },
  // Si estas rutas son públicas en tu app, descomenta:
  // { label: "Actions", href: "/actions" },
  // { label: "API", href: "/api" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/10 backdrop-blur-sm mt-32">
      <InkBrushDivider />
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Brand & Mission */}
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-lg font-extralight tracking-[0.25em]">AONA</h3>
            <p className="text-sm text-muted-foreground/70 font-extralight leading-loose tracking-wide">
              Water knows. The network translates.
            </p>
            <div className="pt-2">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-300"
                aria-label="View AONA on GitHub"
              >
                {/* GitHub mark */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-extralight tracking-[0.12em] mb-6 text-muted-foreground/80">Navigate</h4>
            <ul className="space-y-3">
              {NAV_PRIMARY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-300 font-extralight tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore / All pages */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-extralight tracking-[0.12em] mb-6 text-muted-foreground/80">Explore</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {NAV_MORE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-300 font-extralight tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-16 pt-8 border-t border-border/10 text-center space-y-2">
          <p className="text-xs text-muted-foreground/60 font-extralight tracking-[0.15em]">
            Autonomous Oracles for Networked Aquatic Systems
          </p>
          <p className="text-xs text-muted-foreground/50 font-extralight tracking-[0.18em]">
            From México with 💙
          </p>
        </div>
      </div>
    </footer>
  )
}

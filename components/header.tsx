"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { WalletButton } from "@/components/solana/WalletButton"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "🔴 Dashboard", highlight: true },
    { href: "/atlas", label: "Atlas" },
    { href: "/insight", label: "Insight" },
    { href: "/nodes", label: "Nodes" },
    { href: "/alerts", label: "Alerts" },
    { href: "/integrate", label: "Integrate" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/70 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-extralight tracking-[0.25em] group-hover:text-primary transition-colors duration-500">
              AONA
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-extralight tracking-[0.12em] transition-colors duration-500 hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground/70",
                    link.highlight && "font-normal"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Wallet button desktop */}
            <div className="hidden md:block">
              <WalletButton />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground/70"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4 border-t border-border/20 pt-6">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-sm font-extralight tracking-[0.12em] transition-colors duration-500 hover:text-primary py-2",
                      pathname === link.href ? "text-primary" : "text-muted-foreground/70"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Wallet button mobile */}
            <div className="mt-4">
              <WalletButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
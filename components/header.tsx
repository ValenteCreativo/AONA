"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { WalletButton } from "@/components/solana/WalletButton"
import { ChevronDown } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  // Primary navigation (always visible)
  const primaryLinks = [
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/atlas", label: "Atlas" },
    { href: "/nodes", label: "Nodes" },
    { href: "/alerts", label: "Alerts" },
  ]

  // Secondary navigation (in "More" dropdown)
  const moreLinks = [
    { href: "/impact", label: "Impact" },
    { href: "/insight", label: "Insight" },
    { href: "/benchmarks", label: "Benchmarks" },
    { href: "/models", label: "Models" },
    { href: "/actions", label: "Actions" },
    { href: "/simulator", label: "Simulator" },
    { href: "/coverage", label: "Coverage" },
    { href: "/contribute", label: "Contribute" },
    { href: "/integrate", label: "Integrate" },
    { href: "/pitch", label: "Pitch" },
    { href: "/idl", label: "IDL" },
  ]

  // Check if any "More" link is active
  const isMoreActive = moreLinks.some(link => pathname === link.href)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/70 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/Aona-Favicon.svg"
              alt="AONA"
              width={28}
              height={28}
              className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="text-xl font-extralight tracking-[0.25em] group-hover:text-primary transition-colors duration-500">
              AONA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-extralight tracking-[0.12em] transition-colors duration-500 hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground/70"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* More Dropdown */}
            <li className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                onBlur={() => setTimeout(() => setMoreMenuOpen(false), 200)}
                className={cn(
                  "flex items-center gap-1 text-sm font-extralight tracking-[0.12em] transition-colors duration-500 hover:text-primary",
                  isMoreActive ? "text-primary" : "text-muted-foreground/70"
                )}
              >
                More
                <ChevronDown className={cn(
                  "h-3 w-3 transition-transform duration-300",
                  moreMenuOpen && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu */}
              {moreMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-background/95 backdrop-blur-sm border border-border/20 rounded-lg shadow-lg py-2">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreMenuOpen(false)}
                      className={cn(
                        "block px-4 py-2 text-sm font-extralight tracking-[0.12em] transition-colors duration-300 hover:bg-muted/50 hover:text-primary",
                        pathname === link.href ? "text-primary bg-muted/30" : "text-muted-foreground/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
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
              {/* Primary links */}
              {primaryLinks.map((link) => (
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

              {/* More section */}
              <li className="pt-4 border-t border-border/10">
                <p className="text-xs font-light tracking-widest text-muted-foreground/50 mb-3">MORE</p>
                <ul className="space-y-3 pl-2">
                  {moreLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block text-sm font-extralight tracking-[0.12em] transition-colors duration-500 hover:text-primary py-1",
                          pathname === link.href ? "text-primary" : "text-muted-foreground/70"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Wallet button mobile */}
            <div className="mt-6 pt-4 border-t border-border/10">
              <WalletButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

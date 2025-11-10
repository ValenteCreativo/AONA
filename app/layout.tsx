import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WalletProviders } from "@/app/providers/solana/WalletProviders";

export const metadata: Metadata = {
  title: "AONA - Autonomous Intelligence for Water Security",
  description: "Blockchain-powered early warning system for planetary hydrology. Real-time water quality monitoring with AI agents, Solana blockchain, and HTTP 402 protocol.",
  icons: {
    icon: "/Aona-Favicon.svg",
    shortcut: "/Aona-Favicon.svg",
    apple: "/Aona-Favicon.svg",
  },
  openGraph: {
    title: "AONA - Autonomous Intelligence for Water Security",
    description: "Decentralized water quality monitoring with AI agents on Solana blockchain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AONA - Autonomous Intelligence for Water Security",
    description: "Blockchain-powered early warning system for planetary hydrology",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <WalletProviders>
          <Header />
          {children}
          <Footer />
        </WalletProviders>
        <Analytics />
      </body>
    </html>
  );
}

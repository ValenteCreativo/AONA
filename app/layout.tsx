import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WalletProviders } from "@/app/providers/solana/WalletProviders";

export const metadata: Metadata = {
  title: "AONA - Autonomous Oracles for Networked Aquatic Systems",
  description: "Water knows. The network translates.",
  icons: {
    icon: "/Aona-Favicon-white.svg",
    apple: "/Aona-Favicon-white.svg",
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

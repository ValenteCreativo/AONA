"use client";

import { ReactNode, useMemo, useCallback } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletError } from "@solana/wallet-adapter-base";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

export function WalletProviders({ children }: { children: ReactNode }) {
  const endpoint = "https://api.devnet.solana.com";

  const wallets = useMemo(() => {
    // Solo agregar wallets si están disponibles
    const availableWallets = [];
    
    try {
      const phantom = new PhantomWalletAdapter();
      if (phantom.readyState !== "NotDetected") {
        availableWallets.push(phantom);
      }
    } catch (e) {
      console.log("Phantom no disponible");
    }

    try {
      const solflare = new SolflareWalletAdapter();
      if (solflare.readyState !== "NotDetected") {
        availableWallets.push(solflare);
      }
    } catch (e) {
      console.log("Solflare no disponible");
    }

    // Si no hay wallets disponibles, devolver una lista mínima
    if (availableWallets.length === 0) {
      return [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
      ];
    }

    return availableWallets;
  }, []);

  const onError = useCallback((error: WalletError) => {
    // Silenciar errores comunes y esperados
    if (
      error.name === "WalletNotReadyError" ||
      error.name === "WalletConnectionError" ||
      error.name === "WalletDisconnectedError" ||
      error.message.includes("User rejected")
    ) {
      return;
    }
    console.error("Wallet error:", error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false} onError={onError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

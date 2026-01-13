"use client";

import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mantleTestnet } from "./config/chains";
import type { ReactNode } from "react";

const { connectors } = getDefaultWallets({
  appName: "RWA.FUN",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "367e7033f1d106ae8bdbbd60e7c478a9",
});

const config = createConfig({
  chains: [mantleTestnet],
  connectors,
  transports: {
    [mantleTestnet.id]: http(process.env.NEXT_PUBLIC_MANTLE_RPC_URL || "https://rpc.sepolia.mantle.xyz"),
  },
});

export function RainbowKitWrapper({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#876dff",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
        initialChain={mantleTestnet}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}


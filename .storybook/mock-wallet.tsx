import type { Decorator } from "@storybook/react";
import React, { ReactNode, useEffect } from "react";
import {
  createConfig,
  http,
  WagmiProvider,
  useAccount,
  useConnect,
} from "wagmi";
import { gnosis, mainnet } from "wagmi/chains";
import { mock } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { erc20Abi } from "viem";

import { BreadUIKitProvider } from "../src/context/lib";
import { ConnectedUserProvider } from "../src/components/connected-user";
import type { App } from "../src/interface/app";

/**
 * Storybook-only decorator that mounts the full provider stack with a wagmi **mock
 * connector** that auto-connects to a fake account on Gnosis. This lets wallet-dependent
 * components (Navbar account widget, `useConnectedUser`, `useBreadBalance`) render their
 * **connected** state without a real wallet.
 *
 * Lives in `.storybook/` so it is never part of the published package (`tsup` only builds
 * `src/`, excluding stories). Pair it with `app` via story args.
 *
 * Caveats: on-chain reads (BREAD balance, ENS) hit public RPCs for the mock address, so they
 * resolve to empty/zero — the widget shows `0.00` and the truncated address, which is fine
 * for layout/visual review.
 */

// Fake but well-formed addresses. Lowercase so viem never trips on checksum.
export const MOCK_ADDRESS =
  "0x2a9e8fa175f45b235efddd97d2727741ef4eaa4f" as `0x${string}`;
const BREAD_ADDRESS =
  "0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3" as `0x${string}`;

const wagmiConfig = createConfig({
  chains: [gnosis, mainnet],
  connectors: [mock({ accounts: [MOCK_ADDRESS], features: { reconnect: true } })],
  transports: {
    [gnosis.id]: http(),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

// Placeholder Privy app id — AccountSection calls Privy hooks unconditionally, so the
// provider must be mounted. With general auth selected, Privy stays dormant.
const PRIVY_APP_ID = "clpispdty00ycl80fpueukbhl";

const tokenConfig = {
  BREAD: { address: BREAD_ADDRESS, abi: erc20Abi },
};

function AutoConnect({ children }: { children: ReactNode }) {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected && connectors[0]) {
      connect({ connector: connectors[0] });
    }
  }, [isConnected, connect, connectors]);

  return <>{children}</>;
}

export function MockWalletProviders({
  app = "fund",
  children,
}: {
  app?: App;
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider appId={PRIVY_APP_ID}>
          <RainbowKitProvider>
            <AutoConnect>
              <BreadUIKitProvider
                app={app}
                chainId={gnosis.id}
                authProvider="general"
                tokenConfig={tokenConfig}
              >
                <ConnectedUserProvider>{children}</ConnectedUserProvider>
              </BreadUIKitProvider>
            </AutoConnect>
          </RainbowKitProvider>
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

/**
 * Storybook decorator form. Reads `app` from the story args (defaults to `fund`).
 * Usage: `decorators: [withMockWallet]`.
 */
export const withMockWallet: Decorator = (Story, context) => (
  <MockWalletProviders app={context.args.app as App | undefined}>
    <Story />
  </MockWalletProviders>
);

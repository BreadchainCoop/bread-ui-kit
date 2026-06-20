import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { gnosis, mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { erc20Abi } from "viem";

import { LoginButton } from "./login-button";
import { BreadUIKitProvider } from "../../context/lib";
import type { App } from "../../interface/app";

/**
 * `LoginButton` reads `authProvider` from `BreadUIKitProvider` and renders either the Privy
 * or the RainbowKit ("general") sign-in flow. These stories mount the **general** flow
 * (wagmi + RainbowKit + react-query) so all four `status` states render without external
 * credentials. The Privy flow renders the same shapes but needs a real Privy app id.
 *
 * What each `status` renders:
 * - `NOT_CONNECTED` → the themed "Sign In" button
 * - `LOADING` → a skeleton placeholder (ButtonShell)
 * - `UNSUPPORTED_CHAIN` → a "Change network" button
 * - `CONNECTED` → nothing (returns `null`)
 */

// Minimal wagmi config — only an injected connector, so no WalletConnect project id is
// needed. RainbowKitProvider just needs to live inside WagmiProvider + QueryClientProvider.
const wagmiConfig = createConfig({
  chains: [gnosis, mainnet],
  connectors: [injected()],
  transports: {
    [gnosis.id]: http(),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

// The context only needs a token shape; the address/abi aren't read by LoginButton itself.
const tokenConfig = {
  BREAD: {
    address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3" as `0x${string}`,
    abi: erc20Abi,
  },
};

function Providers({ app, children }: { app: App; children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BreadUIKitProvider
            app={app}
            chainId={gnosis.id}
            authProvider="general"
            tokenConfig={tokenConfig}
          >
            {children}
          </BreadUIKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

type StoryArgs = React.ComponentProps<typeof LoginButton> & {
  showRightIcon?: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "Components/Auth/LoginButton",
  component: LoginButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    app: {
      control: { type: "radio" },
      options: ["fund", "stacks", "net"],
      description: "Brand theme: fund = orange, stacks = blue, net = jade.",
    },
    status: {
      control: { type: "radio" },
      options: ["NOT_CONNECTED", "LOADING", "UNSUPPORTED_CHAIN", "CONNECTED"],
      description: "Connection state that drives what the button renders.",
    },
    label: { control: { type: "text" } },
    showRightIcon: {
      control: { type: "boolean" },
      description: "Toggle a trailing icon (storybook helper, maps to `rightIcon`).",
    },
    rightIcon: { table: { disable: true } },
  },
  args: {
    app: "fund",
    status: "NOT_CONNECTED",
    label: "Sign In",
    showRightIcon: false,
  },
  render: ({ showRightIcon, app, ...args }) => (
    <Providers app={app}>
      <div className="w-80">
        <LoginButton
          {...args}
          app={app}
          rightIcon={showRightIcon ? <ArrowRight size={20} /> : undefined}
        />
      </div>
    </Providers>
  ),
};

export default meta;
type Story = StoryObj<StoryArgs>;

/** Toggle `app`, `status`, and `label` from the controls panel. */
export const Playground: Story = {};

export const NotConnected: Story = {
  args: { status: "NOT_CONNECTED" },
};

export const WithRightIcon: Story = {
  args: { status: "NOT_CONNECTED", showRightIcon: true },
};

export const Loading: Story = {
  args: { status: "LOADING" },
};

export const UnsupportedChain: Story = {
  args: { status: "UNSUPPORTED_CHAIN" },
};

export const Connected: Story = {
  args: { status: "CONNECTED" },
  parameters: {
    docs: {
      description: {
        story:
          "When the user is already connected the component renders nothing (`null`).",
      },
    },
  },
  render: (args) => (
    <Providers app={args.app}>
      <div className="w-80 text-center">
        <LoginButton {...args} />
        <p className="text-caption text-surface-grey-2">
          (renders nothing when CONNECTED)
        </p>
      </div>
    </Providers>
  ),
};

/** The "Sign In" state across all three app themes. */
export const AllApps: Story = {
  args: { status: "NOT_CONNECTED" },
  render: ({ showRightIcon, ...args }) => (
    <div className="flex flex-col gap-6">
      {(["fund", "stacks", "net"] as App[]).map((app) => (
        <div key={app}>
          <p className="text-caption mb-2">app=&quot;{app}&quot;</p>
          <Providers app={app}>
            <div className="w-80">
              <LoginButton
                {...args}
                app={app}
                rightIcon={showRightIcon ? <ArrowRight size={20} /> : undefined}
              />
            </div>
          </Providers>
        </div>
      ))}
    </div>
  ),
};

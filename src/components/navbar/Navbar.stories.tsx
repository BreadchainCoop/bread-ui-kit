import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { AnchorHTMLAttributes } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { gnosis, mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { erc20Abi } from "viem";

import { Navbar } from "./navbar";
import { BreadUIKitProvider } from "../../context/lib";
import { ConnectedUserProvider } from "../connected-user";
import { Body } from "../typography/Typography";
import type { App } from "../../interface/app";
import { MockWalletProviders } from "../../../.storybook/mock-wallet";

/**
 * `Navbar` is the full app header: logo, the "solidarity apps" dropdown, your page links
 * (`children`), a mobile slide-in menu, and the account section.
 *
 * It is the most provider-heavy component in the kit. `AccountSection` reads wallet state
 * from wagmi **and** Privy plus `ConnectedUserProvider`/`BreadUIKitProvider`, so these
 * stories mount the whole stack. With no wallet connected the account area shows the signed-in
 * **Sign In** button; the connected account widget (balance, ENS, network) needs a live
 * wallet and is out of scope for Storybook.
 *
 * Pass your framework's link component via `Link` (next/link, react-router `Link`, …). Here
 * we use a plain `<a>`.
 */

const wagmiConfig = createConfig({
  chains: [gnosis, mainnet],
  connectors: [injected()],
  transports: {
    [gnosis.id]: http(),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const tokenConfig = {
  BREAD: {
    address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3" as `0x${string}`,
    abi: erc20Abi,
  },
};

// Placeholder Privy app id — AccountSection calls Privy hooks unconditionally, so the
// provider must be mounted. With general auth selected, Privy stays dormant.
const PRIVY_APP_ID = "clpispdty00ycl80fpueukbhl";

function Providers({ app, children }: { app: App; children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider appId={PRIVY_APP_ID}>
          <RainbowKitProvider>
            <BreadUIKitProvider
              app={app}
              chainId={gnosis.id}
              authProvider="general"
              tokenConfig={tokenConfig}
            >
              <ConnectedUserProvider>{children}</ConnectedUserProvider>
            </BreadUIKitProvider>
          </RainbowKitProvider>
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// A minimal framework-agnostic Link (stand-in for next/link or react-router Link).
const Link = ({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

const NavLinks = () => (
  <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 md:mx-6">
    {["Dashboard", "Vote", "About"].map((label) => (
      <li key={label}>
        <Link href="#">
          <Body>{label}</Body>
        </Link>
      </li>
    ))}
  </ul>
);

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
  argTypes: {
    app: {
      control: { type: "radio" },
      options: ["fund", "stacks", "net"],
      description: "Brand theme: drives logo color, title, and accent.",
    },
    children: { table: { disable: true } },
    Link: { table: { disable: true } },
    widgetItems: { table: { disable: true } },
    actionItems: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { app: "fund" },
  render: ({ app }) => (
    <Providers app={app}>
      <div className="px-6 bg-paper-main min-h-[60vh] text-black">
        <Navbar app={app} Link={Link}>
          <NavLinks />
        </Navbar>
      </div>
    </Providers>
  ),
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/** Switch `app` from the controls panel. Resize the canvas below `md` to see the mobile menu. */
export const Playground: Story = {};

export const SolidarityFund: Story = { args: { app: "fund" } };
export const Stacks: Story = { args: { app: "stacks" } };
export const SafetyNet: Story = { args: { app: "net" } };

/**
 * Connected state using the mock-wallet decorator: the account section shows the account
 * menu instead of the Sign In button. Open it to see the account widget (address, balance,
 * network, sign out). On-chain reads use a fake address, so the balance shows `0.00`.
 */
export const Connected: Story = {
  render: ({ app }) => (
    <MockWalletProviders app={app}>
      <div className="px-6 bg-paper-main min-h-[60vh] text-black">
        <Navbar app={app} Link={Link}>
          <NavLinks />
        </Navbar>
      </div>
    </MockWalletProviders>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { AnchorHTMLAttributes, ReactNode } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { gnosis, mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { erc20Abi } from "viem";
import { HandCoinsIcon } from "@phosphor-icons/react";

import { Navbar } from "./navbar";
import { BreadUIKitProvider } from "../../context/lib";
import { ConnectedUserProvider } from "../connected-user";
import { ConnectedUserContext } from "../connected-user/context";
import { Body } from "../typography/Typography";
import Button from "../buttons/button";
import NavAccountDetails from "./account-widget";
import NavAccountWidgetItem from "./account-widget-item";
import AccountCardMobile from "./account-card-mobile";
import { NavSolidarityApps } from "./solidarity-apps";
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

const DEMO_ADDRESS = "0x66376C8DBfb95533FBd7C34c8C8b2ecCc3d5C6637" as const;

/**
 * Providers for the mobile account widget stories below: shares this file's wagmi /
 * query-client / token config, but forces a CONNECTED user directly via
 * `ConnectedUserContext` (skipping wallet connection) so the connected states render.
 * Privy is stubbed via a Vite alias (see .storybook/main.ts), so no `<PrivyProvider>`
 * is needed here.
 */
const MobileProviders = ({ children }: { children: ReactNode }) => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <BreadUIKitProvider
        chainId={gnosis.id}
        tokenConfig={tokenConfig}
        app="stacks"
        authProvider="general"
      >
        <ConnectedUserContext.Provider
          value={{
            user: {
              status: "CONNECTED",
              address: DEMO_ADDRESS,
              chain: gnosis,
            },
            isSafe: false,
          }}
        >
          <div className="w-[375px] bg-paper-main p-6">{children}</div>
        </ConnectedUserContext.Provider>
      </BreadUIKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

/**
 * The full account card shown inline in the mobile menu when connected — address (copy +
 * explorer), balance, the app-injected Claim widget and Deposit / Withdraw actions, and
 * sign out.
 */
export const MobileAccountCard: Story = {
  render: () => (
    <MobileProviders>
      <NavAccountDetails
        className="bg-paper-main border border-surface-ink"
        userAddress={DEMO_ADDRESS}
        ensNameResult={{
          data: undefined,
          isLoading: false,
          isError: false,
        }}
        app="stacks"
        widgetItems={
          <NavAccountWidgetItem
            I={HandCoinsIcon}
            appIconColor="text-primary-blue"
            label="Claimable"
          >
            <Body className="font-bold text-system-green">1,000.00</Body>
            <Button app="stacks" variant="secondary" size="sm">
              Claim
            </Button>
          </NavAccountWidgetItem>
        }
        actionItems={
          <div className="flex gap-2">
            <Button app="stacks" size="sm" className="flex-1">
              Deposit
            </Button>
            <Button app="stacks" variant="secondary" size="sm" className="flex-1">
              Withdraw
            </Button>
          </div>
        }
      />
    </MobileProviders>
  ),
};

/**
 * The connected account card at the top of the mobile menu, matching Bread DS V1.1
 * (node 727-3622): address row (copy + explorer), balance, Deposit / Withdraw, and the
 * claim row. The app passes only handlers and the claimable amount. Sign out lives at the
 * bottom of the menu, not in this card.
 */
export const MobileAccountCardExact: Story = {
  render: () => (
    <MobileProviders>
      <AccountCardMobile
        userAddress={DEMO_ADDRESS}
        onDeposit={() => {}}
        onWithdraw={() => {}}
        claimable={{ amount: "1,000.00", onClaim: () => {} }}
      />
    </MobileProviders>
  ),
};

/**
 * The "Solidarity apps" section as it appears in the mobile menu: a dropdown collapsed by
 * default that expands vertically on tap. No wallet context required.
 */
export const SolidarityAppsMobile: Story = {
  render: () => (
    <div className="w-[375px] bg-paper-main p-6">
      <NavSolidarityApps collapsible showSelected rearranged current="stacks" />
    </div>
  ),
};

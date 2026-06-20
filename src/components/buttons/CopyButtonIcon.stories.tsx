import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { erc20Abi } from "viem";

import CopyButtonIcon from "./copy-icon";
import { BreadUIKitProvider } from "../../context/lib";
import type { App } from "../../interface/app";

/**
 * `CopyButtonIcon` copies `textToCopy` to the clipboard and swaps its copy icon for a green
 * check for ~0.5s on success. Its color comes from the active `app` in `BreadUIKitProvider`,
 * so these stories wrap it in that provider. (No wagmi/Privy needed — only the app theme.)
 *
 * Try it: click the icon to copy, then watch it flip to the check state.
 */

const APPS: App[] = ["fund", "stacks", "net"];

// CopyButtonIcon only reads `app`; chainId/tokenConfig/authProvider are required by the
// provider's type but unused here.
const tokenConfig = {
  BREAD: {
    address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3" as `0x${string}`,
    abi: erc20Abi,
  },
};

function Providers({ app = "fund", children }: { app?: App; children: React.ReactNode }) {
  return (
    <BreadUIKitProvider
      app={app}
      chainId={100}
      authProvider="general"
      tokenConfig={tokenConfig}
    >
      {children}
    </BreadUIKitProvider>
  );
}

type CopyStoryArgs = {
  app?: App;
  textToCopy: string;
  checkedIconSize?: number;
};

const meta: Meta<CopyStoryArgs> = {
  title: "Components/Buttons/CopyButtonIcon",
  component: CopyButtonIcon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    app: {
      control: { type: "radio" },
      options: APPS,
      description: "Brand theme that tints the icon (fund/stacks/net).",
    },
    textToCopy: { control: { type: "text" } },
    checkedIconSize: { control: { type: "number" } },
  },
  args: {
    app: "fund",
    textToCopy: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
    checkedIconSize: 24,
  },
  render: ({ app, ...args }) => (
    <Providers app={app}>
      <CopyButtonIcon {...args} />
    </Providers>
  ),
};

export default meta;
type Story = StoryObj<CopyStoryArgs>;

/** Click to copy; the icon turns into a green check briefly. */
export const Playground: Story = {};

/** Paired with the value it copies, the way it is usually used. */
export const WithLabel: Story = {
  render: ({ app, textToCopy, ...args }) => (
    <Providers app={app}>
      <div className="flex items-center gap-2">
        <span className="text-body font-breadBody">{textToCopy}</span>
        <CopyButtonIcon {...args} textToCopy={textToCopy} />
      </div>
    </Providers>
  ),
};

/** The icon color across all three app themes. */
export const AllApps: Story = {
  render: ({ textToCopy, ...args }) => (
    <div className="flex items-center gap-8">
      {APPS.map((app) => (
        <div key={app} className="flex flex-col items-center gap-2">
          <span className="text-caption">{app}</span>
          <Providers app={app}>
            <CopyButtonIcon {...args} textToCopy={textToCopy} />
          </Providers>
        </div>
      ))}
    </div>
  ),
};

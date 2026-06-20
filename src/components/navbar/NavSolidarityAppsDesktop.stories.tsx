import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { NavSolidarityAppsDesktop } from "./solidarity-apps";
import type { App } from "../../interface/app";

/**
 * `NavSolidarityAppsDesktop` is the desktop dropdown trigger for the solidarity apps menu.
 * It shows a `label` with a caret and reveals `NavSolidarityApps` on hover/click.
 *
 * Note: it is `hidden` below the `md` breakpoint, so keep the canvas wide. Click the label
 * to open the menu.
 */

const APPS: App[] = ["fund", "stacks", "net"];

type DesktopArgs = {
  app: App;
  label: string;
};

const meta: Meta<DesktopArgs> = {
  title: "Components/Navbar/NavSolidarityAppsDesktop",
  component: NavSolidarityAppsDesktop,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    app: { control: { type: "radio" }, options: APPS },
    label: { control: { type: "text" } },
  },
  args: { app: "stacks", label: "Stacks" },
  decorators: [
    (Story) => (
      <div className="min-w-[600px] bg-paper-main p-6 text-black">
        <Story />
      </div>
    ),
  ],
  render: (args) => <NavSolidarityAppsDesktop {...args} />,
};

export default meta;
type Story = StoryObj<DesktopArgs>;

/** Click the label to open the dropdown. */
export const Playground: Story = {};

export const SolidarityFund: Story = { args: { app: "fund", label: "Solidarity fund" } };
export const Stacks: Story = { args: { app: "stacks", label: "Stacks" } };
export const SafetyNet: Story = { args: { app: "net", label: "Safety Net" } };

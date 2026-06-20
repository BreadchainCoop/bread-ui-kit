import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { NavSolidarityApps } from "./solidarity-apps";
import type { App } from "../../interface/app";

/**
 * `NavSolidarityApps` is the list of Bread Coop "solidarity apps" (Solidarity Fund, Stacks,
 * Safety Net) used inside the navbar's mobile menu and the desktop dropdown. It is purely
 * presentational — no providers needed.
 *
 * - `current` marks the active app (defaults to `stacks`); the active row isn't a link.
 * - `showTitle` renders a "Solidarity apps" heading.
 * - `showSelected` adds a "Selected" tag on the current app.
 * - `rearranged` floats the current app to the top.
 */

const APPS: App[] = ["fund", "stacks", "net"];

type SolidarityAppsArgs = {
  current?: App;
  showTitle?: boolean;
  showSelected?: boolean;
  rearranged?: boolean;
  className?: string;
};

const meta: Meta<SolidarityAppsArgs> = {
  title: "Components/Navbar/NavSolidarityApps",
  component: NavSolidarityApps,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    current: { control: { type: "radio" }, options: APPS },
    showTitle: { control: { type: "boolean" } },
    showSelected: { control: { type: "boolean" } },
    rearranged: { control: { type: "boolean" } },
  },
  args: {
    current: "stacks",
    showTitle: false,
    showSelected: false,
    rearranged: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-paper-main border border-paper-2 p-6 text-black">
        <Story />
      </div>
    ),
  ],
  render: (args) => <NavSolidarityApps {...args} />,
};

export default meta;
type Story = StoryObj<SolidarityAppsArgs>;

/** Toggle every prop from the controls panel. */
export const Playground: Story = {};

export const WithTitle: Story = {
  args: { showTitle: true },
};

export const WithSelected: Story = {
  args: { current: "fund", showTitle: true, showSelected: true },
};

/** Current app floated to the top of the list. */
export const Rearranged: Story = {
  args: { current: "net", showTitle: true, showSelected: true, rearranged: true },
};

/** The list as it looks for each active app. */
export const AllCurrents: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="flex flex-wrap gap-6">
      {APPS.map((current) => (
        <div
          key={current}
          className="w-72 bg-paper-main border border-paper-2 p-6 text-black"
        >
          <NavSolidarityApps current={current} showTitle showSelected />
        </div>
      ))}
    </div>
  ),
};

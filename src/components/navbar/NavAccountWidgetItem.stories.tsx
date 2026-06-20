import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  WalletIcon,
  UserCircleIcon,
  GraphIcon,
} from "@phosphor-icons/react";

import NavAccountWidgetItem from "./account-widget-item";
import { Body } from "../typography/Typography";

/**
 * `NavAccountWidgetItem` is a single labeled row used inside the navbar account widget: a
 * leading icon (`I`), a `label`, and right-aligned `children` (value, copy button, etc.).
 * Presentational — no providers needed.
 *
 * - `I` is a Phosphor icon component (e.g. `WalletIcon`).
 * - `appIconColor` is a Tailwind text-color class applied to the icon.
 */

type WidgetItemArgs = React.ComponentProps<typeof NavAccountWidgetItem>;

const meta: Meta<WidgetItemArgs> = {
  title: "Components/Navbar/NavAccountWidgetItem",
  component: NavAccountWidgetItem,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    appIconColor: {
      control: { type: "text" },
      description: "Tailwind text-color class for the icon, e.g. `text-primary-blue`.",
    },
    label: { control: { type: "text" } },
    I: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    appIconColor: "text-primary-blue",
    label: "Bread Balance",
  },
  decorators: [
    (Story) => (
      <ul className="bg-paper-2 p-5 w-full max-w-md text-black">
        <Story />
      </ul>
    ),
  ],
  render: ({ appIconColor, label }) => (
    <NavAccountWidgetItem I={WalletIcon} appIconColor={appIconColor} label={label}>
      <Body bold>1,234.56</Body>
    </NavAccountWidgetItem>
  ),
};

export default meta;
type Story = StoryObj<WidgetItemArgs>;

/** Toggle the label and icon color from the controls panel. */
export const Playground: Story = {};

/** Several rows together, the way the account widget stacks them. */
export const MultipleItems: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <ul className="bg-paper-2 p-5 w-full max-w-md flex flex-col gap-4 text-black">
      <NavAccountWidgetItem
        I={UserCircleIcon}
        appIconColor="text-primary-blue"
        label="0x1234…5678"
      >
        <Body>copy</Body>
      </NavAccountWidgetItem>
      <NavAccountWidgetItem
        I={WalletIcon}
        appIconColor="text-primary-blue"
        label="Bread Balance"
      >
        <Body bold>1,234.56</Body>
      </NavAccountWidgetItem>
      <NavAccountWidgetItem
        I={GraphIcon}
        appIconColor="text-primary-blue"
        label="Network"
      >
        <Body className="font-bold">Gnosis</Body>
      </NavAccountWidgetItem>
    </ul>
  ),
};

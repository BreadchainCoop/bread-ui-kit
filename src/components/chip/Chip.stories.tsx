import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Star } from "@phosphor-icons/react";

import Chip from "./chip";
import { Body } from "../typography/Typography";

/**
 * `Chip` is a small bordered pill on a paper background. `size` controls padding
 * (`small` | `regular`) and the boolean `icon` switches to tighter, square padding for
 * icon-only content. It renders whatever you pass as `children`.
 */

type ChipStoryArgs = {
  size?: "small" | "regular";
  icon?: boolean;
  children: React.ReactNode;
  className?: string;
};

const meta: Meta<ChipStoryArgs> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "regular"],
    },
    icon: {
      control: { type: "boolean" },
      description: "Use square padding for icon-only chips.",
    },
    children: { control: { type: "text" } },
  },
  args: {
    size: "small",
    icon: false,
    children: "Chip",
  },
  render: (args) => <Chip {...args} />,
};

export default meta;
type Story = StoryObj<ChipStoryArgs>;

/** Toggle `size`, `icon`, and the content from the controls panel. */
export const Playground: Story = {};

export const Small: Story = {
  args: { size: "small", children: "Small chip" },
};

export const Regular: Story = {
  args: { size: "regular", children: "Regular chip" },
};

/** Text with a leading icon. */
export const WithLeadingIcon: Story = {
  render: (args) => (
    <Chip {...args}>
      <Star size={16} weight="fill" />
      <Body>Featured</Body>
    </Chip>
  ),
};

/** Icon-only chip using `icon` for square padding. */
export const IconOnly: Story = {
  args: { icon: true },
  render: (args) => (
    <Chip {...args}>
      <Star size={20} />
    </Chip>
  ),
};

/** Both sizes side by side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip size="small">Small</Chip>
      <Chip size="regular">Regular</Chip>
    </div>
  ),
};

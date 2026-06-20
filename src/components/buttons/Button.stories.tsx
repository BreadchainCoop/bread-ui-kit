import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ArrowUpRight, SignOut } from "@phosphor-icons/react";

import Button from "./button";
import type { App } from "../../interface/app";

/**
 * `Button` is the primary, app-themed button. It is polymorphic (`as`), brand-aware (`app`),
 * and supports left/right icons plus a loading state. It needs no providers — the theme is
 * driven entirely by the `app` prop.
 *
 * - `app`: `fund` = orange, `stacks` = blue, `net` = jade.
 * - `variant`: `primary` (solid brand) / `secondary` (light tint) plus the fixed
 *   `destructive`, `positive`, `light`, and `burn` styles.
 */

const VARIANTS = [
  "primary",
  "secondary",
  "destructive",
  "positive",
  "light",
  "burn",
] as const;

const APPS: App[] = ["fund", "stacks", "net"];

type ButtonStoryArgs = {
  app?: App;
  variant?: (typeof VARIANTS)[number];
  size?: "sm" | "default" | "icon";
  children?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  showChildrenWhenLoading?: boolean;
  withBorder?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
};

const renderButton = ({
  showLeftIcon,
  showRightIcon,
  children,
  ...args
}: ButtonStoryArgs) => (
  <Button
    {...args}
    leftIcon={showLeftIcon ? <ArrowUpRight size={20} /> : undefined}
    rightIcon={showRightIcon ? <SignOut size={20} /> : undefined}
  >
    {children}
  </Button>
);

const meta: Meta<ButtonStoryArgs> = {
  title: "Components/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    app: {
      control: { type: "radio" },
      options: APPS,
      description: "Brand theme: fund = orange, stacks = blue, net = jade.",
    },
    variant: {
      control: { type: "radio" },
      options: VARIANTS,
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "default", "icon"],
    },
    children: { control: { type: "text" } },
    showLeftIcon: { control: { type: "boolean" }, description: "Maps to `leftIcon`." },
    showRightIcon: { control: { type: "boolean" }, description: "Maps to `rightIcon`." },
  },
  args: {
    app: "fund",
    variant: "primary",
    size: "default",
    children: "Click me",
    disabled: false,
    isLoading: false,
    showChildrenWhenLoading: false,
    withBorder: false,
    showLeftIcon: false,
    showRightIcon: false,
  },
  render: renderButton,
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

/** Toggle every prop from the controls panel. */
export const Playground: Story = {};

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Positive: Story = {
  args: { variant: "positive", children: "Confirm" },
};

export const Light: Story = {
  args: { variant: "light", children: "Cancel" },
};

export const WithIcons: Story = {
  args: {
    children: "External link",
    showLeftIcon: true,
    showRightIcon: true,
  },
};

export const Loading: Story = {
  args: { isLoading: true, children: "Saving…" },
};

export const LoadingWithChildren: Story = {
  args: { isLoading: true, showChildrenWhenLoading: true, children: "Saving…" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const WithBorder: Story = {
  args: { withBorder: true, children: "Bordered" },
};

/** Render as an anchor via the polymorphic `as` prop. */
export const AsLink: Story = {
  render: (args) => (
    <Button
      {...args}
      as="a"
      href="https://breadchain.xyz"
      target="_blank"
      rel="noreferrer"
      rightIcon={<ArrowUpRight size={20} />}
    >
      Visit site
    </Button>
  ),
};

/** Icon-only button using `size="icon"`. */
export const IconOnly: Story = {
  args: { size: "icon", "aria-label": "Sign out" } as ButtonStoryArgs,
  render: ({ ...args }) => (
    <Button {...args} aria-label="Sign out">
      <SignOut size={20} />
    </Button>
  ),
};

/** All sizes side by side. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="icon" aria-label="Sign out">
        <SignOut size={20} />
      </Button>
    </div>
  ),
};

/** Every variant for the selected `app`. */
export const AllVariants: Story = {
  render: ({ app }) => (
    <div className="flex flex-wrap gap-4">
      {VARIANTS.map((variant) => (
        <Button key={variant} app={app} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

/** Primary + secondary across all three app themes. */
export const AllApps: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {APPS.map((app) => (
        <div key={app} className="flex items-center gap-4">
          <span className="text-caption w-16">{app}</span>
          <Button app={app} variant="primary">
            Primary
          </Button>
          <Button app={app} variant="secondary">
            Secondary
          </Button>
        </div>
      ))}
    </div>
  ),
};

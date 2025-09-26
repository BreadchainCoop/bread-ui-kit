import type { Meta, StoryObj } from "@storybook/react";
import LiftedButton from "./components/LiftedButton/LiftedButton";
import { Heading1, Heading2, Body } from "./fonts";

const meta: Meta = {
  title: "Design System",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorPalette: Story = {
  render: () => (
    <div className="space-y-8">
      <Heading1>Bread Coop Design System</Heading1>

      <div>
        <Heading2>Color Palette</Heading2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <div className="bg-primary-orange h-16 rounded-md"></div>
            <p className="text-sm font-medium">Primary Orange</p>
            <p className="text-xs text-gray-600">#ea6023</p>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-jade h-16 rounded-md"></div>
            <p className="text-sm font-medium">Primary Jade</p>
            <p className="text-xs text-gray-600">#286b63</p>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-blue h-16 rounded-md"></div>
            <p className="text-sm font-medium">Primary Blue</p>
            <p className="text-xs text-gray-600">#1c5bb9</p>
          </div>
          <div className="space-y-2">
            <div className="bg-paper-main h-16 rounded-md border"></div>
            <p className="text-sm font-medium">Paper Main</p>
            <p className="text-xs text-gray-600">#f6f3eb</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ComponentShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <Heading1>Component Showcase</Heading1>

      <div>
        <Heading2>Buttons</Heading2>
        <div className="flex flex-wrap gap-4 mt-4">
          <LiftedButton preset="primary">Primary Button</LiftedButton>
          <LiftedButton preset="secondary">Secondary Button</LiftedButton>
          <LiftedButton preset="destructive">Destructive Button</LiftedButton>
          <LiftedButton preset="positive">Positive Button</LiftedButton>
          <LiftedButton preset="stroke">Stroke Button</LiftedButton>
          <LiftedButton disabled>Disabled</LiftedButton>
        </div>
      </div>

      <div>
        <Heading2>Typography Scale</Heading2>
        <div className="space-y-4 mt-4">
          <Heading1>Heading 1 - Main Title</Heading1>
          <Heading2>Heading 2 - Section Title</Heading2>
          <Body>
            This is body text that demonstrates the Bread Body font. It's
            designed for optimal readability and provides excellent legibility
            across different screen sizes and devices.
          </Body>
        </div>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import LiftedButton from "./components/LiftedButton/LiftedButton";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Body,
  Caption,
} from "./components/typography/Typography";

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

      <hr />
      <div>
        <Heading2>Buttons</Heading2>
        <div className="flex flex-wrap gap-4 mt-4">
          <LiftedButton preset="primary">Primary Button</LiftedButton>
          <LiftedButton preset="secondary">Secondary Button</LiftedButton>
          <LiftedButton preset="stroke">Stroke Button</LiftedButton>
          <LiftedButton disabled>Disabled</LiftedButton>
        </div>
      </div>
      <hr />
      <div>
        <Heading2>Typography</Heading2>
        <div className="space-y-6 mt-10">
          <div>
            <Heading1>Heading 1 - Main Title</Heading1>
            <p className="text-sm text-gray-600 mt-2">
              Uses Bread Display font, 900 weight
            </p>
          </div>

          <div>
            <Heading2>Heading 2 - Section Title</Heading2>
            <p className="text-sm text-gray-600 mt-2">
              Uses Bread Display font, 900 weight
            </p>
          </div>

          <div>
            <Heading3>Heading 3 - Subsection Title</Heading3>
            <p className="text-sm text-gray-600 mt-2">
              Uses Bread Display font, 900 weight
            </p>
          </div>

          <div>
            <Heading4>Heading 4 - Minor Heading</Heading4>
            <p className="text-sm text-gray-600 mt-2">
              Uses Bread Body font, 700 weight
            </p>
          </div>

          <div>
            <Heading5>Heading 5 - Small Heading</Heading5>
            <p className="text-sm text-gray-600 mt-2">
              Uses Bread Body font, 400 weight
            </p>
          </div>

          <div>
            <Body>
              This is body text using the Bread Body font. It's designed for
              optimal readability in longer content blocks. The font provides
              excellent legibility across different screen sizes and devices.
            </Body>
            <p className="text-sm text-gray-600 mt-2">
              Uses Bread Body font, 400 weight
            </p>
          </div>

          <div>
            <Caption>
              This is caption text for smaller details and metadata.
            </Caption>
            <p className="text-sm text-gray-600 mt-2">
              Uses Bread Body font, 0.7rem size
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FontShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <Heading1>Font Showcase</Heading1>

      <div>
        <Heading2>Bread Display Font</Heading2>
        <div className="space-y-2 mt-4">
          <div className="font-breadDisplay font-[900] text-2xl">
            Bread Display 900 - Black
          </div>
          <div className="font-breadDisplay font-[700] text-2xl">
            Bread Display 700 - Bold
          </div>
          <div className="font-breadDisplay font-[400] text-2xl">
            Bread Display 400 - Regular
          </div>
        </div>
      </div>

      <div>
        <Heading2>Bread Body Font</Heading2>
        <div className="space-y-2 mt-4">
          <div className="font-breadBody font-[700] text-lg">
            Bread Body 700 - Bold
          </div>
          <div className="font-breadBody font-[400] text-lg">
            Bread Body 400 - Regular
          </div>
        </div>
      </div>
    </div>
  ),
};

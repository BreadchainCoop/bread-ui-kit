import type { Meta, StoryObj } from "@storybook/react";
import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Body,
  Caption,
} from "./Typography";

const meta: Meta = {
  title: "Components/Typography",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Individual component stories
export const Heading1Story: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading1>This is a Heading 1</Heading1>
      <Heading1 className="text-blue-600">Heading 1 with custom color</Heading1>
      <p className="text-sm text-gray-600">
        Uses Bread Display font, 900 weight, renders as &lt;h1&gt; tag
      </p>
    </div>
  ),
};

export const Heading2Story: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading2>This is a Heading 2</Heading2>
      <Heading2 className="text-green-600">
        Heading 2 with custom color
      </Heading2>
      <p className="text-sm text-gray-600">
        Uses Bread Display font, 900 weight, renders as &lt;h2&gt; tag
      </p>
    </div>
  ),
};

export const Heading3Story: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading3>This is a Heading 3</Heading3>
      <Heading3 className="text-purple-600">
        Heading 3 with custom color
      </Heading3>
      <p className="text-sm text-gray-600">
        Uses Bread Display font, 900 weight, renders as &lt;h3&gt; tag
      </p>
    </div>
  ),
};

export const Heading4Story: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading4>This is a Heading 4</Heading4>
      <Heading4 className="text-orange-600">
        Heading 4 with custom color
      </Heading4>
      <p className="text-sm text-gray-600">
        Uses Bread Body font, 700 weight, renders as &lt;h4&gt; tag
      </p>
    </div>
  ),
};

export const Heading5Story: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading5>This is a Heading 5</Heading5>
      <Heading5 className="text-red-600">Heading 5 with custom color</Heading5>
      <p className="text-sm text-gray-600">
        Uses Bread Body font, 400 weight, renders as &lt;h5&gt; tag
      </p>
    </div>
  ),
};

export const BodyStory: Story = {
  render: () => (
    <div className="space-y-4">
      <Body>This is regular body text</Body>
      <Body bold>This is bold body text</Body>
      <Body className="text-blue-600">Body text with custom color</Body>
      <Body bold className="text-green-600">
        Bold body text with custom color
      </Body>
      <p className="text-sm text-gray-600">
        Uses Bread Body font, 400 weight (regular) or 700 weight (bold), renders
        as &lt;p&gt; tag
      </p>
    </div>
  ),
};

export const CaptionStory: Story = {
  render: () => (
    <div className="space-y-4">
      <Caption>This is caption text</Caption>
      <Caption className="text-gray-500">Caption with custom color</Caption>
      <p className="text-sm text-gray-600">
        Uses Bread Body font, 0.7rem size, renders as &lt;p&gt; tag
      </p>
    </div>
  ),
};

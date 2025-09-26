import type { Meta, StoryObj } from "@storybook/react";
import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Body,
  Caption,
} from "./fonts";

const meta: Meta = {
  title: "Typography",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypography: Story = {
  render: () => (
    <div className="space-y-6">
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
        <Body>
          This is body text using the Bread Body font. It's designed for optimal
          readability in longer content blocks. The font provides excellent
          legibility across different screen sizes and devices.
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
  ),
};

export const TypographyComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Typography H1</Typography>
      <Typography variant="h2">Typography H2</Typography>
      <Typography variant="h3">Typography H3</Typography>
      <Typography variant="h4">Typography H4</Typography>
      <Typography variant="h5">Typography H5</Typography>
      <Typography variant="body">Typography Body Text</Typography>
      <Typography variant="caption">Typography Caption</Typography>
    </div>
  ),
};

export const FontShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bread Display Font</h3>
        <div className="space-y-2">
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
        <h3 className="text-lg font-semibold mb-4">Bread Body Font</h3>
        <div className="space-y-2">
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

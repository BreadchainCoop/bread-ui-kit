import type { Meta, StoryObj } from "@storybook/react-vite";

import { FormattedDecimalNumber } from "./formatted-dec-num";

/**
 * `FormattedDecimalNumber` renders a number formatted to 2 decimals (with thousands
 * grouping) and styles the decimal part smaller than the integer part. It optionally shows
 * the BREAD logo and a `unit` prefix. Purely presentational — no providers needed.
 *
 * - `value` accepts a `number` or numeric `string`.
 * - `unit` is prefixed to the integer part (e.g. `$`).
 * - `withBreadIcon` shows the BREAD logo (size via `breadSize`).
 * - `integralPartClassName` / `decimalPartClassName` override the two spans.
 */

const meta: Meta<typeof FormattedDecimalNumber> = {
  title: "Components/Typography/FormattedDecimalNumber",
  component: FormattedDecimalNumber,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "text" } },
    unit: { control: { type: "text" } },
    withBreadIcon: { control: { type: "boolean" } },
    breadSize: { control: { type: "number" } },
    className: { table: { disable: true } },
    integralPartClassName: { table: { disable: true } },
    decimalPartClassName: { table: { disable: true } },
    breadIconClassName: { table: { disable: true } },
  },
  args: {
    value: 1234.5,
    unit: "",
    withBreadIcon: false,
    breadSize: 24,
  },
  decorators: [
    (Story) => (
      <div className="text-black">
        <Story />
      </div>
    ),
  ],
  render: (args) => <FormattedDecimalNumber {...args} />,
};

export default meta;
type Story = StoryObj<typeof FormattedDecimalNumber>;

/** Toggle `value`, `unit`, and the BREAD icon from the controls panel. */
export const Playground: Story = {};

export const Default: Story = {
  args: { value: 1234.5 },
};

/** With the BREAD logo. */
export const WithBreadIcon: Story = {
  args: { value: 420.69, withBreadIcon: true },
};

/** A currency unit prefixed to the integer part. */
export const WithUnit: Story = {
  args: { value: 9999.99, unit: "$" },
};

/** Thousands grouping on a large value. */
export const LargeValue: Story = {
  args: { value: 1234567.89 },
};

/** A numeric string is parsed and formatted the same way. */
export const StringValue: Story = {
  args: { value: "0.0734" },
};

/** Override the two spans — here the decimal part is de-emphasized. */
export const CustomStyling: Story = {
  render: () => (
    <FormattedDecimalNumber
      value={1234.5}
      integralPartClassName="text-2xl text-primary-jade"
      decimalPartClassName="text-base text-surface-grey-2"
    />
  ),
};

/** A few representative values together. */
export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-black">
      <FormattedDecimalNumber value={0.5} withBreadIcon />
      <FormattedDecimalNumber value={1234.5} withBreadIcon />
      <FormattedDecimalNumber value={1234567.89} unit="$" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { LoadingIcon } from "./loading-icon";
import type { App } from "../../interface/app";

/**
 * `LoadingIcon` is an animated circular spinner tinted by the active `app`
 * (`fund` = orange, `stacks` = blue, `net` = jade). It defaults to a 2rem (`w-8 h-8`) box;
 * pass sizing utilities via `className` to resize it.
 */

const APPS: App[] = ["fund", "stacks", "net"];

type LoadingIconArgs = {
	app: App;
	className?: string;
};

const meta: Meta<LoadingIconArgs> = {
	title: "Components/LoadingIcon",
	component: LoadingIcon,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		app: {
			control: { type: "radio" },
			options: APPS,
		},
		className: {
			control: { type: "text" },
			description: "Sizing/utility classes, e.g. `w-16 h-16`.",
		},
	},
	args: {
		app: "fund",
	},
	render: (args) => <LoadingIcon {...args} />,
};

export default meta;
type Story = StoryObj<LoadingIconArgs>;

/** Switch `app` and resize via `className`. */
export const Playground: Story = {};

export const Fund: Story = { args: { app: "fund" } };
export const Stacks: Story = { args: { app: "stacks" } };
export const Net: Story = { args: { app: "net" } };

/** All three app themes. */
export const AllApps: Story = {
	render: () => (
		<div className="flex items-center gap-8">
			{APPS.map((app) => (
				<div key={app} className="flex flex-col items-center gap-2">
					<span className="text-caption">{app}</span>
					<LoadingIcon app={app} />
				</div>
			))}
		</div>
	),
};

/** Resized via `className`. */
export const Sizes: Story = {
	render: ({ app }) => (
		<div className="flex items-end gap-6">
			<LoadingIcon app={app} className="w-6 h-6" />
			<LoadingIcon app={app} className="w-10 h-10" />
			<LoadingIcon app={app} className="w-16 h-16" />
		</div>
	),
};

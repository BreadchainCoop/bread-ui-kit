# Bread UI Kit

A React TypeScript component library for implementing Bread Coop branding in JS/TS projects. Choose your integration approach based on your needs.

## Installation

```bash
npm install bread-ui-kit
```

## Usage Options

### Option 1: Drop-in CSS Theme (Simplest)

Perfect for projects that want to use pre-built components without configuration. **Fonts are included automatically!**

```tsx
import React from "react";
import { LiftedButton, Heading1, Body } from "bread-ui-kit";
// Import the complete theme CSS
import "bread-ui-kit/theme";

function App() {
  return (
    <div>
      <Heading1>Welcome to Bread Coop</Heading1>
      <Body>This text uses our brand typography.</Body>
      <LiftedButton preset="primary" onClick={() => console.log("Clicked!")}>
        Click me
      </LiftedButton>
    </div>
  );
}
```

### Option 2: Tailwind Preset (Maximum Flexibility)

For projects that want full Tailwind integration with custom utilities and your design tokens.

#### Tailwind v3/v4 (Config-driven)

```js
// tailwind.config.js
module.exports = {
  presets: [require("bread-ui-kit/tailwind-preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/bread-ui-kit/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
```

```tsx
import React from "react";
import { Button, Heading1, Typography } from "bread-ui-kit";

function App() {
  return (
    <div>
      {/* Use pre-built typography components */}
      <Heading1>Brand Consistent Heading</Heading1>
      <Typography variant="body">Consistent body text</Typography>

      {/* Use pre-built button components */}
      <LiftedButton preset="primary">Click me</LiftedButton>

      {/* Or use Tailwind utilities with your design tokens */}
      <div className="bg-primary-orange text-white p-4 rounded-md">
        Custom styled element
      </div>
    </div>
  );
}
```

#### Tailwind v4 (Configless)

```css
/* globals.css */
@import "tailwindcss";
@import "bread-ui-kit/tailwind-preset";
```

```tsx
import React from "react";
import { LiftedButton, Heading1, Body } from "bread-ui-kit";
import "./globals.css";

function App() {
  return (
    <div>
      <Heading1>Brand Consistent Heading</Heading1>
      <Body>Consistent body text</Body>
      <LiftedButton variant="primary">Click me</LiftedButton>
      <div className="bg-primary-orange text-white p-4 rounded-md">
        Custom styled element
      </div>
    </div>
  );
}
```

## Design Tokens

The Bread Coop design system includes comprehensive design tokens:

### Colors

- **Primary Orange**: `#ea6023` (primary-orange)
- **Primary Jade**: `#286b63` (primary-jade)
- **Primary Blue**: `#1c5bb9` (primary-blue)
- **Paper Colors**: Light, warm paper tones (paper-main, paper-0, paper-1, paper-2)
- **Surface Colors**: Dark, rich surface tones (surface-ink, surface-brown, etc.)
- **System Colors**: Success (system-green), error (system-red), warning (system-warning)

### Typography

- **Bread Display**: Bold, impactful display font
- **Bread Body**: Clean, readable body font
- **Roboto**: Monospace font for code

### Available Classes

- **Text Styles**: `.text-h1`, `.text-h2`, `.text-h3`, `.text-h4`, `.text-h5`, `.text-body`
- **Button Styles**: `.bread-button-primary`, `.bread-button-secondary`, `.bread-button-outline`
- **Utility Classes**: All Tailwind utilities with your custom colors

## Components

### Typography

Brand-consistent typography components that ensure proper font usage across your application. **Bread Coop fonts are automatically loaded when you import the theme!**

#### Typography Component

```tsx
import { Typography } from "bread-ui-kit";

<Typography variant="h1">Main Heading</Typography>
<Typography variant="h2">Section Heading</Typography>
<Typography variant="body">Body text content</Typography>
<Typography variant="caption">Small caption text</Typography>
```

#### Individual Typography Components

```tsx
import { Heading1, Heading2, Heading3, Body, Caption } from "bread-ui-kit";

<Heading1>Main Heading</Heading1>
<Heading2>Section Heading</Heading2>
<Heading3>Subsection Heading</Heading3>
<Body>Body text content</Body>
<Caption>Small caption text</Caption>
```

#### Props

| Component                 | Props                                                                  | Description            |
| ------------------------- | ---------------------------------------------------------------------- | ---------------------- |
| Typography                | `variant: "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "body" \| "caption"` | Typography variant     |
| Typography                | `children: React.ReactNode`                                            | Content to display     |
| Typography                | `className?: string`                                                   | Additional CSS classes |
| Heading1-3, Body, Caption | `children: React.ReactNode`                                            | Content to display     |
| Heading1-3, Body, Caption | `className?: string`                                                   | Additional CSS classes |

### LiftedButton

A unique button component with a "lifted" design that creates a 3D effect with a shadow layer. The button floats above a dark base and depresses when clicked.

#### Props

| Prop           | Type                                                                | Default   | Description                         |
| -------------- | ------------------------------------------------------------------- | --------- | ----------------------------------- |
| children       | React.ReactNode                                                     | -         | The content of the button           |
| preset         | 'primary' \| 'secondary' \| 'destructive' \| 'positive' \| 'stroke' | 'primary' | The preset style of the button      |
| leftIcon       | React.ReactNode                                                     | -         | Icon to display on the left side    |
| rightIcon      | React.ReactNode                                                     | -         | Icon to display on the right side   |
| disabled       | boolean                                                             | false     | Whether the button is disabled      |
| colorOverrides | Partial<LiftedButtonColors>                                         | {}        | Override specific colors            |
| offsetPx       | number                                                              | 4         | Pixel offset for the lifted effect  |
| durationMs     | number                                                              | 300       | Transition duration in milliseconds |
| width          | 'full' \| 'auto' \| 'mobile-full'                                   | 'auto'    | Button width behavior               |
| scrollTo       | string                                                              | -         | Element ID to scroll to on click    |
| className      | string                                                              | ''        | Additional CSS classes              |
| type           | 'button' \| 'submit' \| 'reset'                                     | 'button'  | Button type                         |
| onClick        | () => void                                                          | -         | Click handler                       |

#### Presets

- **primary**: Orange background with white text
- **secondary**: Light orange background with orange text
- **destructive**: Red background with white text
- **positive**: Green background with white text
- **stroke**: White background with dark text and border

#### Examples

```tsx
import { LiftedButton } from "bread-ui-kit";
import { ArrowUpRight, SignOut } from "@phosphor-icons/react";

// Basic usage
<LiftedButton>Click me</LiftedButton>

// With presets
<LiftedButton preset="primary">Primary Button</LiftedButton>
<LiftedButton preset="secondary">Secondary Button</LiftedButton>
<LiftedButton preset="destructive">Delete</LiftedButton>
<LiftedButton preset="positive">Save</LiftedButton>
<LiftedButton preset="stroke">Cancel</LiftedButton>

// With icons
<LiftedButton leftIcon={<ArrowUpRight />}>External Link</LiftedButton>
<LiftedButton rightIcon={<SignOut />}>Sign Out</LiftedButton>

// Full width
<LiftedButton width="full">Full Width Button</LiftedButton>

// Mobile full width (full on mobile, auto on desktop)
<LiftedButton width="mobile-full">Responsive Button</LiftedButton>

// Custom offset and duration
<LiftedButton offsetPx={8} durationMs={500}>
  Custom Animation
</LiftedButton>

// Scroll to element
<LiftedButton scrollTo="contact-section">
  Contact Us
</LiftedButton>

// Disabled state
<LiftedButton disabled>Disabled Button</LiftedButton>
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## License

MIT

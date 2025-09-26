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
import { Button, Heading1, Body } from "bread-ui-kit";
// Import the complete theme CSS
import "bread-ui-kit/theme";

function App() {
  return (
    <div>
      <Heading1>Welcome to Bread Coop</Heading1>
      <Body>This text uses our brand typography.</Body>
      <Button
        variant="primary"
        size="medium"
        onClick={() => console.log("Clicked!")}
      >
        Click me
      </Button>
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
      <Button variant="primary">Click me</Button>

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
import { Button, Heading1, Body } from "bread-ui-kit";
import "./globals.css";

function App() {
  return (
    <div>
      <Heading1>Brand Consistent Heading</Heading1>
      <Body>Consistent body text</Body>
      <Button variant="primary">Click me</Button>
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

### Button

A customizable button component with multiple variants and sizes.

#### Props

| Prop      | Type                                  | Default   | Description                    |
| --------- | ------------------------------------- | --------- | ------------------------------ |
| children  | React.ReactNode                       | -         | The content of the button      |
| variant   | 'primary' \| 'secondary' \| 'outline' | 'primary' | The variant of the button      |
| size      | 'small' \| 'medium' \| 'large'        | 'medium'  | The size of the button         |
| disabled  | boolean                               | false     | Whether the button is disabled |
| onClick   | () => void                            | -         | Click handler                  |
| className | string                                | ''        | Additional CSS classes         |
| type      | 'button' \| 'submit' \| 'reset'       | 'button'  | Button type                    |

#### Examples

```tsx
// Primary button
<Button variant="primary">Primary Button</Button>

// Secondary button
<Button variant="secondary">Secondary Button</Button>

// Outline button
<Button variant="outline">Outline Button</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Disabled button
<Button disabled>Disabled Button</Button>
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

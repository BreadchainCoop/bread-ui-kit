# Bread UI Kit

A React TypeScript component library for implementing Bread Coop branding in JS/TS projects. Choose your integration approach based on your needs.

## Installation

```bash
npm install @breadcoop/ui
```

## ⚠️ Important: CSS Import Required

**Your components will not display correctly without importing the theme CSS!** Choose one of the integration methods below.

### 🚨 Troubleshooting: Components Not Styling

If your LiftedButton or other components appear unstyled:

1. **Check browser console** - you should see a warning about missing CSS variables
2. **Import the theme CSS** using one of the methods below
3. **Ensure Tailwind is configured** if using the preset method
4. **Clear build cache** and rebuild your project

**Quick Fix:**

```tsx
// Add this import to your main component or CSS file
import "@breadcoop/ui/theme";
```

## Usage Options

### Option 1: Drop-in CSS Theme (Simplest)

Perfect for projects that want to use pre-built components without configuration.

```tsx
import React from "react";
import { LiftedButton, Heading1, Body } from "@breadcoop/ui";
// Import the complete theme CSS
import "@breadcoop/ui/theme";

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

**For custom fonts (optional):**

```tsx
// Import fonts separately if you want the custom Bread Coop fonts
import "@breadcoop/ui/fonts";
```

**Note**: If you're using this in a project that already has Tailwind CSS, you might need to import the theme in your main CSS file instead:

```css
/* In your main CSS file (e.g., globals.css, index.css) */
@import "@breadcoop/ui/theme";
@import "@breadcoop/ui/fonts"; /* Optional: for custom fonts */
```

### Option 2: Tailwind Preset (Maximum Flexibility)

For projects that want full Tailwind integration with custom utilities and your design tokens.

#### Tailwind v3/v4 (Config-driven)

```js
// tailwind.config.js
module.exports = {
  presets: [require("@breadcoop/ui/tailwind-preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@breadcoop/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
```

```tsx
import React from "react";
import { LiftedButton, Heading1, Typography } from "@breadcoop/ui";

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
@import "@breadcoop/ui/tailwind-preset";
```

```tsx
import React from "react";
import { LiftedButton, Heading1, Body } from "@breadcoop/ui";
import "./globals.css";

function App() {
  return (
    <div>
      <Heading1>Brand Consistent Heading</Heading1>
      <Body>Consistent body text</Body>
      <LiftedButton preset="primary">Click me</LiftedButton>
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
import { LiftedButton } from "@breadcoop/ui";
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

## Troubleshooting

### Theme Not Loading

If the theme styles aren't appearing:

1. **Check import path**: Make sure you're importing from `@breadcoop/ui/theme`
2. **CSS import order**: Import the theme before your component styles
3. **Build tool compatibility**: Some bundlers require CSS imports in CSS files rather than JS files

**Try this approach:**

```css
/* In your main CSS file */
@import "@breadcoop/ui/theme";
```

### Fonts Not Loading

If fonts aren't displaying:

1. **Check network tab**: Look for 404 errors on font files
2. **Verify font paths**: The theme.css should be in `node_modules/@breadcoop/ui/dist/theme.css`
3. **Clear cache**: Try clearing your browser cache and node_modules

### Components Not Styled

If components render but without styles:

1. **Import theme**: Make sure you've imported `@breadcoop/ui/theme`
2. **Check CSS specificity**: Your custom styles might be overriding the theme
3. **Verify Tailwind**: If using Tailwind preset, ensure Tailwind is properly configured

## Local Development & Usage

### Setting Up for Local Development

If you want to use this UI kit in your project during development or make custom modifications, you can set it up locally.

#### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd bread-ui-kit

# Install dependencies
npm install

# Build the library
npm run build
```

#### Step 2: Configure Your Project's package.json

**Option A: Using file: protocol (Recommended)**

Add a local reference to your project's `package.json`:

```json
{
  "dependencies": {
    "bread-ui-kit": "file:../bread-ui-kit"
  }
}
```

Then install:

```bash
npm install
```

**Option B: Using npm link**

```bash
# In the bread-ui-kit directory
npm link

# In your project directory
npm link bread-ui-kit
```

**Option C: Direct path installation**

```bash
# In your project directory
npm install /path/to/bread-ui-kit
```

#### Step 3: Import and Use in Your Project

```tsx
// Import components
import { Logo, LiftedButton, Typography } from "bread-ui-kit";

// Import the theme CSS
import "bread-ui-kit/theme";

function App() {
  return (
    <div>
      <Logo text="Bread Coop" className="text-lg" color="blue" size={48} />

      <LiftedButton preset="primary">Click me</LiftedButton>

      <Typography variant="h1">Welcome to Bread Coop</Typography>
    </div>
  );
}
```

### Development Workflow

When making changes to the UI kit:

1. **Make your changes** in the `src/` directory
2. **Build the library**: `npm run build`
3. **Test in your project** - changes should be reflected immediately if using `npm link`

### Available Components

#### Logo Component

```tsx
import { Logo } from 'bread-ui-kit';

// Basic usage
<Logo />

// With text and custom styling
<Logo
  text="Bread Coop"
  className="text-xl font-bold"
  color="blue"
  size={48}
/>

// Different variants
<Logo variant="square" color="jade" />
<Logo variant="line" color="white" />
```

**Logo Props:**

- `size?: number` - Size in pixels (default: 32)
- `color?: "orange" | "blue" | "jade" | "white"` - Color variant (default: "orange")
- `variant?: "square" | "line"` - Logo variant
- `text?: string` - Optional text to display next to the logo
- `className?: string` - Additional CSS classes (applied to text when text prop is used)

#### LiftedButton Component

```tsx
import { LiftedButton } from 'bread-ui-kit';

<LiftedButton preset="primary">Click me</LiftedButton>
<LiftedButton preset="secondary" disabled>Disabled</LiftedButton>
<LiftedButton width="full">Full Width</LiftedButton>
```

#### Typography Components

```tsx
import { Typography, Heading1, Body } from 'bread-ui-kit';

<Typography variant="h1">Main Heading</Typography>
<Heading1>Direct Heading</Heading1>
<Body>Body text content</Body>
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

# Run Storybook (for component development)
npm run storybook
```

## License

MIT

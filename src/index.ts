// Note: CSS is provided separately via theme.css and tailwind-preset.js
// Consumers can choose their preferred integration method


export { default as Chip } from "./components/chip/chip";

export { default as Footer } from "./components/footer/footer";

// Typography components for brand consistency
export {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Body,
  Caption,
  fontVariables,
} from "./components/typography/Typography";
export { FormattedDecimalNumber } from "./components/typography/formatted-dec-num";

export * from "./components/Logo"

export { LoadingIcon } from "./components/loading-icon";

export * from "./utils/index";

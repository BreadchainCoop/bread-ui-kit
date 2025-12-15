// Note: CSS is provided separately via theme.css and tailwind-preset.js
// Consumers can choose their preferred integration method

export { default as Chip } from "./components/chip/chip";
export { default as Footer } from "./components/footer/footer";
export { default as LiftedButton } from "./components/LiftedButton/LiftedButton";
export type { LiftedButtonProps } from "./components/LiftedButton/LiftedButton";

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

// Logo component
export { Logo } from "./components/Logo";
export * from "./components/navbar";
export type { LogoProps, LogoColor, LogoVariant } from "./components/Logo";

// Font utilities for Bread Coop brand consistency
import React from "react";

// Font CSS variables
export const fontVariables = {
  breadDisplay: "--font-breadDisplay",
  breadBody: "--font-breadBody",
} as const;

// Typography components that ensure brand consistency
export const Typography: React.FC<{
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "body" | "caption";
  children: React.ReactNode;
  className?: string;
}> = ({ variant, children, className = "" }) => {
  const baseClasses = "font-breadBody"; // fallback to breadBody

  const variantClasses = {
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
    body: "text-body",
    caption: "text-caption",
  };

  const Component = variant.startsWith("h") ? variant : "p";

  return React.createElement(
    Component,
    {
      className:
        `${baseClasses} ${variantClasses[variant]} ${className}`.trim(),
    },
    children
  );
};

// Brand-consistent heading components
export const Heading1: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <Typography variant="h1" className={className}>
    {children}
  </Typography>
);

export const Heading2: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <Typography variant="h2" className={className}>
    {children}
  </Typography>
);

export const Heading3: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <Typography variant="h3" className={className}>
    {children}
  </Typography>
);

export const Body: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <Typography variant="body" className={className}>
    {children}
  </Typography>
);

export const Caption: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <Typography variant="caption" className={className}>
    {children}
  </Typography>
);

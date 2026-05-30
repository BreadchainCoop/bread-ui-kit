import { defineConfig } from "tsup";

const sharedConfig = {
  dts: true,
  splitting: false,
  sourcemap: false,
  target: "es2017" as const,
  external: [
    "react",
    "react-dom",
    "wagmi",
    "viem",
    "@privy-io/react-auth",
    "@rainbow-me/rainbowkit",
    "@tanstack/react-query",
  ],
  treeshake: true,
  minify: false,
  css: false,
};

export default defineConfig([
  {
    ...sharedConfig,
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    clean: true,
  },
  {
    ...sharedConfig,
    entry: ["src/client.ts"],
    format: ["cjs", "esm"],
    clean: false,
  },
]);

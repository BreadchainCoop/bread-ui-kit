import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    // Ensure Vite can resolve font files
    config.assetsInclude = ["**/*.woff2"];
    // Stub Privy in Storybook so navbar components render without a real
    // <PrivyProvider>/app id (see .storybook/mocks/privy-react-auth.tsx).
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@privy-io/react-auth": fileURLToPath(
        new URL("./mocks/privy-react-auth.tsx", import.meta.url),
      ),
    };
    return config;
  },
};
export default config;

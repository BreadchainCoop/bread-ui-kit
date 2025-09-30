import type { Preview } from "@storybook/react";
import "../theme.css";
import "../src/fonts/fonts.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

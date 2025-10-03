import tailwindPreset from "./tailwind-preset.js";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}", // include storybook stories
  ],
  presets: [tailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};

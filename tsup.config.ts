import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: false, // Disable sourcemaps to avoid deployment issues
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  minify: true,
  css: false, // Disable CSS processing in tsup
});

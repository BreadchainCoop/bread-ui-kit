import { defineConfig } from "tsup";
import { fixImportsPlugin } from "esbuild-fix-imports-plugin";

export default defineConfig({
	entry: [
		"src/**/*.ts",
		"src/**/*.tsx",
		"!src/**/*.test.*",
		"!src/**/*.stories.*",
	],
	format: ["esm"],
	bundle: false,
	dts: true,
	target: "es2017",
	clean: true,
	esbuildPlugins: [fixImportsPlugin()],
});

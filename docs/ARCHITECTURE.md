# Architecture

How `@breadcoop/ui` is structured, built, and consumed. Read this before changing the
build, the exports, or anything touching React Server Components. For day-to-day rules see
[AGENTS.md](../AGENTS.md).

## The shape of the package

This is a **pure component library** — no app shell, no server, no routes. Everything is
authored in `src/` and compiled into `dist/`, which is what npm publishes.

The package exposes four things to consumers (see `exports` in `package.json`):

| Import path                     | What it is                                            |
| ------------------------------- | ----------------------------------------------------- |
| `@breadcoop/ui`                 | The JS/TS API — components, hooks, utils, context     |
| `@breadcoop/ui/theme`           | `theme.css` — Tailwind v4 import + `@font-face` rules |
| `@breadcoop/ui/tailwind-preset` | `tailwind-preset.js` — brand colors + font families   |
| `@breadcoop/ui/fonts`           | `fonts.css` + bundled `.woff2` font files             |

`src/index.ts` is the **single public barrel**. If it isn't exported there (directly or via
a folder `index.ts`), consumers can't import it. Adding an export grows the public API;
removing/renaming one is a breaking change.

## Build: ESM-only, unbundled (for RSC)

The build is [tsup](https://tsup.egoist.dev/) (`tsup.config.ts`). Two non-negotiable
choices make this library safe to use inside React Server Component apps like
[app-stacks](https://github.com/BreadchainCoop/app-stacks):

```ts
format: ["esm"],   // ESM only — no CJS
bundle: false,     // compile each source file to its own dist file, 1:1
```

Why this matters:

- **`bundle: false` preserves per-file `"use client"` directives.** A bundler would merge
  modules and collapse or strip those directives, which would force the consumer's entire
  import to become client-side (or break the RSC boundary entirely). By emitting one output
  file per source file, each component keeps its own `"use client"` (or stays server-safe),
  so Next.js can split the boundary correctly. **This is the reason you must never delete a
  `"use client"` directive or re-enable bundling.**
- **ESM-only** matches modern Next.js / RSC consumers and keeps a single module graph.
- **`esbuild-fix-imports-plugin`** rewrites relative imports to include file extensions,
  which unbundled ESM requires to resolve correctly.
- **`dts: true`** emits `.d.mts` type declarations next to the JS, with `declarationMap`
  for go-to-definition into source.

The `build` script then runs `copy-files` to place `theme.css`, `tailwind-preset.js`, and
the `fonts/` directory into `dist/` so the non-JS entry points resolve.

> `dist/` is **gitignored** and generated. Never edit it by hand; never commit it.

## Theming model

Brand styling is delivered as Tailwind v4 config + CSS, not as bundled CSS-in-JS:

- **`tailwind-preset.js`** defines the brand color tokens (`core-orange`, `primary-blue`,
  `surface-ink`, `paper-main`, …) and font families (`breadDisplay`, `breadBody`,
  `roboto`). Consumers add it as a Tailwind preset, or it's pulled in via `theme.css`.
- **`theme.css`** imports Tailwind and declares the Pogaca `@font-face` rules pointing at
  the bundled fonts. Consumers `@import "@breadcoop/ui/theme";` in their global CSS.
- Components reference these tokens through Tailwind utility classes (`bg-core-orange`,
  `font-breadDisplay`, …), composed safely with the `cn` helper (`src/utils/cn.ts`,
  `clsx` + `tailwind-merge`).

### App-aware components

Some components render differently per consuming app. The app identity is the `App` type
(`"fund" | "stacks" | "net"`, `src/interface/app.ts`) provided through `BreadUIKitProvider`
(`src/context/lib.tsx`) along with `chainId` and a `tokenConfig` (e.g. the BREAD token
address/ABI). Components read the active app from context (or an `app` prop) and switch
classes accordingly — see `src/components/buttons/button.tsx` for the canonical pattern.
Prefer extending that switch over forking a component per app.

## Web3 & React as peer dependencies

`react`, `react-dom`, `wagmi`, `viem`, `@rainbow-me/rainbowkit`, `@privy-io/react-auth`,
`@tanstack/react-query`, and `@phosphor-icons/react` are **peer dependencies**, not
bundled dependencies. The consuming app installs and owns them, guaranteeing a single
instance of React, wagmi, and viem across the tree (multiple copies cause hook errors and
broken wallet state). The library's own runtime deps are intentionally tiny: `clsx`,
`tailwind-merge`, and `@radix-ui/react-navigation-menu`.

**Implication for changes:** importing from a peer dep is fine. Requiring a *new* peer dep,
or moving a peer dep into `dependencies`, changes what every consumer must install — treat
it as a breaking change and flag it.

## Storybook = the dev surface

There's no app to run, so [Storybook](https://storybook.js.org/) (`.storybook/`, Storybook
9 with the Vite builder) is where components are developed and verified. Stories live next
to components as `*.stories.tsx`. New or changed components should come with a story; it's
the primary way to confirm a visual/behavioral change without a downstream app.

## Map: source → output

```
src/index.ts                →  dist/index.mjs  + dist/index.d.mts   (public API)
src/components/**/*.tsx      →  dist/components/**/*.mjs (+ .d.mts)   (1:1, unbundled)
theme.css                   →  dist/theme.css            (copied)
tailwind-preset.js          →  dist/tailwind-preset.js   (copied)
src/fonts/                  →  dist/fonts/               (copied)
```

# AGENTS.md

Canonical instructions for AI coding agents (Claude Code, Cursor, Copilot, Codex, etc.)
working in this repository. Human contributors: see [CONTRIBUTING.md](./CONTRIBUTING.md).

Claude Code also reads [CLAUDE.md](./CLAUDE.md), which holds the behavioral rules and
points back here for project context.

---

## What this project is

**Bread UI Kit** (`@breadcoop/ui`) is the shared React + TypeScript **component library**
for the Bread Coop frontend. It ships brand styling (Tailwind v4 theme, fonts, colors),
typography, buttons, navbar/footer, auth + wallet UI, and a handful of web3 hooks.

It is **not an app** — it has no routes, no backend, and no deploy target. Its job is to
be a stable, well-typed package that the consumer apps install and render:

- [app-stacks](https://github.com/BreadchainCoop/app-stacks) (Saving Circles)
- [breadcoop-landing](https://github.com/BreadchainCoop/breadcoop-landing)
- [crowdstaking-v2](https://github.com/BreadchainCoop/crowdstaking-v2)

Because multiple apps depend on it, **the public API is a contract.** A careless rename or
prop change here breaks downstream apps. Treat every exported component, prop, and type as
public unless you can confirm nothing imports it. See [Guardrails](#guardrails--do-not-do-these).

## Tech stack

| Area             | Choice                                                             |
| ---------------- | ------------------------------------------------------------------ |
| Language         | TypeScript (strict)                                                |
| UI               | React 18 (`react`/`react-dom` are **peer** deps, `>=16.8`)         |
| Styling          | Tailwind CSS v4 — exposed via a preset + `theme.css`               |
| Build            | [tsup](https://tsup.egoist.dev/) — **ESM-only, unbundled** for RSC |
| Docs / preview   | Storybook 9 (`*.stories.tsx`)                                      |
| Web3 (peer deps) | wagmi v2, viem v2, RainbowKit v2, Privy, TanStack Query v5         |
| Icons (peer dep) | `@phosphor-icons/react`                                            |
| Lint             | ESLint (typescript-eslint + react + react-hooks + storybook)       |
| Package manager  | **npm** (the repo is locked with `package-lock.json`)              |

The web3 / React libraries are **peer dependencies** on purpose — the consumer app owns
those instances so there is exactly one wagmi/viem/React in the tree. Do not move them into
`dependencies`. See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for why and how the build
preserves React Server Component support.

## Repository map

```
src/
  index.ts            Public entry — the barrel that defines the package's API surface
  components/         One folder per component; each re-exports via index.ts
    buttons/          Button (app-themed), CopyButtonIcon
    LiftedButton/     Animated "lifted" button + presets (being phased out downstream)
    typography/       Typography + Heading1-5, Body, Caption, FormattedDecimalNumber
    navbar/ footer/   Layout chrome
    auth/             Login buttons (Privy + general wallet variants)
    connected-user/   ConnectedUserProvider + useConnectedUser (wallet/user state)
    chip/ Logo/ loading-icon
  context/            BreadUIKitProvider — app theme + token config context
  hooks/              use-bread-balance, use-copy-to-clipboard, ... (one concern each)
  utils/              cn, formatter, truncate-address, copy-to-clipboard, cssValidation
  interface/          Shared types (e.g. App = "fund" | "stacks" | "net")
  constansts/         Static data (links, tools) — note the existing spelling
  fonts/              Pogaca .woff2 files + fonts.css
  assets/             Images bundled into stories/components
theme.css             Tailwind v4 theme + @font-face — published as @breadcoop/ui/theme
tailwind-preset.js    Brand colors + font families — published as @breadcoop/ui/tailwind-preset
tsup.config.ts        Build config (ESM, unbundled, dts)
.storybook/           Storybook config
dist/                 Build output (gitignored; published to npm)
```

For a one-line index of every public export (components, providers, hooks, utils, types),
see **[docs/COMPONENTS.md](./docs/COMPONENTS.md)** — check it before adding a component here
or in a consumer app to avoid rebuilding something that already ships.

## Setup & commands

This repo uses **npm**. Do not use pnpm or yarn here (it would desync `package-lock.json`).

```bash
npm install            # install deps
npm run dev            # tsup --watch: rebuild dist/ on change (for local linking)
npm run build          # build dist/ (tsup) + copy theme.css, preset, fonts
npm run storybook      # Storybook dev server on http://localhost:6006
npm run build-storybook
npm run lint           # ESLint over src
npm run lint:fix       # ESLint --fix
npm run type-check     # tsc --noEmit (strict)
npm test               # jest (see note below — no tests exist yet)
```

### Testing changes inside a consumer app

There is no app to "run" here. To verify a change end-to-end, link the package into a
consumer app (app-stacks, etc.):

```bash
# in bread-ui-kit
npm run build              # or `npm run dev` to rebuild on save
# in the consumer app's package.json
#   "@breadcoop/ui": "file:../bread-ui-kit"
# then reinstall in the consumer app
```

Then exercise the changed component in that app or in Storybook.

## Verification — how to check your work

This project has **no automated test suite** (the `test` script points at jest, but there
are zero test files). Do not claim a change "passes tests." The required gates before
considering work done are:

1. `npm run lint` — must be clean (no errors).
2. `npm run type-check` — `tsc --noEmit` must pass (strict mode).
3. `npm run build` — must succeed, including `.d.ts` generation.
4. For any visual or behavioral change, view the component in **Storybook**
   (`npm run storybook`) and describe what you checked. If you add or change a component,
   add or update its `*.stories.tsx`.

If you add non-trivial logic (a util/hook), consider adding a test even though none exist
yet, and say so — but the gates above are the baseline that must pass.

## Conventions (follow the existing code)

This library was written over time and the style is **not uniform** — some folders use tabs
+ kebab-case files (`components/buttons/`), others use 2-space indent + PascalCase files
(`components/typography/`, `components/Logo/`). **Match the file and folder you are editing**
rather than imposing one global style. When creating a new component folder, pick the
closest existing sibling as your template.

- **Public API lives in `src/index.ts`.** A new component is not usable by consumers until
  it is exported there (usually via the folder's `index.ts` barrel). Keep exports explicit
  and named; preserve existing export names — renaming one is a breaking change. When you
  add or remove an export, update the index in [docs/COMPONENTS.md](./docs/COMPONENTS.md).
- **Imports are relative** (`../../utils`, `./LiftedButtonPresets`). There is no `@/` path
  alias configured — do not introduce one.
- **Server vs client:** files that use hooks, state, effects, event handlers, browser APIs,
  or wallet/Privy context **must start with `"use client"`**. The unbundled build preserves
  this directive per-file so consumer apps can keep RSC working — **never remove a
  `"use client"` directive** and add one to any new interactive component. Keep purely
  presentational components server-compatible (no directive, no browser-only APIs at module
  scope).
- **Styling:** Tailwind utility classes using the brand tokens from `tailwind-preset.js`
  (e.g. `bg-core-orange`, `text-surface-ink`, `font-breadDisplay`). Merge/condition classes
  with the `cn` helper (`src/utils/cn.ts`) — never hand-concatenate `className` strings for
  conditional logic. Do not hardcode hex colors that already exist as tokens.
- **App theming:** several components are themed by app via the `App` type
  (`"fund" | "stacks" | "net"`) and `BreadUIKitProvider` (`src/context/lib.tsx`). When a
  component varies by app, read it from context / the `app` prop — don't fork the component.
- **TypeScript:** strict mode is on. Avoid `any`; prefer `unknown` + narrowing. Export the
  props type for any public component (e.g. `ButtonProps`, `LiftedButtonProps`). Unused
  vars/args must be prefixed with `_` or removed (ESLint enforces this).
- **Peer-dependency imports** (`wagmi`, `viem`, `react`, `@phosphor-icons/react`, …) are
  fine to import — they resolve from the consumer app. Adding a brand-new peer dep is a
  breaking change for consumers; flag it.
- **Fonts/theme:** the brand fonts and `@font-face` rules live in `theme.css` /
  `src/fonts/`. See [FONTS.md](./FONTS.md) before touching font wiring.

## Guardrails — do not do these

- **Do not break the public API silently.** Renaming/removing an export, renaming a prop,
  or changing a prop's type/default can break app-stacks, breadcoop-landing, and
  crowdstaking-v2. If a change is breaking, say so explicitly and bump the version per
  [semver](https://semver.org/) (`major` for breaking) — see [CONTRIBUTING.md](./CONTRIBUTING.md).
- **Do not move peer dependencies** (`react`, `wagmi`, `viem`, `@rainbow-me/rainbowkit`,
  `@privy-io/react-auth`, `@tanstack/react-query`, `@phosphor-icons/react`) into
  `dependencies`, and don't add heavy runtime deps. The consumer app must own those
  instances (one React, one wagmi).
- **Do not remove `"use client"` directives** or change the build to bundle output
  (`bundle: false` and ESM-only in `tsup.config.ts` are required for RSC support).
- **Do not edit `dist/`** by hand — it is generated by `npm run build` and gitignored.
- **Do not reformat or refactor code unrelated to your change**, and do not "normalize" the
  indentation of a file you're only making a small edit to.
- **Do not delete pre-existing dead/commented code** unless asked — mention it instead.
- **Do not** commit secrets or `.env*` files.

## Pull requests

- Branch from and target **`main`** (this repo's default branch).
- Use **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`…) and
  reference the issue number when fixing one.
- If your change touches the public API, bump `version` in `package.json` and note the
  breaking/non-breaking impact in the PR description.
- Keep PRs focused; describe what you changed and how you verified it (the gates above +
  what you saw in Storybook / a consumer app).

Full workflow details: [CONTRIBUTING.md](./CONTRIBUTING.md).
Build/export internals: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

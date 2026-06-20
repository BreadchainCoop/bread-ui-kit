# Contributing to Bread UI Kit

Thanks for contributing to `@breadcoop/ui`, the shared component library behind the Bread
Coop frontend ([app-stacks](https://github.com/BreadchainCoop/app-stacks),
[breadcoop-landing](https://github.com/BreadchainCoop/breadcoop-landing),
[crowdstaking-v2](https://github.com/BreadchainCoop/crowdstaking-v2)).

This is the **human** guide. AI coding agents should read [AGENTS.md](./AGENTS.md) (and
Claude Code reads [CLAUDE.md](./CLAUDE.md)); the architecture is in
[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md). Everything here is consistent with those.

## Getting started

This repo uses **npm** (it's locked with `package-lock.json` — don't use pnpm/yarn).

```bash
git clone https://github.com/BreadchainCoop/bread-ui-kit.git
cd bread-ui-kit
npm install
npm run storybook        # http://localhost:6006 — the main dev surface
```

There's no app to run — you build and preview components in **Storybook**.

## Common commands

| Command                   | What it does                                      |
| ------------------------- | ------------------------------------------------- |
| `npm run storybook`       | Storybook dev server (develop/preview components) |
| `npm run dev`             | `tsup --watch` — rebuild `dist/` on change        |
| `npm run build`           | Build `dist/` + copy theme/preset/fonts           |
| `npm run lint`            | ESLint                                            |
| `npm run lint:fix`        | ESLint with `--fix`                               |
| `npm run type-check`      | `tsc --noEmit` (strict)                           |
| `npm run build-storybook` | Static Storybook build                            |

## Developing a component in a real app

To see a change inside a consumer app before publishing, link the package locally:

1. In a consumer app's `package.json`, point the dependency at your local checkout:
   ```json
   { "dependencies": { "@breadcoop/ui": "file:../bread-ui-kit" } }
   ```
2. In `bread-ui-kit`, run `npm run dev` (rebuilds on save).
3. Reinstall in the consumer app and exercise the component there.

## Before you open a PR

There is **no automated test suite**. The required checks are:

1. `npm run lint` — clean.
2. `npm run type-check` — passes (strict).
3. `npm run build` — succeeds (including `.d.ts` generation).
4. Component verified in **Storybook**. If you add or change a component, add/update its
   `*.stories.tsx`.

## The public API is a contract

Three apps depend on this package, so what you export is a contract:

- New components must be exported from `src/index.ts` (usually via a folder `index.ts`),
  with their props type exported too (e.g. `ButtonProps`).
- **Renaming or removing an export, renaming a prop, or changing a prop's type/default is a
  breaking change.** Avoid it when you can; when you must, call it out explicitly.
- Keep React/web3 libraries as **peer dependencies**. Adding a new peer dep or a heavy
  runtime dep affects every consumer — flag it in the PR.

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for why the build is ESM-only and
unbundled, and why `"use client"` directives must be preserved for RSC support.

## Versioning & releases

This package follows [semver](https://semver.org/):

- **patch** — bug fix, no API change.
- **minor** — new component/prop, backward compatible.
- **major** — breaking change to the public API.

Bump `version` in `package.json` as part of the PR when your change is user-facing. The
`prepublishOnly` script runs `npm run build`, so publishing always builds fresh `dist/`.

## Coding conventions

Follow the existing code. A few specifics (full list in [AGENTS.md](./AGENTS.md)):

- Match the style of the folder you're editing — this codebase mixes tab/space indentation
  and kebab/PascalCase filenames across folders by history. Don't reformat unrelated code.
- Use the brand Tailwind tokens (`tailwind-preset.js`) and the `cn` helper for class merging.
- Add `"use client"` to any interactive component (hooks/state/effects/handlers/wallet);
  keep presentational components server-safe. Never remove an existing `"use client"`.
- TypeScript strict: avoid `any`, prefix unused vars with `_`.

## Commits & branches

- Branch from and target **`main`**.
- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`,
  `chore:`, `refactor:`, `docs:`, `style:`, `test:` — reference an issue number when one
  exists.
- Keep PRs focused. Describe what changed, the API impact (breaking or not), and how you
  verified it.

## Design-driven work

New components and design-system updates usually start from a design issue — see the
[Design Issue template](./.github/ISSUE_TEMPLATE/design.md). Link the Figma file and confirm
the required variants/states before implementing.

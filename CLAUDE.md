# CLAUDE.md

Guidance for Claude Code working in this repo.

**Project context — read first:** all stack, architecture, commands, conventions, and
guardrails live in **[AGENTS.md](./AGENTS.md)** (the canonical agent doc, shared with
Cursor/Copilot/Codex). Deeper references: [docs/COMPONENTS.md](./docs/COMPONENTS.md) (index
of every public export), [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md),
[CONTRIBUTING.md](./CONTRIBUTING.md), and [FONTS.md](./FONTS.md).

The rest of this file is the behavioral playbook: _how_ to work, not _what_ the project
is. These are general rules to reduce common LLM coding mistakes.

**This is a shared library.** Other apps depend on its public API, so the bias toward
caution below matters more here than in a normal app: a "small cleanup" can be a breaking
change for three downstream apps. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- **Before changing anything exported from `src/index.ts`, ask:** will this rename, remove,
  or retype something a consumer app imports? If yes, it's a breaking change — flag it.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No new props, variants, or "configurability" that wasn't requested — every prop you add
  is API surface this library must support forever.
- No abstractions for single-use code.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken, and **don't normalize indentation** — this repo
  mixes tabs and spaces across folders on purpose-by-history; match the file you're in.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

This repo has **no automated test suite**, so verification means the gates in
[AGENTS.md](./AGENTS.md#verification--how-to-check-your-work):

- `npm run lint` clean, `npm run type-check` passes, `npm run build` succeeds.
- For any visual/behavioral change, view it in **Storybook** (`npm run storybook`) and add
  or update the component's `*.stories.tsx`. For integration concerns, link the package into
  a consumer app and check it there.

Transform tasks into verifiable goals:

- "Add a variant" → "Define the variant; confirm it renders in Storybook and types compile."
- "Fix the bug" → "Reproduce it in a story, fix it, confirm the repro no longer triggers."
- "Refactor X" → "Confirm lint + type-check + build pass and the public API is unchanged
  (or the change is intentionally versioned)."

For multi-step tasks, state a brief plan:

```text
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work")
require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer accidental
breaking changes to the public API, fewer rewrites due to overcomplication, and clarifying
questions come before implementation rather than after mistakes.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2026-08-05

### Fixed

- Declared `"sideEffects": false` in `package.json` so bundlers (webpack, Rollup, esbuild,
  Vite) can tree-shake unused submodules (e.g. `navbar`, `auth`, `connected-user`) for
  consumers who only import a subset of components like `Logo`, `Body`, or `LiftedButton`.
  Previously, importing any export pulled in the full dependency graph, inflating consumer
  bundle sizes by 150–200KB in some cases.

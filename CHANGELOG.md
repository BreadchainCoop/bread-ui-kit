# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-11-06

### Added

- `LoginButtonGeneral` and `ConnectedUserProviderGeneral` exports from `@breadcoop/ui`, and a
  new `@breadcoop/ui/privy` entry point exporting `LoginButtonPrivy` and
  `ConnectedUserProviderPrivy`. Apps that use these instead of the runtime-switching
  components no longer bundle `@privy-io/react-auth` (~750 kB gzipped with its WalletConnect
  and Solana dependencies).

### Changed

- `Navbar` no longer imports Privy. It reads its login button, logout and ENS behaviour
  from the mounted `ConnectedUserProvider*`, so it no longer needs a `PrivyProvider` in
  general-auth apps.

### Deprecated

- `LoginButton` and `ConnectedUserProvider`: they pick the Privy or general variant at
  runtime, so they always bundle Privy. Use the explicit variants above.

## [2.0.3] - 2026-08-05

### Fixed

- Declared `"sideEffects": false` in `package.json` so bundlers (webpack, Rollup, esbuild,
  Vite) can tree-shake unused submodules (e.g. `navbar`, `auth`, `connected-user`) for
  consumers who only import a subset of components like `Logo`, `Body`, or `LiftedButton`.
  Previously, importing any export pulled in the full dependency graph, inflating consumer
  bundle sizes by 150–200KB in some cases.

# Component & API index

A one-line catalog of everything `@breadcoop/ui` exports, so you can check whether
something already exists **before building it in a consumer app**
([app-stacks](https://github.com/BreadchainCoop/app-stacks),
[breadcoop-landing](https://github.com/BreadchainCoop/breadcoop-landing),
[crowdstaking-v2](https://github.com/BreadchainCoop/crowdstaking-v2)).

This is a discovery aid, not full documentation. The **sources of truth** for exact props
and behavior are:

- **Storybook** — live, visual prop playground (`npm run storybook`, or the
  [hosted demo](http://breadcoopstorybook.netlify.app/)).
- **The shipped types** — `@breadcoop/ui`'s `.d.mts` declarations give exact, always-in-sync
  prop/return types via your editor's autocomplete.
- **`src/index.ts`** — the single barrel that defines the public API. If it isn't exported
  there, it's internal — don't import it via deep paths.

> Keep this file in sync with `src/index.ts` when you add or remove an export.

## Setup (required first)

Most components and all hooks read app config from context. Wrap your app once at the root:

- **`BreadUIKitProvider`** — supplies `app` (`"fund" | "stacks" | "net"`), `chainId`,
  `tokenConfig` (the BREAD token `address` + `abi`), and `authProvider`
  (`"privy" | "general"`). App-aware components and `useBreadBalance` won't work without it.
  — `src/context/lib.tsx`
- **`ConnectedUserProvider`** — provides wallet/user connection state to `useConnectedUser`;
  picks the Privy or general-wallet implementation based on `authProvider`. Nest inside
  `BreadUIKitProvider`. — `src/components/connected-user/provider.tsx`

## Components

- **`Typography`** — single component switching brand styles by `variant`
  (`h1`–`h5`, `body`, `caption`). — `src/components/typography/Typography.tsx`
- **`Heading1`–`Heading5`, `Body`, `Caption`** — named shortcuts for the typography variants
  (`Body` also takes `bold`). — `src/components/typography/Typography.tsx`
- **`FormattedDecimalNumber`** — renders a number with the integral/decimal parts styled
  separately, plus an optional BREAD icon and `unit`. — `src/components/typography/formatted-dec-num.tsx`
- **`Button`** — primary app-themed button (`variant`, `size`, icons, `isLoading`,
  polymorphic `as`). The main button; see README + Storybook. — `src/components/buttons/button.tsx`
- **`CopyButtonIcon`** — icon button that copies `textToCopy` to the clipboard and shows a
  check on success. — `src/components/buttons/copy-icon.tsx`
- **`LiftedButton`** — animated "lifted" button with presets. **Being phased out downstream**
  — prefer `Button` for new work. — `src/components/LiftedButton/LiftedButton.tsx`
- **`Logo`** — Bread Coop logo; `variant` (`square`/`line`), `color`, `size`, optional `text`.
  — `src/components/Logo/Logo.tsx`
- **`Chip`** — small pill/badge; `size` (`small`/`regular`), optional `icon`.
  — `src/components/chip/chip.tsx`
- **`LoadingIcon`** — circular spinner tinted by `app`. — `src/components/loading-icon.tsx`
- **`Navbar`** — top navigation bar; takes `app`, your framework's `Link` component
  (next/link, react-router…), and `widgetItems`/`actionItems` for the account area.
  — `src/components/navbar/navbar.tsx`
- **`NavSolidarityApps` / `NavSolidarityAppsDesktop`** — the "solidarity apps" switcher menu
  (mobile / desktop layouts). — `src/components/navbar/solidarity-apps.tsx`
- **`NavAccountWidgetItem`** — a labeled icon row used inside the navbar account widget.
  — `src/components/navbar/account-widget-item.tsx`
- **`Footer`** — site footer with social links and solidarity-tool links.
  — `src/components/footer/footer.tsx`
- **`LoginButton`** — sign-in button; renders the Privy or general-wallet variant based on
  `authProvider` from context. — `src/components/auth/login-button.tsx`

## Providers & context

- **`BreadUIKitProvider`** — see [Setup](#setup-required-first). — `src/context/lib.tsx`
- **`ConnectedUserProvider`** — see [Setup](#setup-required-first).
  — `src/components/connected-user/provider.tsx`
- **`useConnectedUser()`** — returns the connection state machine: `TUserLoading` /
  `TUserNotConnected` / `TUserConnected` (`status` is `LOADING` / `NOT_CONNECTED` /
  `CONNECTED` / `UNSUPPORTED_CHAIN`). — `src/components/connected-user/context.ts`

## Hooks

- **`useBreadBalance({ address })`** — reads the BREAD ERC-20 balance via wagmi, auto-refetches
  each block. Returns `{ BREAD, refetchBalance, isLoading }`. Requires `BreadUIKitProvider`.
  — `src/hooks/use-bread-balance.ts`
- **`useCopyToClipboard({ textToCopy })`** — returns `{ copied, copy }`; `copied` flips back
  to `false` shortly after a copy. — `src/hooks/use-copy-to-clipboard.ts`

## Utils

- **`cn(...classes)`** — combine/merge Tailwind class strings (clsx + tailwind-merge). Use
  this for all conditional `className` logic. — `src/utils/cn.ts`
- **`formatBalance(value, decimals = 2)`** — format a number with grouping and fixed decimals
  (`Intl.NumberFormat`). — `src/utils/formatter.ts`

## Exported types

`ButtonProps`, `LiftedButtonProps`, `LogoProps`, `LogoColor`, `LogoVariant`,
`TConnectedUserState`, `TUserConnected`, `TUserLoading`, `TUserNotConnected`, and the
`fontVariables` constant (the brand font CSS-variable names) are all exported from
`@breadcoop/ui` for use in consumer code.

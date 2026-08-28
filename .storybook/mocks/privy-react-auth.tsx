/**
 * Storybook-only mock of `@privy-io/react-auth`.
 *
 * The navbar components import `usePrivy` / `useWallets` unconditionally, which
 * would otherwise require a real <PrivyProvider> (and a Privy app id + network)
 * to render in Storybook. This stub provides inert values so the components can
 * render in isolation. Wired up via a Vite alias in `.storybook/main.ts`.
 */

import { ReactNode } from "react";

export const usePrivy = () => ({
	ready: true,
	authenticated: true,
	login: () => {},
	logout: () => {},
	user: null,
});

export const useWallets = () => ({ wallets: [] as unknown[] });

export const PrivyProvider = ({ children }: { children: ReactNode }) => children;

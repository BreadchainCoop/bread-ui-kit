"use client";

import { ComponentType, createContext, useContext } from "react";
import {
	LoginButtonGeneral,
	type LoginButtonProps,
} from "../auth/login-button-general";

// The auth-provider-specific pieces the Navbar needs. Each ConnectedUserProvider
// variant supplies its own, so the Navbar never imports Privy itself and a
// non-Privy app doesn't bundle it.
export type TConnectedUserAuth = {
	LoginButton: ComponentType<LoginButtonProps>;
	logout: () => void;
	resolveEns: boolean;
};

// Only reached without a ConnectedUserProvider, where the user stays LOADING:
// the login button renders its shell and logout is never shown.
export const ConnectedUserAuthContext = createContext<TConnectedUserAuth>({
	LoginButton: LoginButtonGeneral,
	logout: () => {},
	resolveEns: true,
});

export const useConnectedUserAuth = () => useContext(ConnectedUserAuthContext);

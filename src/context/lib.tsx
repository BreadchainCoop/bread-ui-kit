"use client";

import { createContext, ReactNode, useContext } from "react";
import { Abi, Address } from "viem";
import { App } from "../interface/app";

type AuthProvider = "privy" | "general";

type TokenConfig = {
	BREAD: { address: Address; abi: Abi };
};

type BreadUIKitContextType = {
	chainId: number;
	tokenConfig: TokenConfig;
	app: App;
	authProvider: AuthProvider;
};

export const BreadUIKitContext = createContext<
	BreadUIKitContextType | undefined
>(undefined);

export const BreadUIKitProvider = ({
	chainId,
	tokenConfig,
	children,
	app,
	authProvider,
}: {
	chainId: number;
	tokenConfig: TokenConfig;
	app: App;
	authProvider: AuthProvider;
	children: ReactNode;
}) => {
	return (
		<BreadUIKitContext.Provider value={{ chainId, tokenConfig, app, authProvider }}>
			{children}
		</BreadUIKitContext.Provider>
	);
};

export const useBreadUIKitContext = () => {
	const context = useContext(BreadUIKitContext);

	if (!context) {
		throw new Error(
			"useBreadUIKitContext must be used within a BreadUIKitProvider"
		);
	}

	return context;
};

// Convenience hook to get just the auth provider
export const useAuthProvider = () => {
	const context = useBreadUIKitContext();
	return context.authProvider;
};

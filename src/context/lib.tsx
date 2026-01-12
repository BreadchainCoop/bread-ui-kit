"use client";

import { createContext, useContext } from "react";
import { Abi, Address } from "viem";
import { App } from "../interface/app";

type TokenConfig = {
	BREAD: { address: Address; abi: Abi };
};

type BreadUIKitContextType = {
	isProd: boolean;
	tokenConfig: TokenConfig;
	app: App;
};

export const BreadUIKitContext = createContext<
	BreadUIKitContextType | undefined
>(undefined);

export const BreadUIKitProvider = ({
	isProd,
	tokenConfig,
	children,
	app,
}: {
	isProd: boolean;
	tokenConfig: TokenConfig;
	app: App;
	children: React.ReactNode;
}) => {
	if (isProd) {
		tokenConfig.BREAD.address =
			"0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3";
	}

	return (
		<BreadUIKitContext.Provider value={{ isProd, tokenConfig, app }}>
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

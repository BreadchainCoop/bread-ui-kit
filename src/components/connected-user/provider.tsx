"use client";

import { ReactNode } from "react";
import { useAuthProvider, useBreadUIKitContext } from "../../context/lib";
import { ConnectedUserProviderPrivy } from "./privy-provider";
import { ConnectedUserProviderGeneral } from "./provider-general";

interface IConnectedUserProviderProps {
	children: ReactNode;
}

export function ConnectedUserProvider({ children }: IConnectedUserProviderProps) {
	const authProvider = useAuthProvider();
	const { chainId } = useBreadUIKitContext();

	const Provider =
		authProvider === "privy"
			? ConnectedUserProviderPrivy
			: ConnectedUserProviderGeneral;

	return (
		<Provider chainId={chainId}>
			{children}
		</Provider>
	);
}

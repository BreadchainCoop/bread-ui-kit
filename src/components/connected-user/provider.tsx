"use client";

import { ReactNode } from "react";
import { useAuthProvider } from "../../context/lib";
import { ConnectedUserProviderPrivy } from "./privy-provider";
import { ConnectedUserProviderGeneral } from "./provider-general";

interface IConnectedUserProviderProps {
	children: ReactNode;
}

/**
 * @deprecated Statically imports both variants, so every app bundles
 * `@privy-io/react-auth`. Use `ConnectedUserProviderGeneral` from
 * `@breadcoop/ui`, or `ConnectedUserProviderPrivy` from `@breadcoop/ui/privy`.
 */
export function ConnectedUserProvider({ children }: IConnectedUserProviderProps) {
	const authProvider = useAuthProvider();

	const Provider =
		authProvider === "privy"
			? ConnectedUserProviderPrivy
			: ConnectedUserProviderGeneral;

	return (
		<Provider>
			{children}
		</Provider>
	);
}

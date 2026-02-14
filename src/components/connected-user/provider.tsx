"use client";

import { ReactNode } from "react";
import { useAuthProvider } from "../../context/lib";
import { ConnectedUserProviderPrivy } from "./privy-provider";
import { ConnectedUserProviderGeneral } from "./provider-general";

interface IConnectedUserProviderProps {
	children: ReactNode;
	isProd: boolean;
}

export function ConnectedUserProvider({
	isProd,
	children,
}: IConnectedUserProviderProps) {
	const authProvider = useAuthProvider();

	const Provider =
		authProvider === "privy"
			? ConnectedUserProviderPrivy
			: ConnectedUserProviderGeneral;

	return <Provider isProd={isProd}>{children}</Provider>;
}

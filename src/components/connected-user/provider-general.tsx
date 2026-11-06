"use client";

import { ReactNode, useMemo } from "react";
import { TConnectedUserState, TUserConnected } from "./interface";
import { useAccount, useChains, useDisconnect } from "wagmi";
import { useAutoConnect } from "../../hooks/use-auto-connect";
import { useBreadUIKitContext } from "../../context/lib";
import { LoginButtonGeneral } from "../auth/login-button-general";
import { ConnectedUserContext } from "./context";
import { ConnectedUserAuthContext, TConnectedUserAuth } from "./auth-context";

interface IConnectedUserProviderGeneralProps {
	children: ReactNode;
}

/**
 * Wallet/user state for apps using RainbowKit + wagmi. Imports nothing from
 * Privy, so apps that render it never bundle `@privy-io/react-auth`.
 * Nest inside `BreadUIKitProvider`.
 */
export function ConnectedUserProviderGeneral({ children }: IConnectedUserProviderGeneralProps) {
	const { chainId } = useBreadUIKitContext();
	const { isConnected, connector, address, status, chain } = useAccount();
	const { disconnect } = useDisconnect();
	const { isSafe } = useAutoConnect(connector);
	const configuredChains = useChains();

	const defaultChain = useMemo(
		() => configuredChains.find(c => c.id === chainId) ?? configuredChains[0],
		[configuredChains, chainId]
	);

	const user = useMemo<TConnectedUserState>(() => {
		if (status === "connecting" && !address) {
			return { status: "LOADING" };
		}

		if (status === "disconnected" || !isConnected || !address) {
			return { status: "NOT_CONNECTED" };
		}

		const _status: TUserConnected["status"] =
			chain?.id === chainId ? "CONNECTED" : "UNSUPPORTED_CHAIN";

		return {
			status: _status,
			address,
			chain: chain ?? defaultChain,
		};
	}, [isConnected, address, chain, status, chainId, defaultChain]);

	const value = useMemo(() => ({ user, isSafe }), [user, isSafe]);

	const auth = useMemo<TConnectedUserAuth>(
		() => ({
			LoginButton: LoginButtonGeneral,
			logout: () => disconnect(),
			resolveEns: true,
		}),
		[disconnect]
	);

	return (
		<ConnectedUserContext.Provider value={value}>
			<ConnectedUserAuthContext.Provider value={auth}>
				{children}
			</ConnectedUserAuthContext.Provider>
		</ConnectedUserContext.Provider>
	);
}

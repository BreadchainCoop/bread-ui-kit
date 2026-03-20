"use client";

import { ReactNode, useMemo } from "react";
import { TConnectedUserState, TUserConnected } from "./interface";
import { useAccount, useChains } from "wagmi";
import { useAutoConnect } from "../../hooks/use-auto-connect";
import { ConnectedUserContext } from "./context";

interface IConnectedUserProviderGeneralProps {
	children: ReactNode;
	chainId: number;
}

export function ConnectedUserProviderGeneral({ chainId, children }: IConnectedUserProviderGeneralProps) {
	const { isConnected, connector, address, status, chain } = useAccount();
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

	return (
		<ConnectedUserContext.Provider value={value}>
			{children}
		</ConnectedUserContext.Provider>
	);
}

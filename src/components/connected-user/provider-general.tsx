"use client";

import { ReactNode, useMemo } from "react";
import { TConnectedUserState, TUserConnected } from "./interface";
import { useAccount } from "wagmi";
import { useAutoConnect } from "../../hooks/use-auto-connect";
import { anvil, gnosis } from "viem/chains";
import { ConnectedUserContext } from "./context";

interface IConnectedUserProviderGeneralProps {
	children: ReactNode;
	isProd: boolean;
}

export function ConnectedUserProviderGeneral({ isProd, children }: IConnectedUserProviderGeneralProps) {
	const { isConnected, connector, address, status, chain } = useAccount();
	const { isSafe } = useAutoConnect(connector);

	const user = useMemo<TConnectedUserState>(() => {
		if (status === "connecting" && !address) {
			return { status: "LOADING" };
		}

		if (status === "disconnected" || !isConnected || !address) {
			return { status: "NOT_CONNECTED" };
		}

		let _staus: TUserConnected["status"] = "CONNECTED";
		if (isProd) {
			_staus =
				chain?.id === gnosis.id ? "CONNECTED" : "UNSUPPORTED_CHAIN";
		} else {
			_staus = chain?.id === anvil.id ? "CONNECTED" : "UNSUPPORTED_CHAIN";
		}

		return {
			status: _staus,
			address,
			chain: chain || (isProd ? gnosis : anvil),
		};
	}, [isConnected, address, chain, status]);

	const value = useMemo(() => ({ user, isSafe }), [user, isSafe]);

	return (
		<ConnectedUserContext.Provider value={value}>
			{children}
		</ConnectedUserContext.Provider>
	);
}

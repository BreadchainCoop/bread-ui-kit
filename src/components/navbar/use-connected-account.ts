"use client";

import { useMemo } from "react";
import { useAccount, useEnsName } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { type Address } from "viem";
import { useConnectedUser } from "../connected-user";
import { useAuthProvider } from "../../context/lib";

/**
 * Resolves the connected user, wallet address, and ENS result for the current
 * auth provider (Privy embedded wallet or general/wagmi). Shared by the desktop
 * account chip and the mobile account card so the resolution lives in one place.
 */
export const useConnectedAccount = () => {
	const { user } = useConnectedUser();
	const authProvider = useAuthProvider();

	const { address: wagmiAddress } = useAccount();
	const wagmiEnsName = useEnsName({
		address: wagmiAddress,
		query: { enabled: Boolean(wagmiAddress) && authProvider === "general" },
	});

	const { ready: privyReady } = usePrivy();
	const { wallets } = useWallets();

	const { address, ensNameResult } = useMemo(() => {
		if (authProvider === "privy") {
			const activeWallet = wallets.find(
				(wallet) =>
					wallet.walletClientType === "privy" ||
					wallet.walletClientType === "embedded_wallet" ||
					wallet.walletClientType?.includes("embedded"),
			);

			return {
				address: activeWallet?.address as Address | undefined,
				ensNameResult: {
					data: undefined,
					isLoading: !privyReady,
					isError: false,
				},
			};
		}

		return {
			address: wagmiAddress,
			ensNameResult: wagmiEnsName,
		};
	}, [authProvider, wallets, privyReady, wagmiAddress, wagmiEnsName]);

	return { user, address, ensNameResult };
};

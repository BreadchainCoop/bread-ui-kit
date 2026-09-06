"use client";

import { ReactNode, useMemo } from "react";
import { type Hex } from "viem";
import { useChains } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { TConnectedUserState, TUserConnected } from ".";
import { ConnectedUserContext } from "./context";

interface IConnectedUserProviderPrivyProps {
  children: ReactNode;
  chainId: number;
}

export function ConnectedUserProviderPrivy({
  chainId,
  children,
}: IConnectedUserProviderPrivyProps) {
  const { ready, authenticated, user: privyUser } = usePrivy();
  const { wallets } = useWallets();
  const configuredChains = useChains();

  const accountAddress = privyUser?.wallet?.address;

  const connectedWallet = useMemo(
    () =>
      accountAddress
        ? wallets.find(
            (w) => w.address.toLowerCase() === accountAddress.toLowerCase(),
          )
        : undefined,
    [wallets, accountAddress],
  );

  const defaultChain = useMemo(
    () => configuredChains.find((c) => c.id === chainId) ?? configuredChains[0],
    [configuredChains, chainId],
  );

  const user = useMemo<TConnectedUserState>(() => {
    if (!ready) return { status: "LOADING" };

    if (!authenticated || !accountAddress) {
      return { status: "NOT_CONNECTED" };
    }

    // The wallet Privy last knew about is no longer in the connected list
    // (e.g. the user disconnected it from the wallet's own UI rather than
    // logging out of Privy) - there's nothing to switch a chain on, so this
    // reads as disconnected, not as an unsupported chain.
    if (!connectedWallet) {
      return { status: "NOT_CONNECTED" };
    }

    const address = accountAddress as Hex;
    const walletChainId = connectedWallet?.chainId;
    const parsedChainId = walletChainId
      ? parseInt(walletChainId.split(":")[1])
      : undefined;

    const _status: TUserConnected["status"] =
      parsedChainId === chainId ? "CONNECTED" : "UNSUPPORTED_CHAIN";

    const chain =
      configuredChains.find((c) => c.id === parsedChainId) ?? defaultChain;

    return {
      status: _status,
      address,
      chain,
    };
  }, [
    ready,
    authenticated,
    accountAddress,
    connectedWallet,
    chainId,
    configuredChains,
    defaultChain,
  ]);

  const isSafe = useMemo(() => {
    return connectedWallet?.walletClientType === "safe" || false;
  }, [connectedWallet]);

  const value = useMemo(() => ({ user, isSafe }), [user, isSafe]);

  return (
    <ConnectedUserContext.Provider value={value}>
      {children}
    </ConnectedUserContext.Provider>
  );
}

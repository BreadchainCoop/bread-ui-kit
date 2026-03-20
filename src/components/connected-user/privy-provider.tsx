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
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const configuredChains = useChains();

  const defaultChain = useMemo(
    () => configuredChains.find(c => c.id === chainId) ?? configuredChains[0],
    [configuredChains, chainId]
  );

  const embeddedWallet = useMemo(() => {
    return wallets.find(
      (wallet) =>
        wallet.walletClientType === "privy" ||
        wallet.walletClientType === "embedded_wallet" ||
        wallet.walletClientType?.includes("embedded")
    );
  }, [wallets]);

  const user = useMemo<TConnectedUserState>(() => {
    if (!ready) return { status: "LOADING" };

    if (!authenticated || !embeddedWallet?.address) {
      return { status: "NOT_CONNECTED" };
    }

    const address = embeddedWallet.address as Hex;
    const walletChainId = embeddedWallet.chainId;
    const parsedChainId = walletChainId ? parseInt(walletChainId.split(":")[1]) : undefined;

    const _status: TUserConnected["status"] =
      parsedChainId === chainId ? "CONNECTED" : "UNSUPPORTED_CHAIN";

    const chain =
      configuredChains.find(c => c.id === parsedChainId) ?? defaultChain;

    return {
      status: _status,
      address,
      chain,
    };
  }, [ready, authenticated, embeddedWallet, chainId, configuredChains, defaultChain]);

  // Embedded wallets are never Safe wallets
  const isSafe = useMemo(() => {
    return embeddedWallet?.walletClientType === "safe" || false;
  }, [embeddedWallet]);

  const value = useMemo(() => ({ user, isSafe }), [user, isSafe]);

  return (
    <ConnectedUserContext.Provider value={value}>
      {children}
    </ConnectedUserContext.Provider>
  );
}

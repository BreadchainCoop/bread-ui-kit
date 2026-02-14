"use client";

import { ReactNode, useMemo } from "react";
import { anvil, gnosis } from "viem/chains";
import { type Hex } from "viem";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { TConnectedUserState, TUserConnected } from ".";
import { ConnectedUserContext } from "./context";

interface IConnectedUserProviderPrivyProps {
  children: ReactNode;
  isProd: boolean;
}

export function ConnectedUserProviderPrivy({
  isProd,
  children,
}: IConnectedUserProviderPrivyProps) {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();

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
    const chainId = embeddedWallet.chainId;

    const parsedChainId = chainId ? parseInt(chainId.split(":")[1]) : undefined;

    let _status: TUserConnected["status"] = "CONNECTED";
    if (isProd) {
      _status = parsedChainId === gnosis.id ? "CONNECTED" : "UNSUPPORTED_CHAIN";
    } else {
      _status = parsedChainId === anvil.id ? "CONNECTED" : "UNSUPPORTED_CHAIN";
    }

    const chain = isProd ? gnosis : anvil;

    return {
      status: _status,
      address,
      chain,
    };
  }, [ready, authenticated, embeddedWallet, isProd]);

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

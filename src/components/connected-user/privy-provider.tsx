"use client";

import { ReactNode, useMemo } from "react";
import { type Hex } from "viem";
import { useChains } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { TConnectedUserState, TUserConnected } from ".";
import { useBreadUIKitContext } from "../../context/lib";
import { LoginButtonPrivy } from "../auth/login-button-privy";
import { ConnectedUserContext } from "./context";
import { ConnectedUserAuthContext, TConnectedUserAuth } from "./auth-context";

interface IConnectedUserProviderPrivyProps {
  children: ReactNode;
}

/**
 * Wallet/user state for apps using Privy. Must be mounted inside Privy's
 * `PrivyProvider` and `BreadUIKitProvider`.
 */
export function ConnectedUserProviderPrivy({
  children,
}: IConnectedUserProviderPrivyProps) {
  const { chainId } = useBreadUIKitContext();
  const { ready, authenticated, user: privyUser, logout } = usePrivy();
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

  // Privy wallets don't resolve an ENS name in the Navbar.
  const auth = useMemo<TConnectedUserAuth>(
    () => ({
      LoginButton: LoginButtonPrivy,
      logout: () => {
        logout();
      },
      resolveEns: false,
    }),
    [logout],
  );

  return (
    <ConnectedUserContext.Provider value={value}>
      <ConnectedUserAuthContext.Provider value={auth}>
        {children}
      </ConnectedUserAuthContext.Provider>
    </ConnectedUserContext.Provider>
  );
}

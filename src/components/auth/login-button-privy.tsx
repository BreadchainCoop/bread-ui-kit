"use client";

import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { ReactNode } from "react";
import LiftedButton from "../LiftedButton/LiftedButton";
import { ButtonShell } from "./button-shell";
import { App } from "../../interface/app";
import { useBreadUIKitContext } from "../../context/lib";

export interface LoginButtonPrivyProps {
	app: App;
	status: "CONNECTED" | "LOADING" | "UNSUPPORTED_CHAIN" | "NOT_CONNECTED";
	label?: string;
	rightIcon?: ReactNode;
}

export const LoginButtonPrivy = ({
	app,
	status,
	label = "Sign In",
	rightIcon,
}: LoginButtonPrivyProps) => {
	const { chainId } = useBreadUIKitContext();

	const className =
		app === "fund"
			? "bg-primary-orange"
			: app === "stacks"
				? "bg-primary-blue"
				: "bg-primary-jade";

	const { login, ready, user: privyUser } = usePrivy();
	const { wallets } = useWallets();

	if (status === "CONNECTED") return null;

	if (status === "LOADING" || !ready) return <ButtonShell />;

	if (status === "UNSUPPORTED_CHAIN") {
		// Must match how ConnectedUserProviderPrivy resolves the active wallet
		// (privyUser.wallet.address, not wallets[0]) — wallets[] can list more
		// than the one actually connected, e.g. once an app links an external
		// wallet alongside an embedded one, and wallets[0] isn't guaranteed to
		// be either of those in a stable order.
		const accountAddress = privyUser?.wallet?.address;
		const activeWallet = accountAddress
			? wallets.find(
					(w) => w.address.toLowerCase() === accountAddress.toLowerCase(),
				)
			: undefined;

		return (
			<SwitchNetwork
				activeWallet={activeWallet}
				chainId={chainId}
				className={className}
			/>
		);
	}

	return (
		<div className="[&>*]:w-full">
			<LiftedButton
				onClick={login}
				rightIcon={rightIcon}
				className={`w-full ${className}`}
			>
				{label}
			</LiftedButton>
		</div>
	);
};

function SwitchNetwork({
	activeWallet,
	chainId,
	className,
}: {
	activeWallet: ConnectedWallet | undefined;
	chainId: number;
	className?: string;
}) {
	return (
		<div className="[&>*]:w-full">
			<LiftedButton
				onClick={async () => {
					if (!activeWallet) return;

					try {
						await activeWallet.switchChain(chainId);
					} catch (error) {
						console.error("Failed to switch chain:", error);
					}
				}}
				className={`w-full ${className}`}
			>
				Change network
			</LiftedButton>
		</div>
	);
}

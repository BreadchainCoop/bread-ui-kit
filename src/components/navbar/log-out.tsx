"use client";

import { SignOutIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useDisconnect } from "wagmi";
import LiftedButton from "../LiftedButton/LiftedButton";

const LogoutButton = ({ className }: { className?: string }) => {
	const { disconnect } = useDisconnect();

	return (
		<div className={clsx("lifted-button-container", className)}>
			<LiftedButton
				preset="burn"
				rightIcon={<SignOutIcon />}
				onClick={() => disconnect()}
			>
				Sign out
			</LiftedButton>
		</div>
	);
};

export default LogoutButton;

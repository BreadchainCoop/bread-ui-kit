"use client";

import { SignOutIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import LiftedButton from "../LiftedButton/LiftedButton";
import { useConnectedUserAuth } from "../connected-user/auth-context";

const LogoutButton = ({ className }: { className?: string }) => {
	const { logout } = useConnectedUserAuth();

	return (
		<div className={clsx("lifted-button-container", className)}>
			<LiftedButton
				preset="burn"
				rightIcon={<SignOutIcon />}
				onClick={logout}
			>
				Sign out
			</LiftedButton>
		</div>
	);
};

export default LogoutButton;

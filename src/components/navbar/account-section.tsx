"use client";

import { App } from "../../interface/app";
import { LoginButton } from "../auth";
import AccountMenu from "./account-menu";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr";
import { NavAccountDetailsProps } from "./account-widget";
import { useConnectedAccount } from "./use-connected-account";
import { type ReactNode } from "react";

interface AccountSectionProps extends Pick<
	NavAccountDetailsProps,
	"widgetItems" | "actionItems"
> {
	app: App;
	depositSlot?: ReactNode;
}

const AccountSection = ({ app, widgetItems, actionItems, depositSlot }: AccountSectionProps) => {
	const { user, address, ensNameResult } = useConnectedAccount();

	if (user.status === "CONNECTED" && address) {
		return (
			<AccountMenu
				widgetItems={widgetItems}
				actionItems={actionItems}
				depositSlot={depositSlot}
				userAddress={address}
				ensNameResult={ensNameResult}
				app={app}
			/>
		);
	}

	return (
		<div className="mt-6 md:mt-0">
			<LoginButton
				app={app}
				status={user.status}
				rightIcon={<SignInIcon size={24} />}
			/>
		</div>
	);
};

export default AccountSection;

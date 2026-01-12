"use client";

import { useAccount, useEnsName } from "wagmi";
import { App } from "../../interface/app";
import { LoginButton } from "../auth";
import { useConnectedUser } from "../connected-user";
import AccountMenu from "./account-menu";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr";
import { NavAccountDetailsProps } from "./account-widget";

interface AccountSectionProps
	extends Pick<NavAccountDetailsProps, "widgetItems"> {
	app: App;
}

const AccountSection = ({ app, widgetItems }: AccountSectionProps) => {
	const { user } = useConnectedUser();
	const { address } = useAccount();
	const ensNameResult = useEnsName({
		address,
		query: { enabled: Boolean(address) },
	});

	if (user.status === "CONNECTED") {
		return (
			<AccountMenu
				widgetItems={widgetItems}
				userAddress={user.address}
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

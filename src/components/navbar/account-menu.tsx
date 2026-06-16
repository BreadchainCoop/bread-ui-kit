"use client";

import { ReactNode } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { type Address } from "viem";
import { blo } from "blo";
import clsx from "clsx";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Body } from "../typography/Typography";
import { truncateAddress } from "../../utils/truncate-address";
import { appsConfig } from "../../utils/app";
import { useBreadBalance } from "../../hooks/use-bread-balance";
import { App } from "../../interface/app";
import NavAccountDetails, { NavAccountDetailsProps } from "./account-widget";

export interface AccountMenuProps
	extends Pick<
		NavAccountDetailsProps,
		"widgetItems" | "ensNameResult" | "actionItems"
	> {
	userAddress: Address;
	app: App;
	/**
	 * App-injected deposit action (e.g. <NavDepositButton onClick={...} />).
	 * Rendered between the balance chip and the account dropdown trigger.
	 */
	depositSlot?: ReactNode;
}

const AccountMenu = ({
	userAddress,
	ensNameResult,
	app,
	widgetItems,
	actionItems,
	depositSlot,
}: AccountMenuProps) => {
	const { BREAD } = useBreadBalance({ address: userAddress });
	const [balInt, balDec] = (BREAD || "0.00").split(".");
	const avatar = blo(userAddress as `0x${string}`);

	return (
		<NavigationMenu.Root className="relative">
			<NavigationMenu.List>
				<NavigationMenu.Item>
					{/* New account widget — balance chip · deposit · avatar · address */}
					<div className="flex items-center gap-2.5 bg-paper-main border border-surface-ink overflow-hidden p-2">
						{/* Balance chip */}
						<div className="flex items-center bg-paper-main border border-surface-grey overflow-hidden px-2 py-1">
							<Body
								bold
								className="text-surface-ink whitespace-nowrap leading-none"
							>
								<span className="text-base">${balInt}</span>
								<span className="text-xs">.{balDec}</span>
							</Body>
						</div>

						{/* App-injected deposit action */}
						{depositSlot}

						{/* Divider */}
						<div className="h-7 w-px bg-surface-grey/40 shrink-0" />

						{/* Account trigger — opens the dropdown */}
						<NavigationMenu.Trigger className="group flex items-center gap-2.5">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={avatar}
								alt=""
								className="shrink-0 size-6 rounded-full"
							/>
							<Body
								bold
								className="text-surface-ink whitespace-nowrap leading-none"
							>
								{ensNameResult.data ||
									truncateAddress(userAddress || "")}
							</Body>
							<span
								className={clsx("shrink-0", appsConfig[app].text)}
							>
								<CaretDownIcon size={24} />
							</span>
						</NavigationMenu.Trigger>
					</div>

					<NavigationMenu.Content className="w-max">
						<NavAccountDetails
							className="border w-full md:w-screen md:max-w-110.75 md:bg-paper-main md:border-paper-2"
							userAddress={userAddress}
							ensNameResult={ensNameResult}
							app={app}
							widgetItems={widgetItems}
							actionItems={actionItems}
						/>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
			<NavigationMenu.Viewport className="nav-account-menu absolute top-14 right-0 z-20 left-0 md:left-auto" />
		</NavigationMenu.Root>
	);
};

export default AccountMenu;

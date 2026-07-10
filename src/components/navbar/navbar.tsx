import { AnchorHTMLAttributes, ComponentType, ReactNode } from "react";
import { NavSolidarityApps, NavSolidarityAppsDesktop } from "./solidarity-apps";
import { App } from "../../interface/app";
import { Logo, LogoProps } from "../Logo";
import { appsConfig } from "../../utils/app";
import AccountSection from "./account-section";
import { NavAccountDetailsProps } from "./account-widget";
import { NavbarMenu } from "./navbar-menu";
import MobileAccountCardSection from "./mobile-account-card-section";
import MobileSignOut from "./mobile-sign-out";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
	children?: React.ReactNode;
};

interface NavbarProps extends Pick<
	NavAccountDetailsProps,
	"widgetItems" | "actionItems"
> {
	app: App;
	children: ReactNode;
	className?: string;
	/**
	 * App-injected deposit action shown in the account widget (e.g.
	 * <NavDepositButton app="fund" onClick={...} />). Each app wires its own
	 * deposit/fund flow.
	 */
	depositSlot?: ReactNode;
	/**
	 * Mobile account card actions (Bread DS V1.1). The kit renders the card;
	 * the app wires the flows. Deposit / Withdraw open the app's fund / withdraw
	 * flows; `claimable` shows the claim row when the user has a claimable amount.
	 */
	onDeposit?: () => void;
	onWithdraw?: () => void;
	claimable?: { amount: string; onClaim: () => void };
	/**
	 * The link component of your framework (next/link, react-router-dom Link, etc).
	 * Must accept `href`.
	 */
	Link: ComponentType<LinkProps>;
}

export function Navbar({
	app,
	children,
	className = "",
	widgetItems,
	actionItems,
	depositSlot,
	onDeposit,
	onWithdraw,
	claimable,
	Link,
}: NavbarProps) {
	const appConfig = appsConfig[app];
	const logoColor: LogoProps["color"] =
		app === "net" ? "jade" : app === "stacks" ? "blue" : "orange";
	const logoText =
		app === "net"
			? "Safety Net"
			: app === "stacks"
				? "Stacks"
				: "Solidarity fund";

	return (
		<div
			className={`relative py-2.5 flex items-center justify-between ${className}`}
		>
			<Link href="/">
				<Logo size={24} color={logoColor} className="md:hidden" />
				<span className="hidden md:block lg:text-2xl">
					<Logo text="BREAD" size={24} color={logoColor} />
				</span>
			</Link>
			<NavSolidarityAppsDesktop app={app} label={logoText} />
			<NavbarMenu
				textClassName={appConfig.text}
				mobileHeader={
					<Link href="/">
						<Logo color={logoColor} text={logoText} />
					</Link>
				}
				mobileTop={
					<MobileAccountCardSection
						onDeposit={onDeposit}
						onWithdraw={onWithdraw}
						claimable={claimable}
					/>
				}
				footer={
					<>
						<NavSolidarityApps
							collapsible
							showSelected
							rearranged
							current={app}
							className="mt-6 md:hidden"
						/>
						<MobileSignOut />
						<AccountSection
							app={app}
							widgetItems={widgetItems}
							actionItems={actionItems}
							depositSlot={depositSlot}
						/>
					</>
				}
			>
				{children}
			</NavbarMenu>
		</div>
	);
}

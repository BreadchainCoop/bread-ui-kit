"use client";

import AccountCardMobile from "./account-card-mobile";
import { useConnectedAccount } from "./use-connected-account";

interface MobileAccountCardSectionProps {
	onDeposit?: () => void;
	onWithdraw?: () => void;
	claimable?: { amount: string; onClaim: () => void };
}

/**
 * Renders the connected account card at the top of the mobile menu (md:hidden).
 * When not connected it renders nothing — the mobile Sign In lives at the bottom
 * of the menu (via AccountSection).
 */
const MobileAccountCardSection = ({
	onDeposit,
	onWithdraw,
	claimable,
}: MobileAccountCardSectionProps) => {
	const { user, address, ensNameResult } = useConnectedAccount();

	if (!(user.status === "CONNECTED" && address)) return null;

	return (
		<div className="md:hidden">
			<AccountCardMobile
				userAddress={address}
				ensName={ensNameResult.data ?? undefined}
				onDeposit={onDeposit}
				onWithdraw={onWithdraw}
				claimable={claimable}
			/>
		</div>
	);
};

export default MobileAccountCardSection;

"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { blo } from "blo";
import clsx from "clsx";
import { ReactNode } from "react";
import { Address } from "viem";
import { useBreadBalance } from "../../hooks/use-bread-balance";
import { useConnectedUser } from "../connected-user";
import { truncateAddress } from "../../utils/truncate-address";
import { CopyButtonIcon } from "../buttons";
import { Logo } from "../Logo";

export interface AccountCardMobileProps {
	userAddress: Address;
	ensName?: string;
	/** Wallet deposit / fund flow (opens the app's fund modal). */
	onDeposit?: () => void;
	/** Wallet withdraw flow. */
	onWithdraw?: () => void;
	/**
	 * Claimable row. When omitted, the row is hidden. `amount` is the
	 * pre-formatted claimable balance (e.g. "1,000.00").
	 */
	claimable?: { amount: string; onClaim: () => void };
	className?: string;
}

/** Small outline button used inside the card (Deposit / Withdraw / Claim). */
const CardButton = ({
	tone,
	onClick,
	className,
	children,
}: {
	tone: "blue" | "ink";
	onClick?: () => void;
	className?: string;
	children: ReactNode;
}) => (
	<button
		type="button"
		onClick={onClick}
		className={clsx(
			"flex items-center justify-center bg-paper-main border px-4 py-1 text-base font-bold leading-normal shadow-[2px_2px_0px_0px_#595959] transition-all duration-200 active:shadow-none",
			tone === "blue"
				? "border-primary-blue text-primary-blue"
				: "border-surface-ink text-surface-ink",
			className,
		)}
	>
		{children}
	</button>
);

/**
 * The connected account card shown at the top of the mobile menu.
 * Matches Bread DS V1.1 node 727-3622: address row (copy + explorer), balance,
 * Deposit / Withdraw, and a claim row. Sign out lives at the bottom of the menu,
 * not in this card.
 */
const AccountCardMobile = ({
	userAddress,
	ensName,
	onDeposit,
	onWithdraw,
	claimable,
	className,
}: AccountCardMobileProps) => {
	const { BREAD } = useBreadBalance({ address: userAddress });
	const [balInt, balDec] = (BREAD || "0.00").split(".");
	const { user } = useConnectedUser();
	const avatar = blo(userAddress as `0x${string}`);

	const chain =
		user.status === "CONNECTED" || user.status === "UNSUPPORTED_CHAIN"
			? user.chain
			: undefined;
	const explorer = `${chain?.blockExplorers?.default.url ?? "https://gnosisscan.io"}/address/${userAddress}`;

	return (
		<div
			className={clsx(
				"flex w-full flex-col border-[1.8px] border-surface-grey bg-paper-main",
				className,
			)}
		>
			{/* Address row */}
			<div className="flex items-center justify-center gap-4 border-b-[1.8px] border-surface-grey py-2">
					<img
					src={avatar}
					alt=""
					className="size-6 shrink-0 rounded-full"
				/>
				<span className="text-base font-bold leading-normal text-surface-ink">
					{ensName || truncateAddress(userAddress || "")}
				</span>
				<div className="flex items-center gap-3">
					<CopyButtonIcon textToCopy={ensName || userAddress} />
					<a
						href={explorer}
						target="_blank"
						rel="noopener noreferrer"
						className="text-surface-ink"
						aria-label="View on block explorer"
					>
						<ArrowUpRightIcon size={24} />
					</a>
				</div>
			</div>

			{/* Balance + actions */}
			<div className="flex flex-col items-center gap-[1.125rem] px-[0.9rem] py-2">
				<p className="font-bold leading-none text-surface-ink">
					<span className="text-[1.8rem]">${balInt}</span>
					<span className="text-[1.35rem]">.{balDec}</span>
				</p>

				<div className="flex w-full gap-4">
					<CardButton
						tone="blue"
						onClick={onDeposit}
						className="flex-1"
					>
						Deposit
					</CardButton>
					<CardButton
						tone="ink"
						onClick={onWithdraw}
						className="flex-1"
					>
						Withdraw
					</CardButton>
				</div>

				{claimable && (
					<div className="flex w-full items-center justify-between border border-surface-ink px-2.5 py-[0.3125rem]">
						<div className="flex items-center gap-2">
							<Logo size={24} color="orange" />
							<span className="text-base font-bold leading-normal text-system-green">
								{claimable.amount}
							</span>
						</div>
						<CardButton tone="blue" onClick={claimable.onClaim}>
							Claim
						</CardButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default AccountCardMobile;

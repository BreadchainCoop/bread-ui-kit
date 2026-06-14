"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { ButtonHTMLAttributes } from "react";
import {
	useCopyToClipboard,
	UseCopyToClipboardPayload,
} from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../utils";
import { useBreadUIKitContext } from "../../context/lib";
import { appsConfig } from "../../utils/app";

interface CopyButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>, UseCopyToClipboardPayload {
	checkedIconSize?: number;
}

const CopyButtonIcon = ({
	children,
	textToCopy,
	checkedIconSize = 24,
	...buttonProps
}: CopyButtonProps) => {
	const { copied, copy } = useCopyToClipboard({
		textToCopy,
	});
	const app = useBreadUIKitContext().app;

	return (
		<button
			{...buttonProps}
			onClick={copy}
			className={cn(
				buttonProps.className,
				copied ? "text-system-green!" : appsConfig[app].text,
			)}
		>
			{copied ? (
				<CheckIcon size={checkedIconSize} className="" />
			) : (
				<CopyIcon size={24} className="fill-current" />
			)}
		</button>
	);
};

export default CopyButtonIcon;

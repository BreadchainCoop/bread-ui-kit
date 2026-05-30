"use client";

import { useEffect, useState } from "react";
import { copyToClipboard } from "../utils/copy-to-clipboard";

export interface UseCopyToClipboardPayload {
	textToCopy: string;
}

export const useCopyToClipboard = ({
	textToCopy,
}: UseCopyToClipboardPayload) => {
	const [copied, setCopied] = useState(false);
	const timer: NodeJS.Timeout | undefined = undefined;

	const copy = async () => {
		await copyToClipboard(textToCopy);

		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 500);
	};

	useEffect(() => {
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, []);

	return { copied, copy };
};

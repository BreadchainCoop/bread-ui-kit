export const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		// clipboard unavailable / permission denied — ignore
	}
};

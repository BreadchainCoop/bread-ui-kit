import { Address, erc20Abi, formatUnits } from "viem";
import { useBlock, useReadContract } from "wagmi";
import { useBreadUIKitContext } from "../context/lib";
import { useEffect, useMemo } from "react";

export const useBreadBalance = ({ address }: { address: Address }) => {
	const { tokenConfig, chainId } = useBreadUIKitContext();

	const { data: blockNumber } = useBlock({ watch: true, chainId });
	const {
		data: balance,
		refetch: refetchBalance,
		isLoading,
	} = useReadContract({
		address: tokenConfig.BREAD.address,
		abi: tokenConfig.BREAD.abi as typeof erc20Abi,
		functionName: "balanceOf",
		args: [address],
		chainId,
	});

	useEffect(() => {
		refetchBalance();
	}, [blockNumber]);

	const BREAD = useMemo(() => {
		if (!balance) return "0.00";

		return formatUnits(balance, 18);
	}, [balance]);

	return { BREAD, refetchBalance, isLoading };
};

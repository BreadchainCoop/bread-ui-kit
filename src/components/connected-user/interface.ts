import { type Hex, type Chain } from "viem";

export type TUserLoading = { status: "LOADING" };

export type TUserNotConnected = { status: "NOT_CONNECTED" };

export type TUserConnected = {
	status: "CONNECTED" | "UNSUPPORTED_CHAIN";
	address: Hex;
	chain: Chain;
};

export type TConnectedUserState =
	| TUserLoading
	| TUserNotConnected
	| TUserConnected;

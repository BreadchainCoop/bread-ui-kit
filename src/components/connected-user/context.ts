"use client";

import { createContext, useContext } from "react";
import { TConnectedUserState } from "./interface";

export const ConnectedUserContext = createContext<{
	user: TConnectedUserState;
	isSafe: boolean;
}>({
	user: {
		status: "LOADING",
	},
	isSafe: false,
});

const useConnectedUser = () => {
	const context = useContext(ConnectedUserContext);

	if (context === undefined) {
		throw new Error(
			"useConnectedUser must be used within a ConnectedUserProvider"
		);
	}

	return context;
};

export { useConnectedUser };

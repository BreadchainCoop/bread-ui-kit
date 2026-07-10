"use client";

import { useConnectedUser } from "../connected-user";
import LogoutButton from "./log-out";

/**
 * Sign out button at the bottom of the mobile menu (md:hidden), shown only when
 * connected. Sign out lives here rather than inside the account card, per the
 * mobile menu design.
 */
const MobileSignOut = () => {
	const { user } = useConnectedUser();

	if (user.status !== "CONNECTED") return null;

	return <LogoutButton className="md:hidden mt-2" />;
};

export default MobileSignOut;

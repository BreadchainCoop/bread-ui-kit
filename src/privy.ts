// Privy-specific entry point (`@breadcoop/ui/privy`). Kept out of the root
// barrel so apps that don't use Privy never bundle `@privy-io/react-auth`.
// Everything else (useConnectedUser, Navbar, …) still comes from `@breadcoop/ui`.

export { LoginButtonPrivy } from "./components/auth/login-button-privy";
export { ConnectedUserProviderPrivy } from "./components/connected-user/privy-provider";

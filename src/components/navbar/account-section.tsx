"use client";

import { useEnsName } from "wagmi";
import { App } from "../../interface/app";
import { useConnectedUser } from "../connected-user/context";
import { useConnectedUserAuth } from "../connected-user/auth-context";
import AccountMenu from "./account-menu";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr";
import { NavAccountDetailsProps } from "./account-widget";

interface AccountSectionProps extends Pick<
  NavAccountDetailsProps,
  "widgetItems" | "actionItems"
> {
  app: App;
}

const AccountSection = ({
  app,
  widgetItems,
  actionItems,
}: AccountSectionProps) => {
  const { user } = useConnectedUser();
  const { LoginButton, resolveEns } = useConnectedUserAuth();

  const address = "address" in user ? user.address : undefined;
  const wagmiEnsName = useEnsName({
    address,
    query: { enabled: Boolean(address) && resolveEns },
  });
  const ensNameResult = resolveEns
    ? wagmiEnsName
    : { data: undefined, isLoading: false, isError: false };

  if (user.status === "CONNECTED" && address) {
    return (
      <AccountMenu
        widgetItems={widgetItems}
        actionItems={actionItems}
        userAddress={address}
        ensNameResult={ensNameResult}
        app={app}
      />
    );
  }

  return (
    <div className="mt-6 md:mt-0">
      <LoginButton
        app={app}
        status={user.status}
        rightIcon={<SignInIcon size={24} />}
      />
    </div>
  );
};

export default AccountSection;

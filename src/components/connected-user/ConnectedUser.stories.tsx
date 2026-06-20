import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { useConnectedUser } from "./context";
import { Body, Caption } from "../typography/Typography";
import { withMockWallet, MOCK_ADDRESS } from "../../../.storybook/mock-wallet";

/**
 * `ConnectedUserProvider` + `useConnectedUser` are non-visual infrastructure: the provider
 * supplies wallet/connection state and the hook reads it. They normally have no UI, so this
 * is a **debug inspector**, not a shipped component — it renders the live `useConnectedUser()`
 * value so you can see the state machine.
 *
 * It runs under the mock-wallet decorator, so it shows the **CONNECTED** state with the fake
 * account on Gnosis. The possible states are `LOADING`, `NOT_CONNECTED`, `CONNECTED`, and
 * `UNSUPPORTED_CHAIN`.
 */

function StateInspector() {
  const { user, isSafe } = useConnectedUser();
  const connected =
    user.status === "CONNECTED" || user.status === "UNSUPPORTED_CHAIN";

  return (
    <div className="w-96 bg-paper-main border border-paper-2 p-6 flex flex-col gap-3 text-black">
      <Caption className="text-surface-grey-2">useConnectedUser()</Caption>
      <Row label="status" value={user.status} />
      <Row label="address" value={connected ? user.address : "—"} />
      <Row
        label="chain"
        value={connected ? `${user.chain.name} (${user.chain.id})` : "—"}
      />
      <Row label="isSafe" value={String(isSafe)} />
      <Caption className="text-surface-grey-2 mt-2">
        mock account: {MOCK_ADDRESS}
      </Caption>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Body className="text-surface-grey-2">{label}</Body>
      <Body bold className="truncate">
        {value}
      </Body>
    </div>
  );
}

const meta: Meta<typeof StateInspector> = {
  title: "Connected User/useConnectedUser",
  component: StateInspector,
  parameters: { layout: "centered" },
  decorators: [withMockWallet],
};

export default meta;
type Story = StoryObj<typeof StateInspector>;

/** Live connection state, connected via the mock wallet. */
export const Inspector: Story = {};

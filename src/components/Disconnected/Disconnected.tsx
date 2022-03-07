import { memo } from "react";
import type { ProviderStringType } from "../../utils/types";

type DisconnectedProps = {
  handleConnect: (selectedProvider: ProviderStringType) => Promise<void>;
};

export const Disconnected = memo(({ handleConnect }: DisconnectedProps) => {
  return (
    <div className="content">
      <p>Connect your wallet</p>
      <button type="button" onClick={() => handleConnect("coinbase")}>
        Coinbase Wallet
      </button>
    </div>
  );
});

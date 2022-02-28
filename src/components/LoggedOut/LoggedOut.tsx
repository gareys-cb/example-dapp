import { memo } from "react";
import { ProviderType } from "../../utils/types";

type LoggedOutProps = {
  handleLogin: (provider: ProviderType) => Promise<void>;
};

export const LoggedOut = memo(({ handleLogin }: LoggedOutProps) => {
  return (
    <div className="content">
      <p>Sign in with your wallet</p>
      <button type="button" onClick={() => handleLogin("walletlink")}>
        Coinbase Wallet
      </button>
      <button type="button" onClick={() => handleLogin("metamask")}>
        MetaMask Wallet
      </button>
    </div>
  );
});

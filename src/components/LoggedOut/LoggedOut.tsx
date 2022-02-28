import { memo } from "react";
import { LoginButton } from "./LoginButton";
import type { ProviderStringType } from "../../utils/types";

type LoggedOutProps = {
  handleLogin: (selectedProvider: ProviderStringType) => Promise<void>;
};

export const LoggedOut = memo(({ handleLogin }: LoggedOutProps) => {
  return (
    <div className="content">
      <p>Sign in with your wallet</p>
      <LoginButton
        providerString="walletlink"
        handleLogin={handleLogin}
        text="Coinbase Wallet"
      />
      <LoginButton
        providerString="metamask"
        handleLogin={handleLogin}
        text="MetaMask"
      />
      <LoginButton
        providerString="walletconnect"
        handleLogin={handleLogin}
        text="WalletConnect"
      />
    </div>
  );
});

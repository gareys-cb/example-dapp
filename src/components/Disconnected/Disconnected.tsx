import { memo } from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import type { ProviderStringType } from "../../utils/types";

type DisconnectedProps = {
  handleLogin: (selectedProvider: ProviderStringType) => Promise<void>;
};

export const Disconnected = memo(({ handleLogin }: DisconnectedProps) => {
  return (
    <div className="content">
      <p>Connect your wallet</p>
      <ConnectWalletButton
        providerString="walletlink"
        handleConnect={handleLogin}
        text="Coinbase Wallet"
      />
      <ConnectWalletButton
        providerString="metamask"
        handleConnect={handleLogin}
        text="MetaMask"
      />
      <ConnectWalletButton
        providerString="walletconnect"
        handleConnect={handleLogin}
        text="WalletConnect"
      />
    </div>
  );
});

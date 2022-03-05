import { memo } from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { initCoinbaseWalletProvider } from "../../hooks/useWeb3/connectors/coinbaseWallet";
import type { ProviderStringType } from "../../utils/types";
import { initMetaMaskProvider } from "../../hooks/useWeb3/connectors/metaMask";
import { initWalletConnectProvider } from "../../hooks/useWeb3/connectors/walletConnect";

type DisconnectedProps = {
  handleConnect: (selectedProvider: ProviderStringType) => Promise<void>;
};

export const Disconnected = memo(({ handleConnect }: DisconnectedProps) => {
  return (
    <div className="content">
      <p>Connect your wallet</p>
      <ConnectWalletButton
        providerString="coinbase"
        handleConnect={handleConnect}
        connected={isProviderConnected("coinbase")}
        text="Coinbase Wallet"
      />
      <ConnectWalletButton
        providerString="metamask"
        handleConnect={handleConnect}
        connected={isProviderConnected("metamask")}
        text="MetaMask"
      />
      <ConnectWalletButton
        providerString="walletconnect"
        handleConnect={handleConnect}
        connected={isProviderConnected("walletconnect")}
        text="WalletConnect"
      />
    </div>
  );
});

function isProviderConnected(providerString: ProviderStringType) {
  switch (providerString) {
    case "coinbase": {
      const provider = initCoinbaseWalletProvider();
      return !!provider.selectedAddress;
    }
    case "metamask": {
      const provider = initMetaMaskProvider();
      return (
        provider &&
        provider.isMetaMask &&
        !provider.isCoinbaseWallet &&
        !!provider.selectedAddress
      );
    }
    case "walletconnect": {
      const provider = initWalletConnectProvider();
      return provider.wc.connected;
    }
  }
}

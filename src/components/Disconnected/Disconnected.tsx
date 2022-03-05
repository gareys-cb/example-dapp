import { memo } from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import type { ProviderStringType } from "../../utils/types";
import { providers } from "../../hooks/useWeb3/useWeb3";
import WalletConnectProvider from "@walletconnect/web3-provider";

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
  const provider = providers[providerString];
  switch (providerString) {
    case "coinbase": {
      return !!provider?.selectedAddress;
    }
    case "metamask": {
      return (
        provider &&
        provider.isMetaMask &&
        // @ts-expect-error checking because coinbase wallet mocks metamask
        !provider.isCoinbaseWallet &&
        !!provider.selectedAddress
      );
    }
    case "walletconnect": {
      return (provider as WalletConnectProvider).wc.connected;
    }
  }
}

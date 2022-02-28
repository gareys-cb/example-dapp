import { MetaMaskInpageProvider } from "@metamask/providers";
import { WalletLinkProvider } from "walletlink";

export type CoinbaseWalletProvider = WalletLinkProvider & {
  providers?: WalletLinkProvider[];
};
export type MetaMaskProvider = MetaMaskInpageProvider & {
  providers?: MetaMaskInpageProvider[];
};
export type EthereumProvider = CoinbaseWalletProvider | MetaMaskProvider;

declare global {
  interface Window {
    ethereum?: CoinbaseWalletProvider | MetaMaskProvider;
  }
}

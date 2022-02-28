import type Web3 from "web3";
import type { WalletLinkProvider } from "walletlink";
import type { MetaMaskInpageProvider } from "@metamask/providers";
import type WalletConnectProvider from "@walletconnect/web3-provider";

export type EthereumProvider =
  | WalletLinkProvider
  | MetaMaskInpageProvider
  | WalletConnectProvider;

// Our supported wallet providers are Coinbase Wallet (walletlink) and MetaMask
export type ProviderStringType = "walletlink" | "metamask" | "walletconnect";

/**
 * This represents the return type of the login function, which contains
 * @param provider the wallet provider object
 * @param web3 the web3 provider
 * @param accounts the accounts array
 */
export type LoginReturnType = {
  provider: EthereumProvider;
  web3: Web3;
  accounts: string[];
};

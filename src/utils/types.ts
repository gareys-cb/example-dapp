import type Web3 from "web3";
import type { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";

export type EthereumProvider = CoinbaseWalletProvider;

// Our supported wallet provider is Coinbase Wallet
export type ProviderStringType = "coinbase";

/**
 * This represents the return type of the connectProvider function, which contains
 * @param provider the wallet provider object
 * @param web3 the web3 provider
 * @param accounts the accounts array
 */
export type ConnectedReturnType = {
  provider: EthereumProvider;
  web3: Web3;
  accounts: string[];
};

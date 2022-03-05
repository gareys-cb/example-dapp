import type Web3 from "web3";
import { providers } from "../hooks/useWeb3/useWeb3";

export type ProviderStringType = keyof typeof providers;

export type EthereumProvider = typeof providers[ProviderStringType];

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

import { EthereumProvider } from "index";
import Web3 from "web3";

// Our supported wallet providers are Coinbase Wallet (walletlink) and MetaMask
export type ProviderType = "walletlink" | "metamask";

/**
 * This represents the return type of the login function, which contains
 * @param ethereum the wallet provider object
 * @param web3 the web3 provider
 */
export type LoginReturnType = { ethereum: EthereumProvider; web3: Web3 };

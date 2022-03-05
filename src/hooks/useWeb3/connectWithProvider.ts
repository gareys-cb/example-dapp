import Web3 from "web3";
import { connectCoinbaseWallet } from "./connectors/coinbaseWallet";
import { connectMetaMask } from "./connectors/metaMask";
import { connectWalletConnect } from "./connectors/walletConnect";
import { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import { MetaMaskInpageProvider } from "@metamask/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import type {
  ConnectedReturnType,
  EthereumProvider,
  ProviderStringType,
} from "../../utils/types";

/**
 *
 * @param provider the provider string: 'coinbase', 'metamask', or 'walletconnect'
 * @returns ethereum - the wallet provider object
 * @returns web3 - the web3 provider
 *
 * When we call this in the UI, we set the web3 and provider state variables
 * These state variables indicate that the user is connected
 * This function only returns these values if the user successfully connects
 */
export const connectWithProvider = async (
  providerString: ProviderStringType,
  provider: EthereumProvider
): Promise<ConnectedReturnType> => {
  switch (providerString) {
    case "coinbase":
      return connectCoinbaseWallet(provider as CoinbaseWalletProvider);
    case "metamask":
      return connectMetaMask(provider as MetaMaskInpageProvider);
    case "walletconnect":
      return connectWalletConnect(provider as WalletConnectProvider);
    default:
      // BEGIN COMMENT //
      // THIS WILL NEVER HAPPEN BECAUSE WE DON'T SUPPORT ANY OTHER WALLETS
      if (!window.ethereum) {
        throw new Error("NO WALLET FOUND!");
      }

      return {
        provider: window.ethereum,
        web3: new Web3(window.ethereum),
        accounts: [],
      };
    // END COMMENT //
  }
};

import Web3 from "web3";
import { connectCoinbaseWallet } from "./connectors/coinbaseWallet";
import { connectMetaMask } from "./connectors/metaMask";
import { connectWalletConnect } from "./connectors/walletConnect";
import type {
  ConnectedReturnType,
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
  provider: ProviderStringType
): Promise<ConnectedReturnType> => {
  switch (provider) {
    case "coinbase":
      return connectCoinbaseWallet();
    case "metamask":
      return connectMetaMask();
    case "walletconnect":
      return connectWalletConnect();
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

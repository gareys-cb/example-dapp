import { connectCoinbaseWallet } from "./connectors/coinbaseWallet";
import { connectMetaMask } from "./connectors/metaMask";
import { connectWalletConnect } from "./connectors/walletConnect";

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
export const connectWithProvider = async (providerString) =>
  connectors[providerString]();

const connectors = {
  coinbase: connectCoinbaseWallet,
  metamask: connectMetaMask,
  walletconnect: connectWalletConnect,
};

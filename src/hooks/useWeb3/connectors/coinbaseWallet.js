import Web3 from "web3";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  DEFAULT_CHAIN_ID,
  APP_NAME,
  APP_LOGO_URL,
  INFURA_RPC_URL,
} from "../dappInfo";

/**
 * @returns the provider for Coinbase Wallet
 */
const initCoinbaseWalletProvider = () => {
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
    overrideIsMetaMask: false,
  });
  return coinbaseWallet.makeWeb3Provider(INFURA_RPC_URL, DEFAULT_CHAIN_ID);
};

export const connectCoinbaseWallet = async () => {
  // If the user selected Coinbase Wallet to connect
  // We initialize the Coinbase Wallet SDK instance and
  // we create the ethereum provider for Coinbase Wallet SDK
  const provider = initCoinbaseWalletProvider();
  // We initialize the Web3 instance
  const web3 = new Web3(provider);

  // This opens the wallet provider prompt to connect to this dapp
  // If the user was already connected, they will not be prompted
  const accounts = await provider.request({
    method: "eth_requestAccounts",
  });
  // We return the ethereum wallet provider and web3 instance for the UI to
  // know the user is connected and ready to interact with the dapp
  return { provider, web3, accounts };
};

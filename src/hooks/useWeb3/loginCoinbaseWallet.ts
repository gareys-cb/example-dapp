import Web3 from "web3";
import WalletLink from "walletlink";
import type { WalletLinkProvider } from "walletlink";
import type { LoginReturnType } from "../../utils/types";
import {
  DEFAULT_CHAIN_ID,
  APP_NAME,
  APP_LOGO_URL,
  INFURA_RPC_URL,
} from "./dappInfo";

/**
 *
 * @param web3Interface - The WalletLink instance, like the one we created with initializeWalletLink()
 * @returns the web3 provider for Coinbase Wallet (walletlink)
 */
export const makeWeb3Provider = (web3Interface: WalletLink) =>
  web3Interface.makeWeb3Provider(INFURA_RPC_URL, DEFAULT_CHAIN_ID);

export const loginCoinbaseWallet = async (): Promise<LoginReturnType> => {
  // If the user selected Coinbase Wallet to login
  // We try to find the Coinbase Wallet ethereum provider on the window.ethereum object
  const walletlinkProvider =
    (window.ethereum as any)?.providers?.find(
      (p: WalletLinkProvider) => !!p.isCoinbaseWallet
    ) ?? window.ethereum;
  // We initialize the WalletLink isntance
  const walletLink = new WalletLink({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
  });
  // We create the ethereum provider for WalletLink
  const provider = makeWeb3Provider(walletLink);
  // We initialize the Web3 instance
  const web3 = new Web3(provider);

  if (!walletlinkProvider || !walletlinkProvider.isCoinbaseWallet) {
    // If the user doesn't have the Coinbase Wallet extension installed,
    // then we opt them into the WalletLink Mobile flow
    // where they can connect the dapp to their mobile wallet using a QR code
    console.info("NO COINBASE WALLET FOUND - USING WALLETLINK SDK PROVIDER");
  }
  // ethereum.enable() opens the wallet provider prompt to connect to this dapp
  // If the user was already logged in, they will not be prompted
  const accounts = await provider.enable();
  // We return the ethereum wallet provider and web3 instance for the UI to
  // know the user is logged in and ready to interact with the dapp
  return { provider, web3, accounts };
};

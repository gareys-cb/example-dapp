import Web3 from "web3";
import WalletLink from "walletlink";
import { CoinbaseWalletProvider, EthereumProvider } from "index";
import { LoginReturnType } from "../../utils/types";

// Your Dapp's name
const APP_NAME = "Sesame";
// An image, hosted by you, that represents your dapp
const APP_LOGO_URL = "http://localhost:3000/src/assets/padlock.png";
// Get your infura api key by creating a free account at https://infura.io/
const DEFAULT_ETH_JSONRPC_URL =
  "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID";
// We default to Ethereum, but we could default to any chain.
// Just make sure your wallet providers support that chain.
// Find chains here: https://chainlist.org/
const DEFAULT_CHAIN_ID = 1;

/**
 * @returns The WalletLink instance for Coinbase Wallet users
 */
export const initializeWalletLink = () =>
  new WalletLink({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
  });

/**
 *
 * @param web3Interface - The WalletLink instance, like the one we created with initializeWalletLink()
 * @returns the web3 provider for Coinbase Wallet (walletlink)
 */
export const makeWeb3Provider = (web3Interface: WalletLink) =>
  web3Interface.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID);

export const loginCoinbaseWallet = async (): Promise<LoginReturnType> => {
  let ethereum: CoinbaseWalletProvider;
  // If the user selected Coinbase Wallet to login
  try {
    // We try to find the Coinbase Wallet ethereum provider on the window.ethereum object
    const walletlinkProvider: CoinbaseWalletProvider | undefined =
      (
        (window.ethereum as EthereumProvider)?.providers as EthereumProvider[]
      )?.find((p): p is CoinbaseWalletProvider => !!p.isCoinbaseWallet) ??
      window.ethereum;
    // We initialize the WalletLink isntance
    const walletLink = initializeWalletLink();
    // We create the ethereum provider for WalletLink
    ethereum = makeWeb3Provider(walletLink);
    // We initialize the Web3 instance
    const web3 = new Web3(ethereum);

    if (!walletlinkProvider || !walletlinkProvider.isCoinbaseWallet) {
      // If the user doesn't have the Coinbase Wallet extension installed,
      // then we opt them into the WalletLink Mobile flow
      // where they can connect the dapp to their mobile wallet using a QR code
      console.info("NO COINBASE WALLET FOUND - USING WALLETLINK SDK PROVIDER");
    }
    // ethereum.enable() opens the wallet provider prompt to connect to this dapp
    // If the user was already logged in, they will not be prompted
    await ethereum.enable();
    // We return the ethereum wallet provider and web3 instance for the UI to
    // know the user is logged in and ready to interact with the dapp
    return { ethereum, web3 };
  } catch (e) {
    // If the user denies the request to connect their Coinbase Wallet,
    // then we call ethereum.close() to reset the app state and reload the app to a clean slate
    ethereum.close();
    throw e;
  }
};

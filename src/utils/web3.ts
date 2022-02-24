import WalletLink, { WalletLinkProvider } from "walletlink";
import Web3 from "web3";

// Your Dapp's name
const APP_NAME = "Sesame";
// An image, hosted by you, that represents your dapp
const APP_LOGO_URL = "http://localhost:3000/src/padlock.png";
// Get your infura api key by creating a free account at https://infura.io/
const DEFAULT_ETH_JSONRPC_URL =
  "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID";
// We default to Ethereum, but we could default to any chain.
// Just make sure your wallet providers support that chain.
// Find chains here: https://chainlist.org/
const DEFAULT_CHAIN_ID = 1;

// Our supported wallet providers are Coinbase Wallet (walletlink) and MetaMask
export type Provider = "walletlink" | "metamask";

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

/**
 * This represents the return type of the login function, which contains
 * @param ethereum the wallet provider object
 * @param web3 the web3 provider
 */
type LoginReturnType = { ethereum: any; web3: Web3 };

/**
 *
 * @param provider the provider string: 'walletlink' or 'metamask'
 * @returns ethereum - the wallet provider object
 * @returns web3 - the web3 provider
 *
 * When we call this in the UI, we set the web3 and provider state variables
 * These state variables indicate that the user is logged in
 * This function only returns these values if the user successfully logs in
 */
export const login = async (provider: Provider): Promise<LoginReturnType> => {
  try {
    if (provider === "walletlink") {
      let ethereum: WalletLinkProvider;
      // If the user selected Coinbase Wallet to login
      try {
        // We try to find the Coinbase Wallet ethereum provider on the window.ethereum object
        const walletlinkProvider =
          // TypeScript is complaining because the `providers` property on window.ethereum is unrecognized
          // @ts-expect-error
          window.ethereum?.providers?.find((p: any) => !!p.isCoinbaseWallet) ??
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
          console.info(
            "NO COINBASE WALLET FOUND - USING WALLETLINK SDK PROVIDER"
          );
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
        ethereum!.close();
        throw e;
      }
    }
    if (provider === "metamask") {
      const metamaskProvider =
        // TypeScript is complaining because the `providers` property on window.ethereum is unrecognized
        // @ts-expect-error
        window.ethereum?.providers?.find((p: any) => !!p.isMetaMask) ??
        window.ethereum;
      // If the user selected MetaMask to login
      // We make sure that the user has MetaMask installed in their browser
      if (
        !metamaskProvider ||
        !metamaskProvider.isMetaMask ||
        !window.ethereum
      ) {
        // If they don't have MetaMask installed, we send them over to MetaMask
        window.open("https://metamask.io/download.html", "_blank");
        // By throwing this error, the login function will fire an error 'FAILED TO SIGN IN'
        // We could present a UI using this error, but we don't in this dapp
        throw new Error("NO METAMASK WALLET FOUND!");
      }

      // We initialize the Web3 instance
      const web3 = new Web3(window.ethereum);
      // just like the Coinbase Wallet enable() method,
      // this opens the wallet provider prompt to connect to this dapp
      // If the user was already logged in, they will not be prompted
      await metamaskProvider.request({ method: "eth_requestAccounts" });
      // We return the ethereum wallet provider and web3 instance for the UI to
      // know the user is logged in and ready to interact with the dapp
      return { ethereum: metamaskProvider, web3 };
    }

    // BEGIN COMMENT //
    // THIS WILL NEVER HAPPEN BECAUSE WE DON'T SUPPORT ANY OTHER WALLETS
    if (!window.ethereum) {
      throw new Error("NO WALLET FOUND!");
    }

    const otherProvider = {
      ethereum: window.ethereum,
      web3: new Web3(window.ethereum),
    };

    return otherProvider;
    // END COMMENT //
  } catch (e) {
    // If the user denies the request to connect their wallet,
    // then we could present a UI using this error, but we don't in this dapp
    console.warn(e);
    throw new Error("Login failed!");
  }
};

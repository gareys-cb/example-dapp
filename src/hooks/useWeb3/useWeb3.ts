import Web3 from "web3";
import { useCallback, useEffect, useState } from "react";
import { loginWallet } from "./loginWallet";
import type { WalletLinkProvider } from "walletlink";
import type { EthereumProvider, ProviderStringType } from "../../utils/types";
import type WalletConnectProvider from "@walletconnect/web3-provider";

// The localstorage key for the selected provider
// If defined, value is either 'walletlink' or 'metamask'
const LS_KEY = "web3-provider";
// We check the localstorage key for the provider to see if it was set during a previous session
export const providerString = window.localStorage.getItem(
  LS_KEY
) as ProviderStringType;

export const useWeb3 = () => {
  // This is the logged in user's Web3 Instance for the selected wallet provider
  const [web3, setWeb3] = useState<Web3>();
  // This is the logged in user's ethereum provider for the selected wallet provider
  const [provider, setProvider] = useState<EthereumProvider>();
  // This is the logged in user's selected account
  const [account, setAccount] = useState<string>();
  // This indicates the app is loading and hides all UI except the logo

  const logout = useCallback(() => {
    // Removes localstorage key that defines the wallet provider
    localStorage.removeItem(LS_KEY);
    // Clear out web3 and ethereum state variables
    setProvider(undefined);
    setWeb3(undefined);
    setAccount(undefined);
    // MetaMask doesn't allow for disconnection from DAPP,
    if ((provider as WalletLinkProvider)?.isCoinbaseWallet) {
      // Disconnect from Coinbase wallet provider
      (provider as WalletLinkProvider)?.close();
      return;
    }
    if ((provider as WalletConnectProvider)?.isWalletConnect) {
      // Disconnect from WalletConnect provider
      // WARNING - WalletConnect has an open issue regarding not rejecting
      // the provider.enable promise properly when you cancel the connection from
      // your wallet provider.
      // https://github.com/WalletConnect/walletconnect-monorepo/issues/243
      (provider as WalletConnectProvider)?.disconnect();
    }
  }, [provider]);

  const login = useCallback(
    // Accepts the user's wallet provider selection
    // MetaMask or Coinbase Wallet
    async (selectedProvider: ProviderStringType) => {
      try {
        // Calls login function, see walletlink.ts
        const {
          provider: loggedInProvider,
          web3: web3Instance,
          accounts,
        } = await loginWallet(selectedProvider);
        // Set the localstorage key with the selected wallet provider 'walletlink' or 'metamask'
        // We will use this key to log the user back in automatically
        localStorage.setItem(LS_KEY, selectedProvider);
        // set the web3, provider, and account state variables using the
        // resolved values from the login function
        setProvider(loggedInProvider);
        setWeb3(web3Instance);
        setAccount(accounts[0]);
      } catch {
        // If the user cancels the request to sign in from the wallet provider
        console.warn("FAILED TO SIGN IN!");
        logout();
      }
    },
    [logout]
  );

  const signMessage = useCallback(async () => {
    try {
      if (!account || !web3) {
        throw new Error("NO ACCOUNT AVAILABLE");
      }
      // This will send a request to the wallet provider to sign a message
      const signature = await web3.eth.personal.sign(
        `Open Sesame!`,
        account,
        ""
      );
      // The signature is returned, do with it what you will
      console.info(signature);
    } catch (e) {
      // This error means that user canceled the signature request
      console.warn(e);
    }
  }, [web3, account]);

  // This runs on initial app load
  // If the user is logged in, we can listen to their wallet provider for
  // the accountsChanged event. This means the user changed their
  // active/selected wallet while they were logged into the DAPP.
  useEffect(() => {
    // I will use account/address interchangeably in these comments
    // This listener provides an array of address strings when it calls back
    const listener = (accounts: string[]): void => {
      // In most cases, the accounts array will have a length, but we check to be safe
      if (!accounts.length) {
        // This only applies to MetaMask
        // When a user disconnects this dapp using MetaMask
        // The accountsChanged returns an empty array, so we log them out.
        logout();
        return;
      }
      // Typically, it will only return an array with ONE address, so we get the [0] index address
      // We set the new active account to display it in the UI
      setAccount(accounts[0]);
    };
    // This listener emits when the user changes their account from their wallet provider
    provider?.on("accountsChanged", listener);
    return () => {
      // This cleans up the event listener
      provider?.removeListener("accountsChanged", listener);
    };
  }, [provider, logout]);

  // This runs on initial app load and only applies to WalletConnect
  // If the dapp is in an open browser tab when it is disconnected by the provider,
  // this will clear out the provider localstorage key so that the user won't
  // fall into the auto-login flow in the following useEffect.
  useEffect(() => {
    if (!(provider as WalletConnectProvider)?.isWalletConnect) return;
    const listener = () => {
      logout();
    };
    // This listener emits when the user changes their account from their wallet provider
    provider?.on("disconnect", listener);
    return () => {
      // This cleans up the event listener
      provider?.removeListener("disconnect", listener);
    };
  }, [provider, logout]);

  // This runs on initial app load and only applies to Coinbase Wallet
  // If the dapp is in an open browser tab when it is disconnected by the provider,
  // this will clear out the provider localstorage key
  // so that when the page automatically reloads, the user won't fall into
  // the auto-login flow in the following useEffect.
  useEffect(() => {
    if (!(provider as WalletLinkProvider)?.isCoinbaseWallet) return;
    // The Coinbase Wallet localstorage keys get cleared out, and then the page immediately reloads
    // This listener fires after the localstorage keys get cleared out, but right before the page reloads
    const listener = () => {
      if (
        !localStorage.getItem("-walletlink:https://www.walletlink.org:version")
      ) {
        localStorage.removeItem(LS_KEY);
      }
    };
    // We listen to the beforeunload event to clear the localstorage provider key
    // before the page has a chance to refresh
    addEventListener("beforeunload", listener, { capture: true });

    return () => {
      // This cleans up the event listener
      removeEventListener("beforeunload", listener);
    };
  }, [provider]);

  // This runs on initial app load
  // If the user was logged in, then closes the browser tab for this dapp or reloads this tab,
  // then this will put them back into an authenticated UI state.
  useEffect(() => {
    // If there is no provider in localStorage, we can assume the user needs to login
    // via the login button. Otherwise...
    if (providerString) {
      // We call login with the provider from localstorage
      login(providerString).catch(logout);
      // If this request fails, the user will be logged out
      // this should only happen if the user closes this dapp tab in the browser,
      // then disconnects from this dapp via their wallet provider,
      // then returns to this dapp
    }
  }, []);

  return { login, logout, account, web3, signMessage };
};

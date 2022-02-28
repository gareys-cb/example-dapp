import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { ProviderType } from "../../utils/types";
import { loginWallet } from "./loginWallet";

// The localstorage key for the selected provider
// If defined, value is either 'walletlink' or 'metamask'
const LS_KEY = "web3-provider";

export const useWeb3 = () => {
  // This is the logged in user's Web3 Instance for the selected wallet provider
  const [web3, setWeb3] = useState<Web3>();
  // This is the logged in user's ethereum provider for the selected wallet provider
  const [ethereum, setEthereum] = useState<typeof window.ethereum>();
  // This is the logged in user's selected account
  const [account, setAccount] = useState<string>();
  // This indicates the app is loading and hides all UI except the logo

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
    ethereum?.on("accountsChanged", listener);
    return () => {
      // This cleans up the event listener
      ethereum?.removeListener("accountsChanged", listener);
    };
  }, [ethereum]);

  // This runs on initial app load
  // If the dapp is in an open browser tab when it is disconnected by the provider,
  // this will clear out the provider localstorage key
  // so that when the page automatically reloads, the user won't fall into
  // the auto-login flow in the following useEffect.
  useEffect(() => {
    // This only applies to Coinbase Wallet
    // The Coinbase Wallet localstorage keys get cleared out, and then the page immediately reloads
    // This listener fires after the localstorage keys get cleared out, but right before the page reloads
    const listener = () => {
      if (
        ethereum?.isCoinbaseWallet &&
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
  });

  // This runs on initial app load
  // If the user was logged in, then closes the browser tab for this dapp or reloads this tab,
  // then this will put them back into an authenticated UI state.
  useEffect(() => {
    // We check the localstorage key for the provider to see if it was set during a previous session
    const provider = window.localStorage.getItem(LS_KEY) as ProviderType;

    // If there is no provider in localStorage, we can assume the user needs to login
    // via the login button. Otherwise...
    if (provider) {
      // We call login with the provider from localstorage
      login(provider).catch(logout);
      // If this request fails, the user will be logged out
      // this should only happen if the user closes this dapp tab in the browser,
      // then disconnects from this dapp via their wallet provider,
      // then returns to this dapp
    }
  }, []);

  const login = useCallback(
    // Accepts the user's wallet provider selection
    // MetaMask or Coinbase Wallet
    async (provider: "walletlink" | "metamask") => {
      try {
        // Calls login function, see walletlink.ts
        const { ethereum, web3: web3Instance } = await loginWallet(provider);
        // Set the localstorage key with the selected wallet provider 'walletlink' or 'metamask'
        // We will use this key to log the user back in automatically
        localStorage.setItem(LS_KEY, provider);
        // If web3 is defined, then call getAccounts and set the account state variable
        // We display the account in the bottom of the app.
        web3Instance?.eth.getAccounts().then((accounts: string[]) => {
          setAccount(accounts[0]);
        });
        // set the web3 and ethereum state variables using the
        // resolved values from the login function
        setEthereum(ethereum);
        setWeb3(web3Instance);
      } catch {
        // If the user cancels the request to sign in from the wallet provider
        console.warn("FAILED TO SIGN IN!");
      }
    },
    []
  );

  const logout = useCallback(() => {
    // Removes localstorage key that defines the wallet provider
    localStorage.removeItem(LS_KEY);
    // Clear out web3 and ethereum state variables
    setEthereum(undefined);
    setWeb3(undefined);
    setAccount(undefined);
    if (ethereum?.isCoinbaseWallet) {
      // Disconnect from Coinbase wallet provider
      // MetaMask doesn't allow for disconnection from DAPP,
      ethereum?.close();
    }
  }, [ethereum]);

  const signMessage = useCallback(async () => {
    try {
      if (!account) {
        throw new Error("NO ACCOUNT AVAILABLE");
      }
      // This will send a request to the wallet provider to sign a message
      const signature = await web3?.eth.personal.sign(
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

  return { login, logout, account, web3, signMessage };
};

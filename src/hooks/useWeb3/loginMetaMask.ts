import Web3 from "web3";
import type { MetaMaskInpageProvider } from "@metamask/providers";
import type { LoginReturnType } from "../../utils/types";

export const loginMetaMask = async (): Promise<LoginReturnType> => {
  const provider =
    (window.ethereum as any)?.providers?.find(
      (p: MetaMaskInpageProvider) => !!p.isMetaMask
    ) ?? window.ethereum;
  // If the user selected MetaMask to login
  // We make sure that the user has MetaMask installed in their browser
  if (!provider || !provider.isMetaMask || !window.ethereum) {
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
  const accounts = await provider.request({ method: "eth_requestAccounts" });
  // We return the ethereum wallet provider and web3 instance for the UI to
  // know the user is logged in and ready to interact with the dapp
  return { provider, web3, accounts };
};

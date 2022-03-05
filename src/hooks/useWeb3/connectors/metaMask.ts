import Web3 from "web3";
import type { MetaMaskInpageProvider } from "@metamask/providers";
import type { provider as Provider } from "web3-core";
import type {
  ConnectedReturnType,
  EthereumProvider,
} from "../../../utils/types";

// Initializes the MetaMask provider using the provider at window.ethereum
// We will prefer a provider where the property `isMetaMask` is set to true
export const initMetaMaskProvider = (): MetaMaskInpageProvider =>
  (window.ethereum as any)?.providers?.find(
    (p: MetaMaskInpageProvider) => !!p.isMetaMask
  ) ?? window.ethereum;

export const connectMetaMask = async (
  provider: EthereumProvider
): Promise<ConnectedReturnType> => {
  // If the user selected MetaMask to connect
  // We make sure that the user has MetaMask installed in their browser
  if (!provider || !provider.isMetaMask || !window.ethereum) {
    // If they don't have MetaMask installed, we send them over to MetaMask
    window.open("https://metamask.io/download.html", "_blank");
    // By throwing this error, the connect function will fire an error 'FAILED TO SIGN IN'
    // We could present a UI using this error, but we don't in this dapp
    throw new Error("NO METAMASK WALLET FOUND!");
  }

  // We initialize the Web3 instance
  const web3 = new Web3(provider as unknown as Provider);
  // This opens the wallet provider prompt to connect to this dapp
  // If the user was already connected, they will not be prompted
  const accounts: string[] = await provider.request({
    method: "eth_requestAccounts",
  });
  // We return the ethereum wallet provider and web3 instance for the UI to
  // know the user is connected and ready to interact with the dapp
  return { provider, web3, accounts };
};

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import type { provider } from "web3-core";
import type { ConnectedReturnType } from "../../../utils/types";

// Get your infura api key by creating a free account at https://infura.io/
const INFURA_ID = "YOUR_INFURA_PROJECT_ID";

export const connectWalletConnect = async (): Promise<ConnectedReturnType> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // If the user selected Coinbase Wallet to login
    // Initialize the WalletConnectProvider
    const provider = new WalletConnectProvider({
      infuraId: INFURA_ID,
    });
    // We initialize the Web3 instance
    const web3 = new Web3(provider as unknown as provider);

    // This controls whether or not we fire the 'disconnect' listener
    // This is because WalletConnect does not provide an removeEventListener
    // for the provider.connector.on('disconnect', ...) method
    let listen = true;
    const shouldCallListener = () => {
      return listen;
    };

    // If the user rejects connection from their provider, this listener
    // will catch the failure.
    const disconnectListener = () => {
      if (shouldCallListener()) reject();
    };

    // This starts the disconnect listener
    provider.connector.on("disconnect", disconnectListener);

    try {
      // ethereum.enable() opens the wallet provider prompt to connect to this dapp
      // If the user was already logged in, they will not be prompted
      const accounts = await provider.enable();
      // This tells the disconnect listener to not fire once the provider is enabled
      listen = false;

      // provider.connector.removeEventListener("disconnect", disconnectListener);
      // We return the ethereum wallet provider and web3 instance for the UI to
      // know the user is logged in and ready to interact with the dapp
      resolve({ provider, web3, accounts });
    } catch {
      reject();
    }
  });
};

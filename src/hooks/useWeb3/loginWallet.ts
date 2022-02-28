import Web3 from "web3";
import { LoginReturnType, ProviderType } from "../../utils/types";
import { loginCoinbaseWallet } from "./loginCoinbaseWallet";
import { loginMetaMask } from "./loginMetaMask";

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
export const loginWallet = async (
  provider: ProviderType
): Promise<LoginReturnType> => {
  switch (provider) {
    case "walletlink":
      return loginCoinbaseWallet();
    case "metamask":
      return loginMetaMask();
    default:
      // BEGIN COMMENT //
      // THIS WILL NEVER HAPPEN BECAUSE WE DON'T SUPPORT ANY OTHER WALLETS
      if (!window.ethereum) {
        throw new Error("NO WALLET FOUND!");
      }

      return {
        ethereum: window.ethereum,
        web3: new Web3(window.ethereum),
      };
    // END COMMENT //
  }
};

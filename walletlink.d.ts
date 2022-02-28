import EthereumProvider from "index";
import WalletLink, { WalletLinkProvider } from "walletlink";

export default WalletLink;
declare global {
  interface Window {
    WalletLink: typeof WalletLink;
    WalletLinkProvider: typeof WalletLinkProvider;
    walletLinkExtension?: WalletLinkProvider;
    ethereum: EthereumProvider;
  }
}

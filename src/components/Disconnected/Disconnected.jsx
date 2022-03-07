export const Disconnected = ({ handleConnect }) => {
  return (
    <div className="content">
      <p>Connect your wallet</p>
      <ConnectWalletButton
        providerString="coinbase"
        handleConnect={handleConnect}
        text="Coinbase Wallet"
      />
      <ConnectWalletButton
        providerString="metamask"
        handleConnect={handleConnect}
        text="MetaMask"
      />
      <ConnectWalletButton
        providerString="walletconnect"
        handleConnect={handleConnect}
        text="WalletConnect"
      />
    </div>
  );
};

const ConnectWalletButton = ({ providerString, handleConnect, text }) => (
  <button type="button" onClick={() => handleConnect(providerString)}>
    {text}
  </button>
);

export const Connected = ({
  account,
  web3,
  providerString,
  handleChangeProvider,
}) => {
  return (
    <div className="content">
      <small>Selected account: {account}</small>
      <button type="button" onClick={() => signMessage({ web3, account })}>
        Sign Message
      </button>
      <button
        className="change-provider"
        type="button"
        onClick={handleChangeProvider}
      >
        Change Provider
      </button>
      <small>Connected via {providerString}</small>
    </div>
  );
};

const signMessage = async ({ web3, account }) => {
  try {
    // This will send a request to the wallet provider to sign a message
    const signature = await web3.eth.personal.sign(
      "Example message",
      account,
      ""
    );
    // The signature is returned, do with it what you will
    console.info(signature);
  } catch (e) {
    // This error means that user canceled the signature request
    console.warn(e);
  }
};

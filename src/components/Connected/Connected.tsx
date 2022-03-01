import { memo } from "react";
import Web3 from "web3";

type ConnectedProps = {
  handleLogout: () => void;
  web3: Web3;
  account: string;
};

export const Connected = memo(
  ({ account, web3, handleLogout }: ConnectedProps) => {
    return (
      <div className="content">
        <p>Open Sesame!</p>
        <small>Selected account: {account}</small>
        <button type="button" onClick={() => signMessage({ web3, account })}>
          Sign Message
        </button>
        <button
          className="change-provider"
          type="button"
          onClick={handleLogout}
        >
          Change Provider
        </button>
      </div>
    );
  }
);

type SignMessageParams = { web3: Web3; account: string };

const signMessage = async ({ web3, account }: SignMessageParams) => {
  try {
    if (!account || !web3) {
      throw new Error("NO ACCOUNT AVAILABLE");
    }
    // This will send a request to the wallet provider to sign a message
    const signature = await web3.eth.personal.sign(`Open Sesame!`, account, "");
    // The signature is returned, do with it what you will
    console.info(signature);
  } catch (e) {
    // This error means that user canceled the signature request
    console.warn(e);
  }
};

import "./App.css";
import logo from "../../assets/logo.svg";
import { useCallback, useEffect, useState } from "react";
import { useWeb3 } from "../../hooks/useWeb3/useWeb3";
import { Disconnected } from "../Disconnected/Disconnected";
import { Connected } from "../Connected/Connected";

function App() {
  const { connectProvider, changeProvider, providerString, account, web3 } =
    useWeb3();
  // Controls the UI loading state which shows/hides the contents of the app
  // We will attempt to connect the user if the provider is set in localStorage
  // Otherwise, we initialize it to false
  const [loading, setLoading] = useState(!!providerString);
  // If there is web3 state, we assume the user is connected
  const connected = !!account && !!web3;

  useEffect(() => {
    if (connected && loading) setLoading(false);
  }, [connected, loading]);

  const handleConnectProvider = useCallback(
    async (provider) => {
      // Set the UI state to loading to prevent further interaction
      setLoading(true);
      // attempt to connect provider via web3Hook
      await connectProvider(provider).finally(() => {
        // Remove the UI loading state
        // show connected UI state on success
        // show disconnected out UI state on failure
        setLoading(false);
      });
    },
    [connectProvider]
  );

  const handleChangeProvider = useCallback(() => {
    // Set the UI state to loading to prevent further interaction
    setLoading(true);
    // attempt to connect via web3Hook
    changeProvider();
    // Remove the UI loading state
    // show disconnected UI state on failure
    setLoading(false);
  }, [changeProvider]);

  return (
    <div className="App">
      <h1>Example Dapp</h1>
      <img src={logo} className="App-logo" alt="logo" />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {!connected && <Disconnected handleConnect={handleConnectProvider} />}
          {connected && (
            <Connected
              web3={web3}
              account={account}
              providerString={providerString}
              handleChangeProvider={handleChangeProvider}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;

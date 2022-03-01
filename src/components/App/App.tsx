import { useCallback, useEffect, useState } from "react";
import logo from "../../assets/padlock.png";
import connectedLogo from "../../assets/padlock_open.png";
import { providerString, useWeb3 } from "../../hooks/useWeb3/useWeb3";
import { Disconnected } from "../Disconnected/Disconnected";
import { Connected } from "../Connected/Connected";
import type { ProviderStringType } from "../../utils/types";
import "./App.css";

function App() {
  const { connectProvider, changeProvider, account, web3 } = useWeb3();
  // Controls the UI loading state which shows/hides the contents of the app
  // We will attempt to login the user if the provider is set in localStorage
  // Otherwise, we initialize it to false
  const [loading, setLoading] = useState(!!providerString);
  // If there is web3 state, we assume the user is logged in
  const connected = !!account && !!web3;

  useEffect(() => {
    if (connected && loading) setLoading(false);
  }, [connected, loading]);

  const handleConnectProvider = useCallback(
    async (provider: ProviderStringType) => {
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
    // attempt to login via web3Hook
    changeProvider();
    // Remove the UI loading state
    // show logged out UI state on failure
    setLoading(false);
  }, [changeProvider]);

  return (
    <div className="App">
      <h1>Sesame</h1>
      <img
        src={connected ? connectedLogo : logo}
        className="App-logo"
        alt="logo"
      />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {!connected && <Disconnected handleLogin={handleConnectProvider} />}
          {connected && (
            <Connected
              web3={web3}
              account={account}
              handleLogout={handleChangeProvider}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;

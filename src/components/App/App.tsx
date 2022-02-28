import { useCallback, useState } from "react";
import logo from "../../assets/padlock.png";
import loggedInLogo from "../../assets/padlock_open.png";
import { providerString, useWeb3 } from "../../hooks/useWeb3/useWeb3";
import { LoggedOut } from "../LoggedOut/LoggedOut";
import { LoggedIn } from "../LoggedIn/LoggedIn";
import type { ProviderStringType } from "../../utils/types";
import "./App.css";

function App() {
  const { login, logout, account, web3, signMessage } = useWeb3();
  // Controls the UI loading state which shows/hides the contents of the app
  // We will attempt to login the user if the provider is set in localStorage
  // Otherwise, we initialize it to false
  const [loading, setLoading] = useState(!!providerString);
  // If there is web3 state, we assume the user is logged in
  const loggedIn = !!web3;

  const handleLogin = useCallback(
    async (provider: ProviderStringType) => {
      // Set the UI state to loading to prevent further interaction
      setLoading(true);
      // attempt to login via web3Hook
      await login(provider).finally(() => {
        // Remove the UI loading state
        // show logged in UI state on success
        // show logged out UI state on failure
        setLoading(false);
      });
    },
    [login]
  );

  const handleLogout = useCallback(() => {
    // Set the UI state to loading to prevent further interaction
    setLoading(true);
    // attempt to login via web3Hook
    logout();
    // Remove the UI loading state
    // show logged out UI state on failure
    setLoading(false);
  }, [logout]);

  return (
    <div className="App">
      <h1>Sesame</h1>
      <img
        src={loggedIn ? loggedInLogo : logo}
        className="App-logo"
        alt="logo"
      />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {!loggedIn && <LoggedOut handleLogin={handleLogin} />}
          {loggedIn && (
            <LoggedIn
              handleLogout={handleLogout}
              handleSignMessage={signMessage}
              account={account}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;

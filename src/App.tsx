import "./App.css";
import logo from "./padlock.png";
import loggedInLogo from "./padlock_open.png";
import { useCallback, useState } from "react";
import { useWeb3 } from "./hooks/useWeb3/useWeb3";
import { ProviderType } from "./utils/types";

function App() {
  const { login, logout, account, web3, signMessage } = useWeb3();
  // Controls the UI loading state which shows/hides the contents of the app
  const [loading, setLoading] = useState(true);
  // If there is web3 state, we assume the user is logged in
  const loggedIn = !!web3;

  const handleLogin = useCallback(
    async (provider: ProviderType) => {
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
          {!loggedIn && (
            <div className="content">
              <p>Sign in with your wallet</p>
              <button type="button" onClick={() => handleLogin("walletlink")}>
                Coinbase Wallet
              </button>
              <button type="button" onClick={() => handleLogin("metamask")}>
                MetaMask Wallet
              </button>
            </div>
          )}
          {loggedIn && (
            <div className="content">
              <p>Open Sesame!</p>
              <small>Signed into account: {account}</small>
              <button type="button" onClick={signMessage}>
                Sign Message
              </button>
              <button className="signout" type="button" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

import { memo } from "react";

type LoggedInProps = {
  handleLogout: () => void;
  handleSignMessage: () => void;
  account?: string;
};

export const LoggedIn = memo(
  ({ account, handleSignMessage, handleLogout }: LoggedInProps) => {
    return (
      <div className="content">
        <p>Open Sesame!</p>
        <small>Signed into account: {account}</small>
        <button type="button" onClick={handleSignMessage}>
          Sign Message
        </button>
        <button className="signout" type="button" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    );
  }
);

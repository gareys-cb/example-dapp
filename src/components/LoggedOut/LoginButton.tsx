import type { ProviderStringType } from "../../utils/types";

type LoginButtonProps = {
  providerString: ProviderStringType;
  handleLogin: (selectedProvider: ProviderStringType) => Promise<void>;
  text: string;
};

export const LoginButton = ({
  providerString,
  handleLogin,
  text,
}: LoginButtonProps) => (
  <button type="button" onClick={() => handleLogin(providerString)}>
    {text}
  </button>
);

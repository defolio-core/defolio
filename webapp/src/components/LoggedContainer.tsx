/* eslint-disable @typescript-eslint/no-misused-promises */
import { Web3Button } from "@web3modal/react";
import { FC } from "react";
import { useAccount } from "wagmi";
import { useSignIn } from "../hooks/useSignIn";
import { useMe } from "../hooks/useMe";

export interface LoggedContainerProps {
  children?: React.ReactNode;
}

export const LoggedContainer: FC<LoggedContainerProps> = ({ children }) => {
  const { data: me, isLoading: meLoading } = useMe();
  const account = useAccount();
  const { signIn, isLoading: signInLoading } = useSignIn();
  const loading = meLoading || signInLoading;

  if (!loading && me && account) {
    return children;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        {loading ? (
          <div>
            <span className="loading loading-spinner loading-xs"></span>
          </div>
        ) : !account ? (
          <Web3Button />
        ) : (
          <button className="btn btn-primary" onClick={signIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

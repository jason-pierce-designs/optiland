import { CreditCardIcon } from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useMetaMaskOnboarding from "../lib/hooks/useMetaMaskOnboarding";
import ETHBalance from "./ETHBalance";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, account, setError } = useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <>
        {isWeb3Available ? (
          <button
            className=""
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? (
              <div className="flex items-center">
                <span className="pr-2">Connect</span>
                <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            ) : (
              "Connect to Wallet"
            )}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </>
    );
  }

  return (
    <>
      {/* {account &&
        isWeb3Available &&
        chainId !== Number(process.env.NEXT_PUBLIC_CHAIN_ID) && (
          <button className="" onClick={() => connectToOptimism()}>
            Add {process.env.NEXT_PUBLIC_CHAIN_NAME_SHORT}
          </button>
        )} */}
      {/* {ENSName || `${shortenHex(account, 4)}`} */}
      {account && <ETHBalance />}
    </>
  );
};

export default Account;

import { CreditCardIcon } from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import { metaMask } from "../lib/connectors/metaMask";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import useMetaMaskOnboarding from "../lib/hooks/useMetaMaskOnboarding";
import ETHBalance from "./ETHBalance";

const Account = () => {
  const { account, error, isActive, isActivating } = useWeb3React();
  const [connecting, setConnecting] = useState(false);

  const activate = async () => {
    return await metaMask.activate(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
  };

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  useEffect(() => {
    if (isActive || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [isActive, error, stopOnboarding]);

  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  if (typeof account !== "string") {
    return (
      <>
        {isWeb3Available ? (
          <button
            disabled={connecting || isActivating}
            onClick={() => {
              setConnecting(true);
              isMetaMaskInstalled
                ? activate().catch((error) => {
                    if (error instanceof UserRejectedRequestError) {
                      alert(error.message);
                    }
                  })
                : startOnboarding();
            }}
          >
            {isMetaMaskInstalled ? (
              <span className="flex items-center">
                <span className="pr-2">Connect</span>
                <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
              </span>
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
      <ETHBalance />
    </>
  );
};

export default Account;

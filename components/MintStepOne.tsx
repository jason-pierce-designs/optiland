import { useWeb3React } from "@web3-react/core";
import React, { useContext } from "react";
import { connectToOptimism } from "../lib/helpers";
import useEagerConnect from "../lib/hooks/useEagerConnect";
import { MintFormContext } from "../lib/state/mintForm";
import { StepperContext } from "../lib/state/stepper";
import Account from "./Account";
import Button from "./Button";

// export interface MintStepOneProps {
//   callback: () => {};
// }

export default function MintStepOne() {
  const { account, chainId } = useWeb3React();
  const { dispatch: formDispatch } = useContext(MintFormContext);
  const { dispatch: stepperDispatch } = useContext(StepperContext);
  const triedToEagerConnect = useEagerConnect();

  const markStepOneComplete = () => {
    stepperDispatch({ type: "setStepComplete", payload: 0 });
    setTimeout(() => {
      stepperDispatch({ type: "setCurrentStep", payload: 1 });
      formDispatch({ type: "stepOneComplete", payload: true });
    }, 666);
  };
  return (
    <div className="bg-white overflow-hidden sm-rounded-b-lg pt-16">
      <div className="px-4 py-5 sm:p-6 sm:mb-16">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              optiland minting
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Are you ready?
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Connect your MetaMask wallet and add the Optimism Network to enable
            minting.
          </p>
          <div className="flex justify-center">
            {!account && (
              <div className="mx-8 mt-8">
                <Button variant="primary">
                  <Account triedToEagerConnect={triedToEagerConnect} />
                </Button>
              </div>
            )}

            {!(chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID)) &&
              account && (
                <div className="mx-8 mt-8">
                  <Button variant="primary" onClick={() => connectToOptimism()}>
                    Switch to {process.env.NEXT_PUBLIC_CHAIN_NAME}
                  </Button>
                </div>
              )}
          </div>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            You will need to have Ether on the Optimism network to mint the NFT.
            Please go to the official{" "}
            <a
              className="mx-1 underline"
              href="https://gateway.optimism.io/welcome"
            >
              Optimism Gateway
            </a>
            or
            <a
              className="mx-1 underline"
              href="https://app.hop.exchange/send?sourceNetwork=ethereum&destNetwork=optimism"
            >
              Hop exchange
            </a>{" "}
            to move some Ether to the Optimism network before you begin.
          </p>
        </div>
      </div>
      {account && chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID) && (
        <div className="flex justify-center bg-gray-50 px-4 py-4 sm:px-6">
          <div className="mx-8">
            <Button variant="secondary">More info</Button>
          </div>
          <div className="mx-8">
            <Button variant="primary" onClick={() => markStepOneComplete()}>
              I&apos;m ready
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

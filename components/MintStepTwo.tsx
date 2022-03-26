import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "web3-eth-contract";
import { BigNumber } from "@ethersproject/bignumber";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import BUNNIES_CONTRACT_ABI from "../lib/contracts/bunny.json";
import { connectToOptimism } from "../lib/helpers";
import useEagerConnect from "../lib/hooks/useEagerConnect";
import { MintFormContext } from "../lib/state/mintForm";
import { StepperContext } from "../lib/state/stepper";
import Account from "./Account";
import Button from "./Button";

const getCostPerToken = async (contract: Contract) => {
  try {
    return await contract?.methods.cost().call();
  } catch (e) {
    console.error(e);
    return e;
  }
};

const getTotalMinted = async (contract: Contract) => {
  try {
    return await contract?.methods.totalSupply().call();
  } catch (e) {
    return e;
  }
};

const postMsgToMintyBot = async (message: string) => {
  const msg = { content: message };
  try {
    return await fetch(
      "https://discord.com/api/webhooks/904945097651671041/WHT5o_Did8QLJKUbDPvr1cGGPD988BvzsMrTpMnetYbUwYLyYeTLnX_DE73-E-ZvRnEl",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(msg),
      }
    );
  } catch (e) {
    console.error(e);
    return e;
  }
};

const updateRabbitHole = (quantity: number, txnLink: string, total: number) => {
  if (quantity === 1) {
    postMsgToMintyBot(
      `Someone just minted one Bunny (transaction: ${txnLink} )! ${total} have been minted so far. Maybe they'll show some of them off in #show-off-your-bunny?! `
    );
  } else if (quantity === 10) {
    postMsgToMintyBot(
      `WOW!!! Someone just minted 10 Bunnies at once (transaction: ${txnLink} )! ${total} have been minted so far. Maybe they'll show some of them off in #show-off-your-bunny?!`
    );
  } else if (quantity >= 5) {
    postMsgToMintyBot(
      `Someone just minted a handful of Bunnies (transaction: ${txnLink} )! ${total} have been minted so far. Maybe they'll show some of them off in #show-off-your-bunny?!`
    );
  } else {
    postMsgToMintyBot(
      `Someone just minted some Bunnies! (transaction: ${txnLink}). ${total} have been minted so far. Maybe they'll show some of them off in #show-off-your-bunny?!`
    );
  }
};

export default function MintStepTwo() {
  const { library, account, chainId } = useWeb3React();
  const { state: formState, dispatch: formDispatch } =
    useContext(MintFormContext);
  const { dispatch: stepperDispatch } = useContext(StepperContext);
  const [costPerToken, setCostPerToken] = useState<BigNumber>(
    BigNumber.from("0")
  );
  const [quantity, setQuantity] = useState<{ value: string }>({ value: "0" });
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (formState.contract) {
      getCostPerToken(formState.contract).then(
        (cost: string) => {
          if (cost) {
            setCostPerToken(BigNumber.from(cost));
          }
        },
        (error) => console.log(error)
      );
    }
  }, [formState.contract]);

  return (
    <div className="bg-white overflow-hidden sm-rounded-b-lg pt-16">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 px-4 py-5 sm:p-6 sm:pb-16">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                Select Quantity
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                How many Bunnies do you want?
              </span>
            </h1>
          </div>
        </div>
        <div className="col-span-5 bg-gray-100 px-4 py-5 sm:p-6 sm:pb-16">
          <div className="text-lg max-w-prose mx-auto">
            <div className=" block text-xl text-center leading-8 font-extrabold tracking-tight text-gray-900">
              You will get:
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

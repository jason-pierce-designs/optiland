import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "web3-eth-contract";
import { BigNumber } from "@ethersproject/bignumber";
import { MintFormContext } from "../lib/state/mintForm";
import { StepperContext } from "../lib/state/stepper";
import Button from "./Button";
import { formatEtherscanLink, parseBalance } from "../lib/utils";
import { CheckIcon } from "@heroicons/react/outline";

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

  const numBunnyChangeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    const valid =
      Number(value) > 0 && chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID);
    setQuantity({ value: value });
    setIsValid(valid);
  };

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

  const handleSubmit = (e: FormEvent) => async (contract: Contract) => {
    e.preventDefault();
    if (chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
      const quan = BigNumber.from(quantity.value);
      const total = costPerToken?.mul(quan);
      return await contract?.methods.mint(quantity.value).send({
        from: account,
        value: total,
      });
    } else {
      throw new Error("You need to switch to the Optimistic Ethereum Network!");
    }
  };

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
                How many?
              </span>
            </h1>
            <form
              className="flex flex-col justify-center"
              onSubmit={(e) => {
                handleSubmit(e)(formState.contract as Contract).then(
                  (receipt) => {
                    stepperDispatch({ type: "setStepComplete", payload: 2 });
                    const txnLink = formatEtherscanLink(
                      "Transaction",
                      receipt.transactionHash
                    );
                    setTimeout(() => {
                      stepperDispatch({ type: "setCurrentStep", payload: 3 });
                      formDispatch({ type: "stepTwoComplete", payload: true });
                    }, 2100);
                    getTotalMinted(formState.contract as Contract).then(
                      (total: string) =>
                        updateRabbitHole(
                          Number(quantity.value),
                          txnLink,
                          Number(total)
                        )
                    );
                  },
                  (error) => {
                    console.log(error);
                    alert(error.message || error);
                  }
                );
              }}
            >
              <div className="flex mt-12 justify-between">
                <label htmlFor="quantity" className="text-lg">
                  Quantity (max: 10 per transaction)
                </label>
                <input
                  name="quantity"
                  value={quantity.value}
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  onChange={numBunnyChangeHandler}
                />
              </div>
              <div className="flex flex-col justify-center items-center text-7xl p-16">
                {quantity.value}
              </div>
              <div className="flex justify-between items-center border-t-2 mt-2 px-2 py-2">
                <div>Cost per Token:</div>
                <div className="flex">
                  <span className="mt-1 mr-2 h-3 w-3">
                    <FontAwesomeIcon icon={faEthereum} />
                  </span>{" "}
                  {parseBalance(costPerToken?.toString())}
                </div>
              </div>
              <div className="flex justify-between items-center border-t-2 border-b-2 mt-2 mb-8 px-2 py-2">
                <div>Total Base Price: </div>
                <div className="flex">
                  <span className="mt-1 mr-2 h-3 w-3">
                    <FontAwesomeIcon icon={faEthereum} />
                  </span>{" "}
                  {parseBalance(
                    costPerToken?.mul(BigNumber.from(quantity.value)).toString()
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <input
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                  value="Purchase"
                  disabled={!isValid}
                ></input>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-5 bg-gray-50 px-4 py-5 sm:p-6 sm:pb-16">
          <div className="text-lg max-w-prose mx-auto h-full">
            <div className="flex justify-center items-center h-full">
              <ul
                role="list"
                className="flex flex-col justify-center border-t border-gray-200 divide-y divide-gray-200 md:border-t-0"
              >
                <li className="py-4 flex md:border-t-0">
                  <CheckIcon
                    className="flex-shrink-0 h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-base text-gray-500">
                    {quantity.value + " "} Optimistic Bunnies
                  </span>
                </li>
                <li className="py-4 flex">
                  <CheckIcon
                    className="flex-shrink-0 h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-base text-gray-500">
                    {quantity.value + " "} Pixelated Bunnies
                  </span>
                </li>
                {Number(quantity.value) > 0 && (
                  <li className="py-4 flex">
                    <CheckIcon
                      className="flex-shrink-0 h-6 w-6 text-green-500"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base text-gray-500">
                      1 ??? (per wallet)
                    </span>
                  </li>
                )}
                <li className="py-4 flex">
                  <CheckIcon
                    className="flex-shrink-0 h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-base text-gray-500">
                    Specialized content in Discord server
                  </span>
                </li>
                <li className="py-4 flex">
                  <CheckIcon
                    className="flex-shrink-0 h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-base text-gray-500">
                    Access to future airdrops
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

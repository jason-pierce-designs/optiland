import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { MintFormContext } from "../lib/state/mintForm";
import { formatEtherscanLink, parseBalance, shortenHex } from "../lib/utils";
import NFTCard from "./NFTCard";
import { calcRange } from "../lib/helpers";
import Link from "next/link";
import { WindowInstanceWithEthereum } from "../lib/types";

export default function MintStepThree() {
  const { account } = useWeb3React();
  const { state: formState, dispatch: formDispatch } =
    useContext(MintFormContext);
  const [products, setProducts] = useState<number[]>();
  const [subtotal, setSubtotal] = useState<BigNumber>();

  const startOver = () => {
    (window as WindowInstanceWithEthereum).location.reload();
    formDispatch({ type: "resetForm" });
  };

  useEffect(() => {
    if (formState.startingTokenId && formState.quantity && !subtotal) {
      const quan = BigNumber.from(formState.quantity);
      const total = formState.pricePerUnit?.mul(quan);
      setProducts(calcRange(formState.quantity, formState.startingTokenId));
      setSubtotal(total);
    }
  }, [formState, formDispatch, subtotal]);

  return (
    <div>
      <div className="max-w-2xl sm:rounded-b-lg mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:gap-x-8 xl:gap-x-24">
        <div>
          <h1 className="text-sm font-medium text-indigo-600">
            Payment successful
          </h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order and as it is still getting validated, hang
            tight and see what you minted!
          </p>

          <dl className="mt-16 text-sm font-medium">
            <dt className="text-gray-900">Transaction number (hash)</dt>
            <dd className="mt-2 text-indigo-600">
              {formState.receipt &&
                formState.receipt.transactionHash.toString()}
            </dd>
          </dl>

          <ul
            role="list"
            className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
          >
            {products &&
              products.map((product) => (
                <li key={product} className="flex py-6 space-x-6">
                  <div className="h-32 w-36">
                    <NFTCard collection="bunny" id={product} variant="noinfo" />
                  </div>

                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <Link href={`/collections/bunny/${product}`} passHref>
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={`/collections/bunny/${product}`}
                        >
                          Bunny{`#${product}`}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <p className="flex flex-none justify-center font-medium text-gray-900">
                    <span className="mt-0 mr-2 h-2 w-2">
                      <FontAwesomeIcon icon={faEthereum} />
                    </span>{" "}
                    {parseBalance(formState.pricePerUnit.toString())}
                  </p>
                </li>
              ))}
            {products &&
              products.map((product) => (
                <li key={product} className="flex py-6 space-x-6">
                  <div className="h-32 w-36">
                    <NFTCard
                      collection="pbunny"
                      id={product}
                      variant="noinfo"
                    />
                  </div>

                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <Link href={`/collections/pbunny/${product}`} passHref>
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={`/collections/pbunny/${product}`}
                        >
                          Pixelated Bunny{`#${product}`}
                        </a>
                      </Link>
                    </h3>
                    <p>To be airdropped within 1-2 weeks</p>
                  </div>
                  <p className="flex flex-none font-medium text-gray-900">
                    <span className="mt-0 mr-2 h-2 w-2">
                      <FontAwesomeIcon icon={faEthereum} />
                    </span>{" "}
                    <span className="line-through">
                      {parseBalance(formState.pricePerUnit.toString())}
                    </span>
                  </p>
                </li>
              ))}
          </ul>

          <dl className="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="flex flex-none text-gray-900">
                {" "}
                <span className="mt-0 mr-2 h-2 w-2">
                  <FontAwesomeIcon icon={faEthereum} />
                </span>{" "}
                {subtotal && parseBalance(subtotal.toString())}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt>Gas</dt>
              <dd className="flex flex-none text-gray-900">
                {" "}
                <span className="mt-0 mr-2 h-2 w-2">
                  <FontAwesomeIcon icon={faEthereum} />
                </span>{" "}
                {formState.receipt?.cumulativeGasUsed &&
                  parseBalance(
                    formState.receipt.cumulativeGasUsed.toString(),
                    18,
                    18
                  )}
              </dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-8">
              <dt className="text-base">Total</dt>
              <dd className="text-base flex">
                {" "}
                <span className="mt-0 mr-2 h-3 w-3">
                  <FontAwesomeIcon icon={faEthereum} />
                </span>{" "}
                {formState.receipt &&
                  subtotal &&
                  parseBalance(
                    subtotal.add(formState.receipt.cumulativeGasUsed),
                    18
                  )}
              </dd>
            </div>
          </dl>

          <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">
                Transaction Information
              </dt>
              <dd className="mt-2">
                <div className="not-italic">
                  <span className="block">
                    Smart Contract Address:{" "}
                    {process.env.NEXT_PUBLIC_BUNNY_ADDRESS}
                  </span>
                  <span className="block">
                    Etherscan:{" "}
                    {formState.receipt && (
                      <a
                        className="text-red-600 hover:text-red-500 underline"
                        target="_blank"
                        rel="noreferrer"
                        href={formatEtherscanLink(
                          "Transaction",
                          formState.receipt.transactionHash
                        )}
                      >
                        Open in new tab
                      </a>
                    )}
                  </span>
                  <span className="block">
                    Account: {account && shortenHex(account, 6)}
                  </span>
                </div>
              </dd>
            </div>
          </dl>

          <div className="mt-16 border-t border-gray-200 py-6 text-right">
            <button
              onClick={startOver}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Minting<span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import Modal from "./Modal";
import { formatEtherscanLink, parseBalance, shortenHex } from "../lib/utils";
import { CheckIcon } from "@heroicons/react/outline";
import Image from "next/image";
import NFTCard from "./NFTCard";
import useSWR from "swr";
import { calcRange, getBaseUrl } from "../lib/helpers";
import { BunnyMetadata } from "../lib";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$36.00",
    color: "Charcoal",
    size: "L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg",
    imageAlt: "Model wearing men's charcoal basic tee in large.",
  },
  // More products...
];

// const getTotalMinted = async (contract: Contract) => {
//   try {
//     return await contract?.methods.totalSupply().call();
//   } catch (e) {
//     return e;
//   }
// };

export default function MintStepThree() {
  const { library, account, chainId } = useWeb3React();
  const baseUrl = getBaseUrl();
  const { state: formState, dispatch: formDispatch } =
    useContext(MintFormContext);
  const { dispatch: stepperDispatch } = useContext(StepperContext);
  const [products, setProducts] = useState<number[]>();

  useEffect(() => {
    if (formState.startingTokenId && formState.quantity) {
      setProducts(calcRange(formState.quantity, formState.startingTokenId));
    }
  }, [formState]);

  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:gap-x-8 xl:gap-x-24">
        <div>
          <h1 className="text-sm font-medium text-indigo-600">
            Payment successful
          </h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order and as it is still getting validated, hang
            tight and we&apos;ll send you confirmation very soon!
          </p>

          <dl className="mt-16 text-sm font-medium">
            <dt className="text-gray-900">Transaction number</dt>
            <dd className="mt-2 text-indigo-600">
              {formState.receipt?.transactionHash}
            </dd>
          </dl>

          <ul
            role="list"
            className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
          >
            {products &&
              products.map((product) => (
                <li key={product} className="flex py-6 space-x-6">
                  {/* <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="flex-none w-24 h-24 bg-gray-100 rounded-md object-center object-cover"
                /> */}
                  <NFTCard
                    collection="bunny"
                    id={product}
                    width={24 * 16}
                    height={24 * 16}
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <Link href={`collections/bunny/${product}`}>
                        {`#${product}`}
                      </Link>
                    </h3>
                    <p>
                      Token ID: {"#"}
                      {product}
                    </p>
                  </div>
                  <p className="flex-none font-medium text-gray-900">
                    {formState.pricePerUnit.toString()}
                  </p>
                </li>
              ))}
            {products &&
              products.map((product) => (
                <li key={product} className="flex py-6 space-x-6">
                  {/* <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="flex-none w-24 h-24 bg-gray-100 rounded-md object-center object-cover"
                /> */}
                  <NFTCard
                    collection="bunny"
                    id={product}
                    width={24 * 16}
                    height={24 * 16}
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <Link href={`collections/pbunny/${product}`}>
                        {`#${product}`}
                      </Link>
                    </h3>
                    <p>
                      Token ID: {"#"}
                      {product}
                    </p>
                  </div>
                  <p className="flex-none font-medium text-gray-900">
                    {formState.pricePerUnit}
                  </p>
                </li>
              ))}
          </ul>

          <dl className="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="text-gray-900">$72.00</dd>
            </div>

            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="text-gray-900">$8.00</dd>
            </div>

            <div className="flex justify-between">
              <dt>Taxes</dt>
              <dd className="text-gray-900">$6.40</dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
              <dt className="text-base">Total</dt>
              <dd className="text-base">$86.40</dd>
            </div>
          </dl>

          <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">Shipping Address</dt>
              <dd className="mt-2">
                <address className="not-italic">
                  <span className="block">Kristin Watson</span>
                  <span className="block">7363 Cynthia Pass</span>
                  <span className="block">Toronto, ON N3Y 4H8</span>
                </address>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Payment Information</dt>
              <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                <div className="flex-none">
                  <svg
                    aria-hidden="true"
                    width={36}
                    height={24}
                    viewBox="0 0 36 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-auto"
                  >
                    <rect width={36} height={24} rx={4} fill="#224DBA" />
                    <path
                      d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                      fill="#fff"
                    />
                  </svg>
                  <p className="sr-only">Visa</p>
                </div>
                <div className="flex-auto">
                  <p className="text-gray-900">
                    {account && shortenHex(account, 6)}
                  </p>
                  <p>Expires 12 / 21</p>
                </div>
              </dd>
            </div>
          </dl>

          <div className="mt-16 border-t border-gray-200 py-6 text-right">
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Minting<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

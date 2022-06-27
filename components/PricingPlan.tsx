/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";

const citizenFeatures = [
  "FREE with Bunny Purchase!",
  "One airdrop per holder",
  "Realistic anime style",
];
const pbunnyFeatures = [
  "FREE with Bunny purchase",
  "Unique accessories",
  "More chances for rare NFT's",
];
const bunnyFeatures = [
  "First NFT Collection on Optimism",
  "Amazingly detailed illustrations",
  "Exclusive access to future collections",
  "Featuring 112 accessories and traits",
  "Get a Pixelated Bunny ($PBUNNY) for free!",
];

export default function PricingPlan() {
  return (
    <div className="bg-gray-900 -mx-5 sm:-mx-6">
      <div className="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
        <div className="text-center">
          <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            up to 10% goes to public goods
          </p>
          <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
            We chose to release all our collections on Optimism because we want
            NFT holders to appreciate the art without spending an arm and a leg
            on fees. We also believe in supporting public goods funding to
            support infrastructure building on Ethereum. Therefore, we make
            donations to{" "}
            <a
              className="underline hover:text-red-500"
              href="https://medium.com/ethereum-optimism/retroactive-public-goods-funding-33c9b7d00f0c"
            >
              retroactive public goods
            </a>{" "}
            at each milestone.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
        <div className="relative z-0">
          <div className="absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative lg:grid lg:grid-cols-7">
              <div className="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                <div className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg">
                  <div className="flex-1 flex flex-col">
                    <div className="bg-white px-6 py-10">
                      <div>
                        <h3
                          className="text-center text-2xl font-medium text-gray-900"
                          id="tier-hobby"
                        >
                          Pixelated Bunnies
                        </h3>
                        <div className="mt-4 flex items-center justify-center">
                          <span className="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                            <span className="mt-2 mr-2 text-4xl font-medium">
                              OΞ
                            </span>
                            <span className="font-extrabold">0.00</span>
                          </span>
                          <span className="text-xl font-medium text-gray-500">
                            /PBUNNY
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                      <ul role="list" className="space-y-4">
                        {pbunnyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon
                                className="flex-shrink-0 h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base font-medium text-gray-500">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <div className="rounded-lg shadow-md">
                          <Link
                            href="/mint"
                            passHref
                            aria-describedby="tier-hobby"
                          >
                            <div className="cursor-pointer block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-red-600 hover:bg-gray-50">
                              Mint a BUNNY
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
                <div className="relative z-10 rounded-lg shadow-xl">
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg border-2 border-red-600"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 top-0 transform translate-y-px">
                    <div className="flex justify-center transform -translate-y-1/2">
                      <span className="inline-flex rounded-full bg-red-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                        Original Set
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-t-lg px-6 pt-12 pb-10">
                    <div>
                      <h3
                        className="text-center text-3xl font-semibold text-gray-900 sm:-mx-6"
                        id="tier-growth"
                      >
                        Optimistic Bunnies
                      </h3>
                      <div className="mt-4 flex items-center justify-center">
                        <span className="px-3 flex items-start text-6xl tracking-tight text-gray-900 sm:text-6xl">
                          <span className="mt-2 mr-2 text-4xl font-medium">
                            OΞ
                          </span>
                          <span className="font-extrabold">0.025</span>
                        </span>
                        <span className="text-2xl font-medium text-gray-500">
                          /BUNNY
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
                    <ul role="list" className="space-y-4">
                      {bunnyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckIcon
                              className="flex-shrink-0 h-6 w-6 text-green-500"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="ml-3 text-base font-medium text-gray-500">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <div className="rounded-lg shadow-md">
                        <Link
                          href="/mint"
                          passHref
                          aria-describedby="tier-growth"
                        >
                          <div className="cursor-pointer block w-full text-center rounded-lg border border-transparent bg-red-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-red-700">
                            Mint a BUNNY
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3">
                <div className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg">
                  <div className="flex-1 flex flex-col">
                    <div className="bg-white px-6 py-10">
                      <div>
                        <h3
                          className="text-center text-2xl font-medium text-gray-900"
                          id="tier-scale"
                        >
                          Optiland Citizens
                        </h3>
                        <div className="mt-4 flex items-center justify-center">
                          <span className="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                            <span className="mt-2 mr-2 text-4xl font-medium">
                              OΞ
                            </span>
                            <span className="font-extrabold">0.00</span>
                          </span>
                          <span className="text-xl font-medium text-gray-500">
                            /OC
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                      <ul role="list" className="space-y-4">
                        {citizenFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon
                                className="flex-shrink-0 h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base font-medium text-gray-500">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <div className="rounded-lg shadow-md">
                          <Link
                            href="/mint"
                            passHref
                            aria-describedby="tier-hobby"
                          >
                            <div className="cursor-pointer block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-red-600 hover:bg-gray-50">
                              Mint a BUNNY
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

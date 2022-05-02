import React from "react";
import Link from "next/link";

const faqs = [
  {
    question: "What is Optiland?",
    answer: `Optiland is an NFT community on Optimism started by an idea that 
       different people in the real world have many differences between them
       but still believe in helping each other out and reaching toward an 
       optimistic future together. Our NFT collections were created with the 
       idea that the personalities should vary like we do, and take advantage
       of low minting fees as much as possible`,
  },
];

export default function FAQs() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              FAQ&apos;s
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Can’t find the answer you’re looking for? Reach out to us on our{" "}
              <a
                href="/discord"
                className="font-medium text-indigo-600 hover:text-indigo-700"
              >
                Discord
              </a>{" "}
              server.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Airdrops go out in batches, usually once or twice per week.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-12">
              {faqs &&
                faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
            </dl>
            <dl className="space-y-12">
              <div>
                <dt className="mt-12 text-lg leading-6 font-medium text-gray-900">
                  How do I mint an Optiland NFT?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  1. You need to transfer your Ether using Metamask from the
                  Ethereum network to the Optimism network through either the
                  official{" "}
                  <Link passHref href="https://gateway.optimism.io/">
                    <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
                      Optimism gateway
                    </span>
                  </Link>{" "}
                  or{" "}
                  <Link passHref href="https://app.hop.exchange/send">
                    <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
                      {" "}
                      hop exchange.
                    </span>
                  </Link>
                </dd>
                <dd className="mt-2 text-base text-gray-500">
                  2. Hop over to our <Link href="/mint">Mint</Link> page,
                  connect your MetaMask wallet, pick the collection you wish to
                  mint from, and follow the prompts until your transaction is
                  complete. Don&amp;t forget to stay on Optimism!
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Where does my NFT go after I purchase it?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Once you mint an NFT, it is forever linked to the account that
                  made the transaction(s). To see your NFT&apos;s in your
                  MetaMask wallet, copy the contract address and take note of
                  the TokenID for your tokens on{" "}
                  <Link passHref href="https://optimistic.etherscan.io/">
                    <span className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      Etherscan
                    </span>
                  </Link>
                  , and enter them when you import the NFT&apos;s into your
                  wallet.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Do I get Pixelated Bunnies for free?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Until minting of Optmistic Bunnies is complete, for each one
                  you mint, you will get a Pixelated Bunny airdropped to you for
                  free!
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What about Optiland Citizens? Are they really free too?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes! Here at Optiland, we recognize that anime-styled
                  NFT&apos;s are gaining in popularity and wanted to give the OG
                  Bunny holders the first release of our exclusive set, Optiland
                  Citizens.
                </dd>
                <dd>Limit: one per customer, while supplies last</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

import { BigNumber, Contract, ContractInterface } from "ethers";
import React, { useEffect, useState } from "react";

import { hooks } from "../lib/connectors/metaMask";
import BUNNIES_CONTRACT_ABI from "../lib/contracts/bunny.json";
import CITIZENS_CONTRACT_ABI from "../lib/contracts/citizens.json";
import PIXEL_CONTRACT_ABI from "../lib/contracts/citizens.json";
import { getTotalMinted } from "../lib/helpers";

const { useProvider } = hooks;

export default function Tokenomics() {
  const provider = useProvider();
  const [contract, setContract] = useState<Contract>();
  const [bunniesMinted, setBunniesMinted] = useState<BigNumber>();
  const [pBunniesMinted, setPBunniesMinted] = useState<BigNumber>();
  const [citizensMinted, setCitizensMinted] = useState<BigNumber>();

  useEffect(() => {
    if (provider && !contract) {
      const abi: ContractInterface = BUNNIES_CONTRACT_ABI;
      const cabi: ContractInterface = CITIZENS_CONTRACT_ABI;
      const pabi: ContractInterface = PIXEL_CONTRACT_ABI;

      const opBunnyContract = new Contract(
        process.env.NEXT_PUBLIC_BUNNY_ADDRESS as string,
        abi,
        provider
      );
      const pBunnyContract = new Contract(
        process.env.NEXT_PUBLIC_PBUNNY_ADDRESS as string,
        pabi,
        provider
      );
      const citizensContract = new Contract(
        process.env.NEXT_PUBLIC_CITIZEN_ADDRESS as string,
        cabi,
        provider
      );

      setContract(opBunnyContract);

      if (!bunniesMinted) {
        getTotalMinted(opBunnyContract)
          .then((totalMinted) => setBunniesMinted(BigNumber.from(totalMinted)))
          .catch(() => setBunniesMinted(undefined));
      }
      if (!citizensMinted) {
        getTotalMinted(citizensContract)
          .then((totalMinted) => setCitizensMinted(BigNumber.from(totalMinted)))
          .catch(() => setCitizensMinted(undefined));
      }
      if (!pBunniesMinted) {
        getTotalMinted(pBunnyContract)
          .then((totalMinted) => setPBunniesMinted(BigNumber.from(totalMinted)))
          .catch(() => setPBunniesMinted(undefined));
      }
    }
  }, [provider, contract, bunniesMinted, citizensMinted, pBunniesMinted]);

  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Optiland Tokenomics
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            connect your wallet to see mint totals
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                {bunniesMinted ? (
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      OG Bunnies Minted
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      {bunniesMinted && bunniesMinted.toNumber()}
                    </dd>
                  </div>
                ) : (
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Total Supply
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      5151
                    </dd>
                  </div>
                )}

                {pBunniesMinted ? (
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Pixelated Bunnies airdropped
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      {pBunniesMinted && pBunniesMinted.toNumber()}
                    </dd>
                  </div>
                ) : (
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Staff Allocation
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      10
                    </dd>
                  </div>
                )}
                {citizensMinted ? (
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Citizens airdopped
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      {citizensMinted && citizensMinted.toNumber()}
                    </dd>
                  </div>
                ) : (
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Saved in fees
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      10x-100x
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

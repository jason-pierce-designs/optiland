import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { hooks, metaMask } from "../../lib/connectors/metaMask";
import { AbiItem } from "web3-utils";

import BUNNIES_CONTRACT_ABI from "../../lib/contracts/bunny.json";
import PIXEL_CONTRACT_ABI from "../../lib/contracts/pbunny.json";
import getLibrary from "../../lib/getLibrary";
import DarkOverlapShell from "../../components/DarkOverlapShell";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import DarkNavbar from "../../components/DarkNavbar";
import { Contract, ContractInterface } from "@ethersproject/contracts";
import { getTokenOfOwnerByIndex } from "../../lib/helpers";
import NFTDetailView from "../../components/NFTDetailView";
import NFTCard from "../../components/NFTCard";
import { Web3Provider } from "@ethersproject/providers";

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function View() {
  const { account, chainId } = useWeb3React();
  const provider = useProvider();
  const [myBunnies, setMyBunnies] = useState<number[]>([]);
  const [myPixelBunnies, setMyPixelBunnies] = useState<number[]>([]);
  const [myBunniesLoading, setMyBunniesLoading] = useState<boolean>(false);
  const [myPixelLoading, setMyPixelLoading] = useState<boolean>(false);

  const getMyTokenIds = async (contract: Contract, account: string) => {
    let tokenIds: number[] = [];
    let index = 0;
    let hasError;
    while (!hasError) {
      await getTokenOfOwnerByIndex(contract, account, index).then((id) => {
        if (!Number(id)) {
          hasError = true;
        } else {
          tokenIds.push(Number(id));
          index++;
        }
      });
    }
    return tokenIds.sort((a, b) => a - b);
  };

  useEffect(() => {
    if (
      provider &&
      account &&
      chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID)
    ) {
      const opBunnyContract = new Contract(
        process.env.NEXT_PUBLIC_BUNNY_ADDRESS as string,
        BUNNIES_CONTRACT_ABI as ContractInterface,
        provider.getSigner()
      );
      const pixelBunnyContract = new Contract(
        process.env.NEXT_PUBLIC_BUNNY_ADDRESS as string,
        PIXEL_CONTRACT_ABI as ContractInterface,
        provider.getSigner()
      );
      if (myBunnies.length === 0 && !myBunniesLoading) {
        setMyBunniesLoading(true);
        getMyTokenIds(opBunnyContract, account).then((tokenIds) => {
          setMyBunnies(tokenIds);
          setMyBunniesLoading(false);
        });
      }
      if (myPixelBunnies.length === 0 && !myPixelLoading) {
        setMyPixelLoading(true);
        getMyTokenIds(pixelBunnyContract, account).then((tokenIds) => {
          setMyPixelBunnies(tokenIds);
          setMyPixelLoading(false);
        });
      }
    }
  }, [
    account,
    provider,
    chainId,
    myBunnies,
    myPixelBunnies,
    myBunniesLoading,
    myPixelLoading,
  ]);

  return (
    <>
      <Layout>
        <DarkNavbar />
        <DarkOverlapShell title="My Optiland NFT's">
          <div className="flex flex-col bg-white rounded-lg shadow">
            {myBunniesLoading && (
              <div className="px-4 py-5 sm:p-6 sm:mb-16">
                <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Loading...
                </h3>
              </div>
            )}
            {myBunnies.length > 0 && (
              <div className="px-4 py-5 sm:p-6 sm:mb-16">
                <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Optimistic Bunnies
                </h3>

                {myBunnies.length <= 5 ? (
                  <div className="flex flex-col mt-6">
                    {myBunnies.map((tokenId, idx) => (
                      <NFTDetailView
                        key={idx}
                        id={tokenId}
                        collection="bunny"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-8 2xl:grid-cols-12 md:gap-y-0 lg:gap-x-8">
                    {myBunnies.map((tokenId, idx) => (
                      <NFTCard key={idx} id={tokenId} collection="bunny" />
                    ))}
                  </div>
                )}
              </div>
            )}
            {myPixelBunnies.length > 0 && (
              <div className="px-4 py-5 sm:p-6 sm:mb-16">
                <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Pixelated Bunnies
                </h3>

                {myPixelBunnies.length <= 5 ? (
                  <div className="flex flex-col mt-6">
                    {myPixelBunnies.map((tokenId, idx) => (
                      <NFTDetailView
                        key={idx}
                        id={tokenId}
                        collection="pbunny"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-8 2xl:grid-cols-12 md:gap-y-0 lg:gap-x-8">
                    {myPixelBunnies.map((tokenId, idx) => (
                      <NFTCard key={idx} id={tokenId} collection="pbunny" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </DarkOverlapShell>
        <Footer />
      </Layout>
    </>
  );
}

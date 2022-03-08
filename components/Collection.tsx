import React, { useState } from "react";
import useSWR from "swr";
import { getBaseUrl } from "../lib/helpers";

import NFTCard from "./NFTCard";

const baseUrl = getBaseUrl();

export interface CollectionProps {
  token: string;
  title?: string;
}

export default function Collection({ token }: CollectionProps) {
  const [tokenIds, setTokenIds] = useState<number[]>([...Array(50).keys()]);

  return (
    <div className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="sr-only">Non-Fungible Tokens</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {tokenIds.map((tokenId, idx) => (
          <NFTCard collection={token} id={tokenId + 1} key={idx} />
        ))}
      </div>
    </div>
  );
}

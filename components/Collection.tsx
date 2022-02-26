import React from "react";

import NFTCard from "./NFTCard";

const products = [1, 2, 3, 4, 5, 6, 7, 8];

export interface CollectionProps {
  token: string;
  title?: string;
}

export default function Collection({ token }: CollectionProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Non-Fungible Tokens</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 md:gap-y-0 lg:gap-x-8">
        {products.map((product, idx) => (
          <NFTCard collection={token} id={product} key={idx} />
        ))}
      </div>
    </div>
  );
}

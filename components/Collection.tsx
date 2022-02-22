import React from "react";
import Image from "next/image";

import NFTCard from "./NFTCard";

const products = [1, 2, 3, 4, 5, 6, 7, 8];

export interface CollectionProps {
  token: string;
  title?: string;
}

export default function CollectionMainPage({ token }: CollectionProps) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product, idx) => (
            <NFTCard collection={token} id={product} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

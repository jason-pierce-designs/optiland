import React, { useState } from "react";
import Image from "next/image";
import { BunnyMetadata } from "../lib";
import { getImgUrlForCollection } from "../lib/helpers";
import PinkAlley from "/public/images/pink-alley-bg.jpg";

export interface NFTCardProps {
  id: number;
  collection: string;
  data: BunnyMetadata;
}

export default function NFTCard({ id, collection, data }: NFTCardProps) {
  const [image] = useState<string>(getImgUrlForCollection(collection, id));

  if (data) {
    return (
      <div className="group relative mb-10 border rounded-md">
        <div className="w-full bg-gray-200 rounded-t-md overflow-hidden group-hover:opacity-75 object-center object-cover">
          <Image
            src={image}
            alt={data?.description}
            width={400}
            height={400}
            layout="responsive"
          />
        </div>
        <div className="flex-1 p-4 space-y-2 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900">
            <a href={`/collections/${collection}/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {data.name}
            </a>
          </h3>
          {/* <p className="text-sm text-gray-500">{metadata.description}</p>
    <div className="flex-1 flex flex-col justify-end">
      <p className="text-sm italic text-gray-500">{metadata.description}</p>
      <p className="text-base font-medium text-gray-900">0.025 OΞ</p>
    </div> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
        <div className="aspect-w-3 aspect-h-4 bg-gray-200 animate-pulse group-hover:opacity-75 sm:aspect-none sm:h-96"></div>
        <div className="flex-1 p-4 space-y-2 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900">
            Data could not be loaded
          </h3>
        </div>
      </div>
    );
  }
}

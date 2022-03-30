import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BunnyMetadata } from "../lib";
import { getBaseUrl, getImgUrlForCollection } from "../lib/helpers";
import useSWR from "swr";

export interface NFTCardProps {
  id: number;
  collection: string;
  data?: BunnyMetadata;
  width?: number;
  height?: number;
}

export default function NFTCard({
  id,
  collection,
  data,
  width,
  height,
}: NFTCardProps) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/meta/${collection}/${id}`;
  const { data: fetchedData }: { data?: BunnyMetadata } = useSWR(
    data ? null : url
  );

  const [image] = useState<string>(getImgUrlForCollection(collection, id));

  if (data || fetchedData) {
    const metadata = data || fetchedData;
    return (
      <div className="group relative mb-10 border rounded-md">
        <div className="w-full bg-gray-200 rounded-t-md overflow-hidden group-hover:opacity-75 object-center object-cover">
          <Image
            src={image}
            alt={metadata?.description}
            width={width || 400}
            height={height || 400}
            layout="responsive"
          />
        </div>
        {metadata && (
          <div className="flex-1 p-4 space-y-2 flex flex-col">
            <h3 className="text-sm font-medium text-gray-900">
              <a href={`/collections/${collection}/${id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {metadata.name}
              </a>
            </h3>
            {/* <p className="text-sm text-gray-500">{metadata.description}</p>
    <div className="flex-1 flex flex-col justify-end">
      <p className="text-sm italic text-gray-500">{metadata.description}</p>
      <p className="text-base font-medium text-gray-900">0.025 OΞ</p>
    </div> */}
          </div>
        )}
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

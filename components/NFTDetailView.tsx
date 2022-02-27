import React, { useState } from "react";
import Image from "next/image";
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/outline";
import {
  classNames,
  getImgUrlForCollection,
  getLocalMetadata,
} from "../lib/helpers";
import { BunnyMetadata } from "../lib";
import Breadcrumbs from "./Breadcrumbs";
import Attributes from "./Attributes";

const product = {
  name: "",
  href: "",
  price: "",
  description: "",
  imageSrc: "",
  imageAlt: "",
  sizes: [
    { name: "18L", description: "Perfect for a reasonable amount of snacks." },
    { name: "20L", description: "Enough room for a serious amount of snacks." },
  ],
};

const pages = [
  { name: "Collections", href: "/collections", current: false },
  { name: "Bunny", href: "/collections/bunny", current: false },
  { name: "Bunny#643", current: true },
];

export interface NFTDetailViewProps {
  metadata: BunnyMetadata;
  id: number;
  collection: string;
}

export default function NFTDetailView({
  metadata,
  collection,
  id,
}: NFTDetailViewProps) {
  const [image] = useState<string>(getImgUrlForCollection(collection, id));

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-6 pt-0 pb-3 lg:max-w-7xl lg:px-8 lg:py-12 lg:grid lg:grid-cols-2 lg:gap-x-8">
      {/* Product details */}
      <div className="lg:max-w-lg lg:self-start">
        <div className="hidden md:flex">
          <Breadcrumbs pages={pages} />
        </div>

        <section aria-labelledby="information-heading" className="mt-0 md:mt-4">
          <h2 id="information-heading" className="sr-only">
            Product information
          </h2>

          <div className="mt-0 md:mt-4 space-y-6">
            <p className="text-base text-gray-500">{metadata.description}</p>
          </div>
        </section>
      </div>

      {/* Product image */}
      <div className="mt-4 md:mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
        <div className="aspect-square rounded-lg overflow-hidden w-full h-full">
          <Image
            src={image}
            alt={metadata.description}
            width={680}
            height={680}
            layout="responsive"
          />
        </div>
      </div>

      {/* Product form */}
      <div className="mt-5 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
        <section aria-labelledby="attributes-heading">
          <h2 id="attributes-heading" className="sr-only">
            Product options
          </h2>

          <Attributes
            attributes={metadata.attributes}
            collection={collection}
          />

          {/* <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Trade on Quixotic
            </button>
          </div> */}
        </section>
      </div>
    </div>
  );
}

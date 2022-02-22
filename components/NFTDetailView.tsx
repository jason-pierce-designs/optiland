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
const reviews = { average: 4, totalCount: 1624 };

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

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-6 py-12 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
      {/* Product details */}
      <div className="lg:max-w-lg lg:self-start">
        <Breadcrumbs pages={pages} />

        <section aria-labelledby="information-heading" className="mt-4">
          <h2 id="information-heading" className="sr-only">
            Product information
          </h2>

          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-500">{metadata.description}</p>
          </div>
        </section>
      </div>

      {/* Product image */}
      <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
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
      <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
        <section aria-labelledby="options-heading">
          <h2 id="options-heading" className="sr-only">
            Product options
          </h2>

          <form>
            <div className="sm:flex sm:justify-between">
              {/* Size selector */}
              <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                  Size
                </RadioGroup.Label>
                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {product.sizes.map((size) => (
                    <RadioGroup.Option
                      as="div"
                      key={size.name}
                      value={size}
                      className={({ active }) =>
                        classNames(
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label
                            as="p"
                            className="text-base font-medium text-gray-900"
                          >
                            {size.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="p"
                            className="mt-1 text-sm text-gray-500"
                          >
                            {size.description}
                          </RadioGroup.Description>
                          <div
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "absolute -inset-px rounded-lg pointer-events-none"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

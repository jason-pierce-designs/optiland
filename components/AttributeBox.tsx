import React, { useEffect, useState } from "react";
import { Attribute } from "../lib";
import { getAttributePercentage } from "../lib/helpers";

export interface AttributeBoxProps {
  attribute: Attribute;
  collection: string;
}

export default function AttributeBox({
  attribute,
  collection,
}: AttributeBoxProps) {
  const [percentage, setPercentage] = useState<number>();

  useEffect(() => {
    if (!percentage) {
      getAttributePercentage(collection, attribute)
        .then((percentage) => {
          percentage && setPercentage(Object.values(percentage)[0]);
        })
        .catch((e) => console.log(e));
    }
  }, [percentage, attribute, collection]);

  return (
    <div className="px-2 py-3 sm:p-4 first:border-t-gray-200">
      <dt className="text-base font-normal text-gray-900">
        {attribute.trait_type.toString()}
      </dt>
      <dd className="mt-1 flex justify-between items-baseline">
        <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
          {attribute.value.toString()}
        </div>

        <div>
          <span className="ml-2 text-sm font-medium text-gray-800">
            have this trait:{" "}
          </span>
          <div className="bg-green-100 text-green-800 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
            {percentage}%
          </div>
        </div>
      </dd>
    </div>
  );
}

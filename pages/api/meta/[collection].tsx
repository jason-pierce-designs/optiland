import type { NextApiRequest, NextApiResponse } from "next";
import { BunnyMetadata } from "../../../lib";
import pbunnydata from "./pbunny-metadata-sorted.json";
import bunnydata from "./bunny-metadata-sorted.json";
import * as R from "ramda";

const getJsonData = (collection: string) => {
  console.log("NEW collection is: ", collection);
  switch (collection) {
    case "bunny":
      return bunnydata as BunnyMetadata[];
      break;
    case "pbunny":
      return pbunnydata as BunnyMetadata[];
      break;
    default:
      return bunnydata as BunnyMetadata[];
      break;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collection, filter, pages, page, pagesize, id } = req.query;
  const json_data: BunnyMetadata[] = getJsonData(collection as string);

  if (id) {
    const tokenId = Number(id) - 1;
    // returning a list of a particular token
    // console.log("id is: ", id);
    // console.log("collection is: ", collection);
    console.log("meta is: ", json_data[tokenId]);
    res.status(200).json(json_data[tokenId]);
  } else {
    // returning a sorted paginated list
    const quantity = Number(pagesize) * Number(pages);
    const BUNNY_QTY = json_data && json_data.length;
    const totalDropping = BUNNY_QTY - quantity;
    // console.log("page is: ", page);
    // console.log("pagesize is: ", pagesize);
    // console.log("quantity: ", quantity);
    // console.log("totalDropping: ", totalDropping);
    // console.log("collection is: ", collection);
    let sortedData = R.dropLast(
      totalDropping,
      R.sort(R.ascend(R.prop("edition")), json_data)
    );
    if (Number(page) && Number(page) > 0) {
      sortedData = sortedData.splice(
        Number(pagesize) * (Number(page) - 1),
        Number(pagesize)
      );
    }
    res.status(200).json(sortedData);
  }
}

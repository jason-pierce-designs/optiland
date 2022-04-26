import type { NextApiRequest, NextApiResponse } from "next";
import { BunnyMetadata } from "../../../../lib";
import citizenMetadata from "../citizen-metadata-sorted.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const json_data: BunnyMetadata[] = citizenMetadata as BunnyMetadata[];
  const { tokenId } = req.query;
  const index = Number(tokenId) - 1;
  const metadata = json_data[index];
  res.status(200).json(metadata);
}

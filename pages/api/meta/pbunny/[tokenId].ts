import type { NextApiRequest, NextApiResponse } from "next";
import { BunnyMetadata } from "../../../../lib";
import pixelMetadata from "../pixel-metadata.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const json_data: BunnyMetadata[] = pixelMetadata as BunnyMetadata[];
  const { tokenId } = req.query;
  const index = Number(tokenId);
  const metadata = json_data.find((bunny) => bunny.edition === index);
  res.status(200).json(metadata);
}

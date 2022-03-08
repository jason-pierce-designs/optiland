import type { NextApiRequest, NextApiResponse } from "next";
import { BunnyMetadata } from "../../../../lib";
import bunnyMetadata from "../bunny-metadata.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const json_data: BunnyMetadata[] = bunnyMetadata as BunnyMetadata[];
  res.status(200).json(json_data);
}

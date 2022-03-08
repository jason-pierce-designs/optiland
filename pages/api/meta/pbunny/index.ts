import type { NextApiRequest, NextApiResponse } from "next";
import { BunnyMetadata } from "../../../../lib";
import pbunnyMetadata from "../pixel-metadata.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const json_data: BunnyMetadata[] = pbunnyMetadata as BunnyMetadata[];
  const metadata = json_data.sort(
    (a: BunnyMetadata, b: BunnyMetadata) => a.edition - b.edition
  );
  res.status(200).json(metadata);
}

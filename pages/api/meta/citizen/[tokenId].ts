import type { NextApiRequest, NextApiResponse } from "next";
const fsp = require("fs").promises;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { tokenId } = req.query;
    const data = await fsp.readFile(`../citizen/citizen${tokenId}.json`);
    const metadata = JSON.parse(data);
    res.status(200).json(metadata);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error reading data" });
  }
}

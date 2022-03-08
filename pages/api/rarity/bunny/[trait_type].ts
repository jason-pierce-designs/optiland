import type { NextApiRequest, NextApiResponse } from "next";
import background from "./background.json";
import body from "./body.json";
import clothes from "./clothes.json";
import eyes from "./eyes.json";
import head from "./head.json";
import mask from "./mask.json";
import mouth from "./mouth.json";
import neck from "./neck.json";
import personality from "./personality.json";
import wings from "./wings.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { trait_type, value } = req.query;
  let metadata;
  // console.log("trait_type is:", trait_type);
  // console.log("value is:", value);
  switch (trait_type) {
    case "background":
      metadata = background.find(
        (background) =>
          Object.keys(background)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "body":
      metadata = body.find(
        (body) => Object.keys(body)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "clothes":
      metadata = clothes.find(
        (clothes) => Object.keys(clothes)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "eyes":
      metadata = eyes.find(
        (eyes) => Object.keys(eyes)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "head":
      metadata = head.find(
        (head) => Object.keys(head)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "mask":
      metadata = mask.find(
        (mask) => Object.keys(mask)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "mouth":
      metadata = mouth.find(
        (mouth) => Object.keys(mouth)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "neck":
      metadata = neck.find(
        (neck) => Object.keys(neck)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "personality":
      metadata = personality.find(
        (personality) =>
          Object.keys(personality)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    case "wings":
      metadata = wings.find(
        (wings) => Object.keys(wings)[0].toString() === value.toString()
      );
      res.status(200).json(metadata);
      break;
    default:
      metadata = { "NONE FOUND": 0 };
      res.status(403).json("Error");
  }
  // console.log("meta is:", metadata);
}

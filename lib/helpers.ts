export function getImgUrlForCollection(collection: string, tokenId: number) {
  const pngUrl = collection === "bunny" ? "bunny" : "pixel";
  const imgSrc = `https://optiland.s3.amazonaws.com/${collection}/${pngUrl}${tokenId}.png`;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: string
) {
  switch (type) {
    case "Account": {
      const address = data;
      return `${process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL}/address/${address}`;
    }
    case "Transaction": {
      const hash = data;
      return `${process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL}/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

export const removeUndefinedForNextJsSerializing = <T>(props: T): T =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined)
  ) as T;

export const getBgColor = (colorName: string) => {
  const colors = {
    Yellow: "#444444aa",
    Red: "#cccccc66",
    Blue: "#cccccc66",
    Green: "#cccccc66",
    Purple: "#cccccc66",
    Orange: "#cccccc66",
    Cyan: "#444444aa",
  };
  switch (colorName) {
    case "Yellow":
      return colors.Yellow;
      break;
    case "Red":
      return colors.Red;
      break;
    case "Blue":
      return colors.Blue;
      break;
    case "Green":
      return colors.Green;
      break;
    case "Purple":
      return colors.Purple;
      break;
    case "Orange":
      return colors.Orange;
      break;
    case "Cyan":
      return colors.Cyan;
      break;
    default:
      return colors.Red;
  }
};

export const getQuixoticTradeHref = (token: string, tokenId: string) => {
  const contractAddress =
    token === "bunny"
      ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      : process.env.NEXT_PUBLIC_PIXELATED_CONTRACT_ADDRESS;
  return `https://quixotic.io/asset/opt/${contractAddress}/${tokenId}`;
};

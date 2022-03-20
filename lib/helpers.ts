import { Contract } from "web3-eth-contract";
import { Attribute, BunnyMetadata } from ".";

export function getImgUrlForCollection(collection: string, tokenId: number) {
  const pngUrl = collection === "bunny" ? "bunny" : "pixel";
  const imgSrc = `https://optiland.s3.amazonaws.com/${collection}/${pngUrl}${tokenId}.png`;
  return imgSrc;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getAttributePercentage = async (
  collection: string,
  attribute: Attribute
) => {
  const res: Response = await fetch(
    `/api/rarity/${collection}/${attribute.trait_type.toLowerCase()}?value=${
      attribute.value
    }`
  );
  const data: { [key: string]: number } = await res.json();
  return data;
};

export const getLocalMetadata = async (token: string, tokenId: number) => {
  try {
    const res: Response = await fetch(`/api/meta/${token}?id=${tokenId}`);
    const data: BunnyMetadata = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return new Error(`the error is: ${e}`);
  }
};

export const getTotalMinted = async (contract: Contract) => {
  try {
    return await contract?.methods.totalSupply().call();
  } catch (e) {
    return e;
  }
};

export const getTokenOfOwnerByIndex = async (
  contract: Contract,
  account: string,
  index: number
) => {
  try {
    return await contract?.methods.tokenOfOwnerByIndex(account, index).call();
  } catch (e) {
    return new Error("end of array bounds");
  }
};

export const getMyBunnies = async (contract: Contract, account: string) => {
  let tokenIds: number[] = [];
  let index = 0;
  let hasError;
  while (!hasError) {
    await getTokenOfOwnerByIndex(contract, account, index).then((id) => {
      if (!Number(id)) {
        hasError = true;
      } else {
        tokenIds.push(Number(id));
        index++;
      }
    });
  }

  return tokenIds.sort((a, b) => a - b);
};

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export const networkReqObj: RequestArguments = {
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID_HEX,
      chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
      nativeCurrency: {
        name: "Ether",
        symbol: "OE",
        decimals: 18,
      },
      rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
      blockExplorerUrls: [process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL],
    },
  ],
};

export const connectToOptimism = () => {
  (window as any).ethereum?.request(networkReqObj);
};

export const getQuixoticTradeHref = (token: string, tokenId: string) => {
  let contractAddress;
  switch (token) {
    case "bunny":
      contractAddress = process.env.NEXT_PUBLIC_BUNNY_ADDRESS;
      break;
    case "pbunny":
      contractAddress = process.env.NEXT_PUBLIC_PBUNNY_ADDRESS;
      break;
    default:
      contractAddress = process.env.NEXT_PUBLIC_BUNNY_ADDRESS;
  }
  return `https://quixotic.io/asset/opt/${contractAddress?.toUpperCase()}/${tokenId}`;
};

export const getEtherscanTokenHref = (token: string, tokenId: string) => {
  let contractAddress;
  switch (token) {
    case "bunny":
      contractAddress = process.env.NEXT_PUBLIC_BUNNY_ADDRESS;
      break;
    case "pbunny":
      contractAddress = process.env.NEXT_PUBLIC_PBUNNY_ADDRESS;
  }
  return `${process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL}/token/${contractAddress}?a=${tokenId}`;
};

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://optiland.vercel.app`
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASEURL;
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGES = 1;
export const DEFAULT_PAGESIZE = 50;

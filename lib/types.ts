export interface iPerson {
  name: string;
  email?: string;
  role?: string;
  imageUrl?: StaticImageData;
  bio?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export interface iNavLink {
  name: string;
  href?: string;
  current?: boolean;
  onClick?: () => void;
}

export interface iBunnyMetadata {
  dna: string;
  name: string;
  description: string;
  image: string;
  imageHash: string;
  edition: number;
  date: number;
  attributes: iAttribute[];
  creator: string;
}

export interface iResponse {
  status?: string;
  message?: string;
  result?: iResultEntity[] | null;
}

/**
 * @description the following interfaces are
 *  used for querying Etherscan
 */
export interface iAttribute {
  trait_type: string;
  value: string;
}
export interface iResultEntity {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  tokenID: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

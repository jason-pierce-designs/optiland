import React from "react";
import { AbiItem } from "web3-utils";
import useContract from "./useContract";

export default function useTokenContract(tokenAddress: string, abi: AbiItem[]) {
  return useContract(tokenAddress, abi);
}

import { Eth } from "web3-eth";
import { Contract } from "web3-eth-contract";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract(
  address: string,
  ABI: any
): Contract | null {
  const { library, chainId } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId || !Eth) {
      return null;
    }

    try {
      const eth = new Eth(library);
      const contract = new eth.Contract(ABI, address);
      return contract;
    } catch (error) {
      console.error("Failed To Get Contract", error);

      return null;
    }
  }, [address, ABI, library, chainId]);
}

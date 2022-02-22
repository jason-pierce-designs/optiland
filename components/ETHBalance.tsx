import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../lib/hooks/useEthBalance";
import { parseBalance } from "../lib/utils";

const ETHBalance = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account as string);

  return <>Balance: {parseBalance(data ?? 0)} OΞ</>;
};

export default ETHBalance;

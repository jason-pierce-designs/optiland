import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 10, 56, 69, 42, 61, 137, 43114, 42161],
});

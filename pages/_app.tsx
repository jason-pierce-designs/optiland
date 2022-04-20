import React from "react";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import "../styles/globals.css";
import { StepperProvider } from "../lib/state/stepper";
import { MintFormProvider } from "../lib/state/mintForm";
import { MetaMask } from "@web3-react/metamask";
// import type { Connector } from "@web3-react/types";
import { hooks as metaMaskHooks, metaMask } from "../lib/connectors/metaMask";

// function getName(connector: Connector) {
//   if (connector instanceof MetaMask) return "MetaMask";
//   return "Unknown";
// }

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Web3ReactProvider connectors={connectors}>
        <MintFormProvider>
          <StepperProvider>
            <Component {...pageProps} />
          </StepperProvider>
        </MintFormProvider>
      </Web3ReactProvider>
    </SWRConfig>
  );
}

export default MyApp;

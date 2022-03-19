import React from "react";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../lib/getLibrary";
import "../styles/globals.css";
import { StepperProvider } from "../lib/state/stepper";
import { MintFormProvider } from "../lib/state/mintForm";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
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

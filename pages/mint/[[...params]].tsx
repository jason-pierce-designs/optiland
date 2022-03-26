import React, { useContext, useState } from "react";

import Layout from "../../components/Layout";
import DarkNavbar from "../../components/DarkNavbar";
import DarkOverlapShell from "../../components/DarkOverlapShell";
import Footer from "../../components/Footer";
import Stepper from "../../components/Stepper";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../lib/utils";
import { MintFormContext } from "../../lib/state/mintForm";
import { useWeb3React } from "@web3-react/core";
import Button from "../../components/Button";
import { StepperContext } from "../../lib/state/stepper";
import MintStepOne from "../../components/MintStepOne";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, variable } = context.query;
  // console.log("collection is: ", params);

  return {
    props: removeUndefinedForNextJsSerializing({
      params,
      variable,
    }),
  };
};

export default function MintDeepLink({
  params,
  variable,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { library, account, chainId } = useWeb3React();
  const { state: formState, dispatch: formDispatch } =
    useContext(MintFormContext);
  const { state, dispatch: stepperDispatch } = useContext(StepperContext);

  return (
    <>
      <Layout>
        <DarkNavbar activePath="/mint" />
        <DarkOverlapShell title="Mint">
          <div className="relative bg-white rounded-lg shadow">
            <Stepper />
            {!formState.isReadyForStep2 && <MintStepOne />}
            {formState.isReadyForStep2 && !formState.isReadyForStep3 && (
              <div className="bg-white overflow-hidden sm-rounded-b-lg pt-16">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-7 px-4 py-5 sm:p-6 sm:pb-16">
                    <div className="text-lg max-w-prose mx-auto">
                      <h1>
                        <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                          Select Quantity
                        </span>
                        <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                          How many Bunnies do you want?
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-5 bg-gray-100 px-4 py-5 sm:p-6 sm:pb-16">
                    <div className="text-lg max-w-prose mx-auto">
                      <div className=" block text-xl text-center leading-8 font-extrabold tracking-tight text-gray-900">
                        With each NFT minted, you get:
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DarkOverlapShell>
        <Footer />
      </Layout>
    </>
  );
}

import React, { useContext, useEffect } from "react";
import * as R from "ramda";
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
import Account from "../../components/Account";
import useEagerConnect from "../../lib/hooks/useEagerConnect";
import { connectToOptimism } from "../../lib/helpers";
import { StepperContext } from "../../lib/state/stepper";
import { useRouter } from "next/router";
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
                <div className="px-4 py-5 sm:p-6 sm:mb-16"></div>
              </div>
            )}
          </div>
        </DarkOverlapShell>
        <Footer />
      </Layout>
    </>
  );
}

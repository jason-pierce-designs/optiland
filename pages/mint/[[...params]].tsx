import React, { useContext } from "react";
import Layout from "../../components/Layout";
import DarkNavbar from "../../components/DarkNavbar";
import DarkOverlapShell from "../../components/DarkOverlapShell";

import Footer from "../../components/Footer";
import Stepper from "../../components/Stepper";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../lib/utils";
import { MintFormContext } from "../../lib/state/mintForm";
import { useWeb3React } from "@web3-react/core";

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
  const { account, chainId } = useWeb3React();
  const { state, dispatch } = useContext(MintFormContext);

  return (
    <>
      <Layout>
        <DarkNavbar activePath="/mint" />
        <DarkOverlapShell title="Mint">
          <div className="relative bg-white rounded-lg shadow">
            <Stepper />
            <div className="bg-gray-50 overflow-hidden sm-rounded-b-lg pb-16 sm:pb-24">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl">Are you ready?</h2>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                {/* Content goes here */}
                {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
              </div>
            </div>
          </div>
        </DarkOverlapShell>
        <Footer />
      </Layout>
    </>
  );
}

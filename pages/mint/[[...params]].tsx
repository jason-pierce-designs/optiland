import React from "react";
import Layout from "../../components/Layout";
import DarkNavbar from "../../components/DarkNavbar";
import DarkOverlapShell from "../../components/DarkOverlapShell";

import Footer from "../../components/Footer";
import Stepper from "../../components/Stepper";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../lib/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, variable } = context.query;
  console.log("collection is: ", params);

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
  return (
    <>
      <Layout>
        <DarkNavbar />
        <DarkOverlapShell title="Mint">
          <div className="relative bg-white rounded-lg shadow pb-16 sm:pb-24">
            <Stepper />
            {params}::{variable}
          </div>
        </DarkOverlapShell>
        <Footer />
      </Layout>
    </>
  );
}

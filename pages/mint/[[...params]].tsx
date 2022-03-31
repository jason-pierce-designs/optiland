import React, { useContext } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Layout from "../../components/Layout";
import DarkNavbar from "../../components/DarkNavbar";
import DarkOverlapShell from "../../components/DarkOverlapShell";
import Footer from "../../components/Footer";
import Stepper from "../../components/Stepper";
import { removeUndefinedForNextJsSerializing } from "../../lib/utils";
import { MintFormContext } from "../../lib/state/mintForm";
import MintStepOne from "../../components/MintStepOne";
import MintStepTwo from "../../components/MintStepTwo";
import MintStepThree from "../../components/MintStepThree";

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
  const { state: formState } = useContext(MintFormContext);

  return (
    <>
      <Layout>
        <DarkNavbar activePath="/mint" />
        <DarkOverlapShell title="Mint">
          <div className="relative bg-white rounded-lg shadow">
            <Stepper />
            {!formState.isReadyForStep2 && <MintStepOne />}
            {formState.isReadyForStep2 && !formState.isReadyForStep3 && (
              <MintStepTwo />
            )}
            {formState.isReadyForStep3 && <MintStepThree />}
          </div>
        </DarkOverlapShell>
        <Footer />
      </Layout>
    </>
  );
}

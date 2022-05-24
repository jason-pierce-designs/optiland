import React, { useContext } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import DarkOverlapShell from "../../components/DarkOverlapShell";
import Stepper from "../../components/Stepper";
import { removeUndefinedForNextJsSerializing } from "../../lib/utils";
import { MintFormContext } from "../../lib/state/mintForm";
import MintStepOne from "../../components/MintStepOne";
import MintStepTwo from "../../components/MintStepTwo";
import MintStepThree from "../../components/MintStepThree";
import HeadMeta from "../../components/HeadMeta";

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
      <HeadMeta
        title={`Mint Optiland NFT's`}
        description={`Connect and Mint! (while supplies last)`}
        keywords={`View, Optiland, Non-Fungible Tokens`}
      />
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
    </>
  );
}

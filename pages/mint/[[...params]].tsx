import React, { useContext } from "react";

import Layout from "../../components/Layout";
import DarkNavbar from "../../components/DarkNavbar";
import DarkOverlapShell from "../../components/DarkOverlapShell";
import Footer from "../../components/Footer";
import Stepper from "../../components/Stepper";
import { MintFormContext } from "../../lib/state/mintForm";
import MintStepOne from "../../components/MintStepOne";
import MintStepTwo from "../../components/MintStepTwo";
import MintStepThree from "../../components/MintStepThree";

export default function MintDeepLink() {
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

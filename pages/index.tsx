import React from "react";

import DarkOverlapShell from "../components/DarkOverlapShell";
import FAQs from "../components/FAQs";
import Team from "../components/Team";
import PricingPlan from "../components/PricingPlan";
import Tokenomics from "../components/Tokenomics";
import DarkHeroSectionClouds from "../components/DarkHeroSectionClouds";
import BgImageColorHeroSection from "../components/BgImageColorHeroSection";

export default function Home() {
  return (
    <>
      <DarkHeroSectionClouds />
      <DarkOverlapShell>
        <div className="bg-white rounded-lg shadow py-6">
          <BgImageColorHeroSection />
          <PricingPlan />
          <Tokenomics />
          <FAQs />
          <Team />
        </div>
      </DarkOverlapShell>
    </>
  );
}

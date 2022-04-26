import React from "react";

import DarkOverlapShell from "../components/DarkOverlapShell";
import FAQs from "../components/FAQs";
import Team from "../components/Team";
import PricingPlan from "../components/PricingPlan";
import DarkHeroSectionClouds from "../components/DarkHeroSectionClouds";
import BgImageColorHeroSection from "../components/BgImageColorHeroSection";

export default function Home() {
  return (
    <>
      <DarkHeroSectionClouds />
      <DarkOverlapShell title="Optiland Home">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <BgImageColorHeroSection />
          <PricingPlan />
          <FAQs />
          <Team />
        </div>
      </DarkOverlapShell>
    </>
  );
}

import React from "react";

import Layout from "../components/Layout";
import DarkOverlapShell from "../components/DarkOverlapShell";
import FAQs from "../components/FAQs";
import Team from "../components/Team";
import Footer from "../components/Footer";
import PricingPlan from "../components/PricingPlan";
import DarkHeroSectionClouds from "../components/DarkHeroSectionClouds";
import Navbar from "../components/DarkNavbar";
import BgImageColorHeroSection from "../components/BgImageColorHeroSection";

export default function Home() {
  return (
    <>
      <Layout>
        <Navbar />
        <DarkHeroSectionClouds />
        <DarkOverlapShell title="Optiland Home">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <BgImageColorHeroSection />
            <PricingPlan />
            <FAQs />
            <Team />
          </div>
          {/* /End replace */}
        </DarkOverlapShell>
      </Layout>
      <Footer />
    </>
  );
}

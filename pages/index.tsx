import React from "react";

import Layout from "../components/Layout";
import DarkOverlapShell from "../components/DarkOverlapShell";
import FAQs from "../components/FAQs";
import Team from "../components/Team";

export default function Home() {
  return (
    <Layout>
      <DarkOverlapShell title="Optiland Home">
        {/* Replace with your content */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <Team />
          <FAQs />
        </div>
        {/* /End replace */}
      </DarkOverlapShell>
    </Layout>
  );
}

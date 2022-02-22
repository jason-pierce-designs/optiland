import React from "react";

import Collection from "../../../components/Collection";
import Layout from "../../../components/Layout";
import DarkNavbar from "../../../components/DarkNavbar";

export default function PixelBunnyCollection() {
  return (
    <Layout>
      <DarkNavbar />
      <Collection token="pbunny" />
    </Layout>
  );
}

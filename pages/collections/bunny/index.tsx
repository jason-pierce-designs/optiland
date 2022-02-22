import React from "react";

import Collection from "../../../components/Collection";
import Layout from "../../../components/Layout";
import DarkNavbar from "../../../components/DarkNavbar";

export default function BunnyCollection() {
  return (
    <Layout>
      <DarkNavbar />
      <Collection token="bunny" />
    </Layout>
  );
}

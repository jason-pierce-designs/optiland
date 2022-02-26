import React from "react";

import Collection from "../../../components/Collection";
import Layout from "../../../components/Layout";
import DarkNavbar from "../../../components/DarkNavbar";

export default function PixelBunnyCollection() {
  return (
    <Layout>
      <DarkNavbar />
      <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav aria-label="Sidebar" className="sticky top-6 divide-y ">
              Here is some content for flitering and sorting and stuff
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-10">
            <Collection token="pbunny" />
          </main>
        </div>
      </div>
    </Layout>
  );
}

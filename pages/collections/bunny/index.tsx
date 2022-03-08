import React from "react";

import Collection from "../../../components/Collection";
import Layout from "../../../components/Layout";
import DarkNavbar from "../../../components/DarkNavbar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getBaseUrl } from "../../../lib/helpers";
import { removeUndefinedForNextJsSerializing } from "../../../lib/utils";
import { BunnyMetadata } from "../../../lib";
import { SWRConfig } from "swr";
import Footer from "../../../components/Footer";

export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/meta/bunny`;
  const res: Response = await fetch(url);
  const fallback: BunnyMetadata = await res.json();
  return {
    props: removeUndefinedForNextJsSerializing({
      fallback: {
        [url]: fallback,
      },
    }),
  };
};

export default function BunnyCollection({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <DarkNavbar />
      <SWRConfig value={fallback}>
        <div className="py-8 sm:py-12">
          <div className="w-full mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <nav aria-label="Sidebar" className="sticky top-6 divide-y ">
                Here is some content for flitering and sorting and stuff
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-10">
              <Collection token="bunny" />
            </main>
          </div>
        </div>
      </SWRConfig>
      <Footer />
    </Layout>
  );
}

import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../../lib/utils";
import { BunnyMetadata } from "../../../lib";
import Collection from "../../../components/Collection";
import Layout from "../../../components/Layout";
import DarkNavbar from "../../../components/DarkNavbar";
import useSWR, { SWRConfig } from "swr";
import { getBaseUrl } from "../../../lib/helpers";
import Footer from "../../../components/Footer";

export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/meta/pbunny`;
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

export default function PixelBunnyCollection({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <DarkNavbar />
      <SWRConfig value={fallback}>
        <div className="py-16 sm:py-24">
          <div className="w-full mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <main className="col-span-12">
              <Collection token="pbunny" />
            </main>
          </div>
        </div>
      </SWRConfig>
      <Footer />
    </Layout>
  );
}

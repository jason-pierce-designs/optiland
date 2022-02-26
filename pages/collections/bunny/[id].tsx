import React, { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../../lib/utils";
import { getLocalMetadata } from "../../../lib/helpers";
import { BunnyMetadata } from "../../../lib";
import DarkNavbar from "../../../components/DarkNavbar";
import Layout from "../../../components/Layout";
import Footer from "../../../components/Footer";
import NFTDetailView from "../../../components/NFTDetailView";
import DarkOverlapShell from "../../../components/DarkOverlapShell";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tokenId = context.params?.id as string;
  const metadata: BunnyMetadata | Error = await getLocalMetadata(
    "bunny",
    Number(tokenId),
    true
  );
  return {
    props: removeUndefinedForNextJsSerializing({
      metadata,
      tokenId,
    }),
  };
};

export default function BunnyDetail({
  metadata,
  tokenId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout>
        <DarkNavbar />
        <DarkOverlapShell title={`Bunny #${tokenId}`}>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <NFTDetailView
              metadata={metadata}
              collection="bunny"
              id={Number(tokenId)}
            />
          </div>
        </DarkOverlapShell>
      </Layout>
      <Footer />
    </>
  );
}

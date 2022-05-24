import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../../lib/utils";
import { BunnyMetadata } from "../../../lib";
import NFTDetailView from "../../../components/NFTDetailView";
import DarkOverlapShell from "../../../components/DarkOverlapShell";
import HeadMeta from "../../../components/HeadMeta";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tokenId = context.params?.id as string;
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASEURL;
  const res: Response = await fetch(`${baseUrl}/api/meta/bunny/${tokenId}`);
  const metadata: BunnyMetadata = await res.json();
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
      <HeadMeta
        title={`Optimistic Bunny#${tokenId}`}
        description={`View the details of Optimistic Bunny#${tokenId}`}
        keywords={`View, Optiland, Optimistic Bunny#${tokenId}`}
      />
      <DarkOverlapShell title={`Bunny #${tokenId}`}>
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <NFTDetailView
            data={metadata}
            collection="bunny"
            id={Number(tokenId)}
            showBreadcrumbs
          />
        </div>
      </DarkOverlapShell>
    </>
  );
}

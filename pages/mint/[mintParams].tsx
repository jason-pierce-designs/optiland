import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../lib/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collection, quantity } = context.query;

  return {
    props: removeUndefinedForNextJsSerializing({
      collection,
      quantity,
    }),
  };
};

export default function MintDeepLink({
  collection,
  quantity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      the collection is {collection && collection.toString()}
      <br />
      the quantity is {quantity && quantity.toString()}
    </div>
  );
}

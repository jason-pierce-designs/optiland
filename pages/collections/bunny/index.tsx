import React from "react";

import Collection from "../../../components/Collection";
import Layout from "../../../components/Layout";
import DarkNavbar from "../../../components/DarkNavbar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGES,
  DEFAULT_PAGESIZE,
  getBaseUrl,
} from "../../../lib/helpers";
import { removeUndefinedForNextJsSerializing } from "../../../lib/utils";
import { BunnyMetadata } from "../../../lib";
import { SWRConfig } from "swr";
import Footer from "../../../components/Footer";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseUrl = getBaseUrl();
  const { filter, pages, page, pagesize } = context.query;
  const url = `${baseUrl}/api/meta/bunny?pages=${pages || 1}&pagesize=${
    pagesize || 75
  }${page ? "&page=" + page : ""}`;
  const res: Response = await fetch(url);
  const fallback: BunnyMetadata = await res.json();
  return {
    props: removeUndefinedForNextJsSerializing({
      fallback: {
        [url]: fallback,
      },
      pages,
      page,
      pagesize,
    }),
  };
};

export default function BunnyCollection({
  fallback,
  pages,
  page,
  pagesize,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <DarkNavbar />
      <SWRConfig value={fallback}>
        <div className="py-16 sm:py-24">
          <div className="w-full mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <main className="col-span-12">
              <Collection
                token="bunny"
                pages={pages || DEFAULT_PAGES}
                page={page || DEFAULT_PAGE}
                pagesize={pagesize || DEFAULT_PAGESIZE}
              />
            </main>
          </div>
        </div>
      </SWRConfig>
      <Footer />
    </Layout>
  );
}

/** two sections, with sidebar
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
 */

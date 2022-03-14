import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { removeUndefinedForNextJsSerializing } from "../../../lib/utils";
import { BunnyMetadata } from "../../../lib";
import Collection from "../../../components/Collection";
import Layout from "../../../components/Layout";
import DarkNavbar from "../../../components/DarkNavbar";
import { SWRConfig } from "swr";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGES,
  DEFAULT_PAGESIZE,
  getBaseUrl,
} from "../../../lib/helpers";
import Footer from "../../../components/Footer";
import useIntersection from "../../../lib/hooks/useIntersector";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseUrl = getBaseUrl();
  const { filter, pages, page, pagesize } = context.query;
  const url = `${baseUrl}/api/meta/pbunny${
    pages ? `?pages=${pages}` : "?pages=1"
  }&pagesize=${pagesize || 50}${page ? `&page=${page}` : ""}`;
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

export default function PixelBunnyCollection({
  fallback,
  pages,
  page,
  pagesize,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState<number>(
    Number(pages) || DEFAULT_PAGES
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (ref.current !== null) {
      observer.observe(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    if (isVisible && totalPages) {
      setTotalPages(totalPages + 1);
      router.push(
        `?pages=${totalPages + 1}&pagesize=${pagesize || DEFAULT_PAGESIZE}`,
        undefined,
        {
          shallow: true,
        }
      );
      setIsVisible(false);
    }
  }, [isVisible, totalPages, pagesize, router]);

  return (
    <Layout>
      <DarkNavbar />
      <SWRConfig value={fallback}>
        <div className="py-16 sm:py-24">
          <div className="w-full mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <main className="col-span-12">
              <Collection
                token="pbunny"
                pages={totalPages.toString()}
                page={page || undefined}
                pagesize={pagesize || DEFAULT_PAGESIZE}
              />
            </main>
          </div>
        </div>
      </SWRConfig>
      <div className="block h-96 w-full" ref={ref}></div>
      <Footer />
    </Layout>
  );
}

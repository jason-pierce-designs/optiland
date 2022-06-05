import React from "react";

import DarkOverlapShell from "../components/DarkOverlapShell";
import FAQs from "../components/FAQs";
import Team from "../components/Team";
import PricingPlan from "../components/PricingPlan";
import Tokenomics from "../components/Tokenomics";
import DarkHeroSectionClouds from "../components/DarkHeroSectionClouds";
import BgImageColorHeroSection from "../components/BgImageColorHeroSection";
import { ArticleType, BlogArticleType } from "../lib/types";
import { blogApi } from "../lib/blogHelpers";
import ArticleItem from "../components/Blog/ArticleItem";
import HeadMeta from "../components/HeadMeta";

interface Props {
  articles: Array<ArticleType>;
}

export default function Home({ articles }: Props) {
  return (
    <>
      <HeadMeta />
      <DarkHeroSectionClouds />
      <DarkOverlapShell>
        <div className="bg-white rounded-lg shadow py-6">
          <BgImageColorHeroSection />
          <PricingPlan />
          <div className="divide-y divide-gray-200">
            <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
              <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
              </div>
              <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                  <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                    Further Down The Rabbit Hole
                  </h2>
                  <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Got an idea for blog content? Let us know in our{" "}
                    <a
                      href="/discord"
                      className="font-medium text-red-600 hover:text-red-700"
                    >
                      Discord
                    </a>{" "}
                    server!
                  </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                  {articles.map((article: ArticleType) => (
                    <ArticleItem key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Tokenomics />
          <FAQs />
          <Team />
        </div>
      </DarkOverlapShell>
    </>
  );
}

export const getStaticProps = async () => {
  const articleOne: BlogArticleType = blogApi.getArticleBySlug(
    "dragonia-overview",
    [
      "slug",
      "title",
      "description",
      "category",
      "date",
      "datetime",
      "coverImage",
      "excerpt",
      "timeReading",
      "ogImage",
      "content",
      "author",
    ]
  );
  const articleTwo: BlogArticleType = blogApi.getArticleBySlug("cryptovania", [
    "slug",
    "title",
    "description",
    "category",
    "date",
    "datetime",
    "coverImage",
    "excerpt",
    "timeReading",
    "ogImage",
    "content",
    "author",
  ]);
  const articleThree: BlogArticleType = blogApi.getArticleBySlug(
    "bunny-wearables",
    [
      "slug",
      "title",
      "description",
      "category",
      "date",
      "datetime",
      "coverImage",
      "excerpt",
      "timeReading",
      "ogImage",
      "content",
      "author",
    ]
  );
  return {
    props: { articles: [articleOne, articleTwo, articleThree] },
  };
};

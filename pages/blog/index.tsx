import React from "react";
import ArticleItem from "../../components/Blog/ArticleItem";
import DarkOverlapShell from "../../components/DarkOverlapShell";
import HeadMeta from "../../components/HeadMeta";
import { blogApi } from "../../lib/blogHelpers";
import { ArticleType, BlogArticleType } from "../../lib/types";

interface Props {
  articles: Array<ArticleType>;
}

export const getStaticProps = async () => {
  const articles: Array<BlogArticleType> = blogApi.getAllArticles([
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
  return {
    props: { articles },
  };
};

export default function BlogPage({ articles }: Props) {
  return (
    <>
      <HeadMeta
        title={`Optiland: The Blog`}
        description={`Look no further for news from the depths of The Warren`}
        keywords={`View, Optiland, Non-Fungible Tokens`}
      />
      <DarkOverlapShell title="The Warren">
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
              <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                  Welcome to our Blog
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                  We try to update frequently. So check back often!
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
      </DarkOverlapShell>
    </>
  );
}

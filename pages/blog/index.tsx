import React from "react";
import ArticleItem from "../../components/Blog/ArticleItem";
import DarkOverlapShell from "../../components/DarkOverlapShell";
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
    "date",
    "coverImage",
    "excerpt",
    "timeReading",
    "ogImage",
    "content",
  ]);
  return {
    props: { articles },
  };
};

export default function BlogPage({ articles }: Props) {
  return (
    <DarkOverlapShell title="Blog Posts">
      {articles.map((article: ArticleType) => (
        <ArticleItem key={article.slug} article={article} />
      ))}
    </DarkOverlapShell>
  );
}

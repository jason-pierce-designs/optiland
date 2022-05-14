import React from "react";
import NextLink from "next/link";
import { ArticleType } from "../../lib/types";

interface Props {
  article: ArticleType;
}

export default function ArticleItem({ article }: Props) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <NextLink as={`/blog/${article.slug}`} href="/blog/[slug]">
          <a href="/blog">{article.title}</a>
        </NextLink>
      </div>
      <div className="px-4 py-5 sm:p-6">{article.content}</div>
      <div className="px-4 py-4 sm:px-6">{article.date}</div>
    </div>
  );
}

import React from "react";
import readingTime from "reading-time";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import autoLinkHeadings from "remark-autolink-headings";
import externalLinks from "remark-external-links";
import images from "remark-images";
import slug from "remark-slug";

import Article from "../../components/Blog/Article";
import ArticleItem from "../../components/Blog/ArticleItem";
import Content from "../../components/Blog/Content";
import Header from "../../components/Blog/Header";
import { BlogArticleType } from "../../lib/types";
import { blogApi } from "../../lib/blogHelpers";
import DarkOverlapShell from "../../components/DarkOverlapShell";

interface Props {
  readingTime: {
    text: string;
  };
  frontMatter: {
    title: string;
    category: string;
    description: string;
    date: string;
    content: string;
    ogImage: {
      url: string;
      alt: string;
    };
  };
  slug: string;
  source: any;
  tags: Array<string>;
}

export default function ArticlePage({
  readingTime,
  frontMatter,
  slug,
  source,
}: Props) {
  const content = (
    <MDXRemote
      {...source}
      components={{ Article, ArticleItem, Content, Header }}
    />
  );

  return (
    <DarkOverlapShell title={frontMatter.title}>
      <div className="flex flex-col bg-white rounded-lg shadow py-6">
        <NextSeo
          title={frontMatter.title}
          description={frontMatter.description}
        />
        <Article
          category={frontMatter.category}
          readingTime={readingTime}
          title={frontMatter.title}
          description={frontMatter.description}
          date={frontMatter.date}
          content={content}
          ogImage={frontMatter.ogImage}
          slug={slug}
        />
      </div>
    </DarkOverlapShell>
  );
}

type Params = {
  params: {
    slug: string;
    timeReading: {
      text: string;
    };
  };
};

export async function getStaticProps({ params }: Params) {
  const { content, data } = blogApi.getRawArticleBySlug(params.slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [autoLinkHeadings, externalLinks, images, slug],
    },
  });
  const tags = data.tags ?? [];
  return {
    props: {
      slug: params.slug,
      readingTime: readingTime(content),
      source: mdxSource,
      frontMatter: data,
      tags,
    },
  };
}

export async function getStaticPaths() {
  const articles: Array<BlogArticleType> = blogApi.getAllArticles(["slug"]);
  return {
    paths: articles.map((articles) => {
      return {
        params: {
          slug: articles.slug,
        },
      };
    }),
    fallback: false,
  };
}

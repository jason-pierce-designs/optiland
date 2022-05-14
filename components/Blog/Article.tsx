import React from "react";

import { ArticleType } from "../../lib/types";
import Header from "./Header";
import Content from "./Content";

interface Props {
  readingTime: {
    text: string;
  };
  title: string;
  description: string;
  date: string;
  ogImage: {
    url: string;
  };
  content: React.ReactNode;
  slug: string;
}

export default function Article({
  readingTime,
  title,
  description,
  date,
  ogImage,
  content,
}: Props) {
  return (
    <>
      <Header
        readingTime={readingTime}
        title={title}
        description={description}
        date={date}
        ogImage={ogImage}
      />
      <Content content={content} />
      <hr />
    </>
  );
}

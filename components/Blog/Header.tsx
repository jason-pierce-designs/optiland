import React from "react";

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
}

export default function Header({ title, description, date, ogImage }: Props) {
  return (
    <div>
      <p>Published on {date}</p>

      <h1>{title}</h1>

      <p>{description}</p>
    </div>
  );
}

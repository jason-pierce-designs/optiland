import React from "react";
import useSWR from "swr";
import { getBaseUrl } from "../../../lib/helpers";

export default function PixelJSON() {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/meta/pbunny`;
  const { data } = useSWR(url);
  return <div className="text-sm">{JSON.stringify(data)}</div>;
}

import React from "react";
import useSWR from "swr";
import { getBaseUrl } from "../../../lib/helpers";

export default function BunnyJSON() {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/meta/bunny?pagesize=5151&page=1`;
  const { data } = useSWR(url);
  return <div className="text-sm">{JSON.stringify(data)}</div>;
}

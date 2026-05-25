"use client";

import { useEffect, useState } from "react";
import PropertyMap from "./PropertyMap"; // normal import

export default function PropertyMapWrapper({ url }: { url: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Show a placeholder while loading on the client
    return <div className="h-64 w-full animate-pulse rounded-xl bg-slate-100" />;
  }

  return <PropertyMap url={url} />;
}
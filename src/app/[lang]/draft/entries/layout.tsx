"use client";

import { useParams } from "next/navigation";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

export default function PreviewLayout({ children }: any) {
  const params = useParams();
  let lang = params.lang || "en-US";

  if (Array.isArray(lang)) {
    lang = lang[0];
  }

  return (
    <ContentfulLivePreviewProvider locale={lang}>
      {children}
    </ContentfulLivePreviewProvider>
  );
}

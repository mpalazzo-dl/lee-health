"use client";

import { useEffect, useState } from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { CfFetchById } from "@aces/types";

import { CfLiteLockup } from "./render";
import { fetchLiteLockupData } from "./services";
import { LiteLockupSkeleton } from "./skeleton";

export const CfLiteLockupClient = ({ id, preview, lang }: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchLiteLockupData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  const updatedData = useContentfulLiveUpdates(data);

  if (!updatedData) return <LiteLockupSkeleton />;

  return (
    <CfLiteLockup
      internalTitle={updatedData.internalTitle}
      headline={updatedData.headline}
      subhead={updatedData.subhead}
      bodyCopy={updatedData.bodyCopy}
      buttonText={updatedData.buttonText}
      pageLink={updatedData.pageLink}
      image={updatedData.image}
      mediaAlignment={updatedData.mediaAlignment}
      __typename={updatedData.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

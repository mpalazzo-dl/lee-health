"use client";

import { useEffect, useState } from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { CfFetchById } from "@aces/types";

import { CfLiteHero } from "./render";
import { fetchLiteHeroData } from "./services";
import { LiteHeroSkeleton } from "./skeleton";

export const CfLiteHeroClient = ({ id, preview, lang }: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchLiteHeroData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  const updatedData = useContentfulLiveUpdates(data);

  if (!updatedData) return <LiteHeroSkeleton />;

  return (
    <CfLiteHero
      internalTitle={updatedData.internalTitle}
      headline={updatedData.headline}
      subhead={updatedData.subhead}
      buttonText={updatedData.buttonText}
      pageLink={updatedData.pageLink}
      image={updatedData.image}
      fullOverlay={updatedData.fullOverlay}
      slim={updatedData.slim}
      __typename={updatedData.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

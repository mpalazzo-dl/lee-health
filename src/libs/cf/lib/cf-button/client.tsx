"use client";

import { useEffect, useState } from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { CfFetchById } from "@aces/types";

import { CfButton } from "./render";
import { fetchButton } from "./services";
import { ButtonSkeleton } from "./skeleton";

export const CfButtonClient = ({ id, preview, lang }: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchButton(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  const updatedData = useContentfulLiveUpdates(data);

  if (!updatedData) return <ButtonSkeleton />;

  return (
    <CfButton
      internalTitle={updatedData.internalTitle}
      title={updatedData.title}
      link={updatedData.link}
      buttonStyle={updatedData.buttonStyle}
      rightIcon={updatedData.rightIcon}
      fullWidthMobile={updatedData.fullWidthMobile}
      __typename={updatedData.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

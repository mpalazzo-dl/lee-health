"use client";

import { useEffect, useState } from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import { CSSProperties } from "react";

import type {
  CfFetchById,
  CfImageProps,
  Nested,
  ResponsiveSpacing,
} from "@aces/types";

import { CfImage, CfImageCover } from "./render";
import { fetchImageData } from "./services";
import { ImageSkeleton } from "./skeleton";

export interface CfImageClientProps extends CfFetchById, Nested {
  responsive?: boolean;
  style?: CSSProperties;
}

export const CfImageClient = ({
  id,
  preview,
  lang,
  nested,
  responsive,
  style,
}: CfImageClientProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchImageData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  const updatedData = useContentfulLiveUpdates(data);

  if (!updatedData) return <ImageSkeleton />;

  return (
    <CfImage
      internalTitle={updatedData.internalTitle}
      image={updatedData.image}
      mobileImage={updatedData.mobileImage}
      altText={updatedData.altText}
      nativeImageSize={updatedData.nativeImageSize}
      __typename={updatedData.__typename}
      nested={nested}
      responsive={responsive}
      style={style}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

export interface CfImageCoverClientProps extends CfFetchById, Nested {
  coverWidth?: ResponsiveSpacing;
  coverHeight: ResponsiveSpacing;
  borderRadius?: ResponsiveSpacing;
  style?: CSSProperties;
  __typename?: string;
}

export const CfImageCoverClient = ({
  id,
  preview,
  lang,
  borderRadius,
  coverWidth = "100%",
  coverHeight = "380px",
  nested,
  style,
}: CfImageCoverClientProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchImageData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  const updatedData = useContentfulLiveUpdates(data);

  if (!updatedData) return <ImageSkeleton />;

  return (
    <CfImageCover
      internalTitle={updatedData.internalTitle}
      image={updatedData.image}
      mobileImage={updatedData.mobileImage}
      borderRadius={borderRadius}
      coverWidth={coverWidth}
      coverHeight={coverHeight}
      nested={nested}
      style={style}
      __typename={updatedData.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

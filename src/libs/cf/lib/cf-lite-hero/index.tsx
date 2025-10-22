import type { CfFetchById } from "@aces/types";

import { CfLiteHero } from "./render";
import { fetchLiteHeroData } from "./services";
import { LiteHeroSkeleton } from "./skeleton";

export interface CfLiteHeroServerProps extends CfFetchById {}

export const CfLiteHeroServer = async ({
  id,
  preview,
  lang,
}: CfLiteHeroServerProps) => {
  let data;

  try {
    data = await fetchLiteHeroData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <LiteHeroSkeleton />;
  }

  if (!data) {
    return <LiteHeroSkeleton />;
  }

  return (
    <CfLiteHero
      internalTitle={data.internalTitle}
      headline={data.headline}
      subhead={data.subhead}
      buttonText={data.buttonText}
      pageLink={data.pageLink}
      image={data.image}
      fullOverlay={data.fullOverlay}
      slim={data.slim}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

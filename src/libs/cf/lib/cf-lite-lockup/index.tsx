import type { CfFetchById } from "@aces/types";

import { CfLiteLockup } from "./render";
import { fetchLiteLockupData } from "./services";
import { LiteLockupSkeleton } from "./skeleton";

export interface CfLiteLockupServerProps extends CfFetchById {}

export const CfLiteLockupServer = async ({
  id,
  preview,
  lang,
}: CfLiteLockupServerProps) => {
  let data;

  try {
    data = await fetchLiteLockupData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <LiteLockupSkeleton />;
  }

  if (!data) {
    return <LiteLockupSkeleton />;
  }

  return (
    <CfLiteLockup
      internalTitle={data.internalTitle}
      headline={data.headline}
      subhead={data.subhead}
      bodyCopy={data.bodyCopy}
      buttonText={data.buttonText}
      pageLink={data.pageLink}
      image={data.image}
      mediaAlignment={data.mediaAlignment}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

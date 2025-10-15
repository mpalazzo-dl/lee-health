import { defaultLocale } from "@aces/i18n";
import { CfImageOverlayHeroClient } from "@aces/cf";

import { PageHeroProps } from "./page-hero-types";

export const PreviewPageHero = ({
  item,
  preview = false,
  lang = defaultLocale,
}: PageHeroProps) => {
  if (item === null) {
    return null;
  }

  switch (item.__typename) {
    case "ImageOverlayHero":
      return (
        <CfImageOverlayHeroClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    default:
      return null;
  }
};

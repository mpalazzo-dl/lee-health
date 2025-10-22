import { defaultLocale } from "@aces/i18n";
import { CfFeatureHighlightServer, CfImageOverlayHeroServer } from "@aces/cf";

import { PageHeroProps } from "./page-hero-types";

export const DefaultPageHero = ({
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
        <CfImageOverlayHeroServer
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "LiteHero":
      return (
        <CfFeatureHighlightServer
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    default:
      return null;
  }
};

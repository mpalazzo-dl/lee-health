import { defaultLocale } from "@aces/i18n";
import {
  CfAccordionsClient,
  CfBannerClient,
  CfCalloutClient,
  CfCodeEmbedClient,
  CfFeatureHighlightClient,
  CfGridClient,
  CfHeaderClient,
  CfListItemClient,
  CfLockupClient,
  CfRichTextSectionClient,
  CfLiteLockupClient,
  CfLiteHeroClient,
} from "@aces/cf";

export const EntriesPreview = ({
  item,
  preview = true,
  lang = defaultLocale,
}: any) => {
  if (item === null) {
    return null;
  }

  const typename = item.__typename;

  switch (typename) {
    case "Accordions":
      return (
        <CfAccordionsClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "Banner":
      return (
        <CfBannerClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "Callout":
      return (
        <CfCalloutClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "GridUpdated":
      return (
        <CfGridClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "Header":
      return (
        <CfHeaderClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "RichTextSection":
      return (
        <CfRichTextSectionClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "Lockup":
      return (
        <CfLockupClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "ListItem":
      return (
        <CfListItemClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "CodeEmbed":
      return (
        <CfCodeEmbedClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "FeatureHighlight":
      return (
        <CfFeatureHighlightClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "LiteLockup":
      return (
        <CfLiteLockupClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );
    case "LiteHero":
      return (
        <CfLiteHeroClient
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
          key={item?.sys?.id || ""}
        />
      );

    default:
      return null;
  }
};

import {
  CfAccordionsClient,
  CfBannerClient,
  CfCalloutClient,
  CfCodeEmbedClient,
  CfFeatureHighlightClient,
  CfGridClient,
  CfHeaderClient,
  CfImageClient,
  CfListItemClient,
  CfLockupClient,
  CfRichTextSectionClient,
  CfLiteLockupClient,
  CfLiteHeroClient
} from "@aces/cf";
import { PageBodyProps } from "./page-body-types";

export const PreviewPageBody = ({ items, preview, lang }: PageBodyProps) => {
  if (!items) return null;

  return (
    <>
      {items.map((item, index) => {
        const typename = item.__typename;
        if (!typename) return null;

        switch (typename) {
          case "Accordions":
            return (
              <CfAccordionsClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Banner":
            return (
              <CfBannerClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Callout":
            return (
              <CfCalloutClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "GridUpdated":
            return (
              <CfGridClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Header":
            return (
              <CfHeaderClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "RichTextSection":
            return (
              <CfRichTextSectionClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Lockup":
            return (
              <CfLockupClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "ListItem":
            return (
              <CfListItemClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "CodeEmbed":
            return (
              <CfCodeEmbedClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "FeatureHighlight":
            return (
              <CfFeatureHighlightClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Image":
            return (
              <CfImageClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "LiteLockup":
            return (
              <CfLiteLockupClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "LiteHero":
            return (
              <CfLiteHeroClient
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};

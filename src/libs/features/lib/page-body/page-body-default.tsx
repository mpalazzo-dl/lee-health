import {
  CfAccordionsServer,
  CfBannerServer,
  CfCalloutServer,
  CfGridServer,
  CfHeaderServer,
  CfRichTextSectionServer,
  CfLockupServer,
  CfListItemServer,
  CfCodeEmbedServer,
  CfFeatureHighlightServer,
  CfImageServer,
} from "@aces/cf";
import { PageBodyProps } from "./page-body-types";

export const DefaultPageBody = ({ items, preview, lang }: PageBodyProps) => {
  if (!items) return null;

  return (
    <>
      {items.map((item, index) => {
        const typename = item.__typename;
        if (!typename) return null;

        switch (typename) {
          case "Accordions":
            return (
              <CfAccordionsServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Banner":
            return (
              <CfBannerServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Callout":
            return (
              <CfCalloutServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "GridUpdated":
            return (
              <CfGridServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Header":
            return (
              <CfHeaderServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "RichTextSection":
            return (
              <CfRichTextSectionServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Lockup":
            return (
              <CfLockupServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "ListItem":
            return (
              <CfListItemServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "CodeEmbed":
            return (
              <CfCodeEmbedServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "FeatureHighlight":
            return (
              <CfFeatureHighlightServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );
          case "Image":
            return (
              <CfImageServer
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={item?.sys?.id || index}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};

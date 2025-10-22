import { ContentfulLivePreview } from "@contentful/live-preview";

import {
  CfBaseComponent,
  PageLinkProps,
  CfRichText,
  CfMediaAlignment,
  CfLinkTypes,
} from "@aces/types";
import { generateId } from "@aces/utils";
import { componentSpacing, shape } from "@aces/theme";
import { Box, Col, Container, FlexBox, H3, Row, Text } from "@aces/ui";
import { CfRichTextRender } from "../cf-rich-text-render";
import { CfButtonUi } from "../cf-button/render";
import { CfImage } from "../cf-image/render";
import { CfLink } from "../cf-link/render";

export interface CfLiteLockupProps extends CfBaseComponent {
  headline?: string;
  subhead?: string;
  bodyCopy?: CfRichText;
  buttonText?: string;
  pageLink?: PageLinkProps;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  mediaAlignment: CfMediaAlignment;
}

export const CfLiteLockup = ({
  internalTitle,
  headline,
  subhead,
  bodyCopy,
  buttonText,
  pageLink,
  image,
  mediaAlignment,
  __typename,
  id,
  lang,
  preview,
}: CfLiteLockupProps) => {
  let pageLinkUi = pageLink;

  if (pageLink && pageLink.slug === "homepage") {
    pageLinkUi = {
      slug: "",
      specialtyPage: undefined,
      parentPage: undefined,
      __typename: "Page",
    };
  }

  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{ xs: componentSpacing.lg, md: componentSpacing.lg }}
      {...ContentfulLivePreview.getProps({
        entryId: id,
        fieldId: "internalTitle",
        locale: lang,
      })}
    >
      <Container>
        <Row
          alignItems="center"
          columnSpacing={12}
          flexDirection={{
            xs: "column-reverse",
            lg: mediaAlignment === "Left" ? "row-reverse" : "row",
          }}
          rowSpacing={4}
          {...ContentfulLivePreview.getProps({
            entryId: id,
            fieldId: "mediaAlignment",
            locale: lang,
          })}
        >
          {(headline || subhead || bodyCopy || buttonText) && (
            <Col
              paddingRight={mediaAlignment === "Right" ? { xs: 0, lg: 20 } : {}}
              paddingLeft={mediaAlignment === "Left" ? { xs: 0, lg: 20 } : {}}
              size={{ xs: 12, lg: 6 }}
            >
              {subhead && (
                <Text.SubtitleSmall marginBottom={4}>
                  {subhead}
                </Text.SubtitleSmall>
              )}
              {headline && (
                <H3
                  marginBottom={8}
                  {...ContentfulLivePreview.getProps({
                    entryId: id,
                    fieldId: "headline",
                    locale: lang,
                  })}
                >
                  {headline}
                </H3>
              )}
              {bodyCopy && (
                <CfRichTextRender
                  alignment="Left"
                  richTextDocument={bodyCopy.json}
                  lang={lang}
                  preview={preview}
                  {...ContentfulLivePreview.getProps({
                    entryId: id,
                    fieldId: "bodyCopy",
                    locale: lang,
                  })}
                />
              )}
              {buttonText && pageLink && (
                <FlexBox
                  flexDirection={{ xs: "column", lg: "row" }}
                  flexWrap="wrap"
                  gap={5}
                  marginTop={bodyCopy ? 8 : 0}
                >
                  <CfLink
                    linkType={CfLinkTypes.PageLink}
                    pageLink={pageLinkUi}
                    target={"_self"}
                    lang={lang}
                  >
                    <CfButtonUi
                      internalTitle={internalTitle}
                      title={buttonText}
                      style={{ color: "primary", variant: "outlined" }}
                      __typename={__typename}
                      id={id}
                      lang={lang}
                      preview={preview}
                    />
                  </CfLink>
                </FlexBox>
              )}
            </Col>
          )}
          <Col size={{ xs: 12, lg: 6 }}>
            <Box
              style={{
                borderRadius: shape.borderRadius,
                overflow: "hidden",
              }}
              width="100%"
            >
              {image && (
                <CfImage
                  internalTitle={"image"}
                  image={image}
                  altText={""}
                  __typename={"Image"}
                  nested={true}
                  id={"liteLockupImage"}
                  lang={lang}
                  preview={preview}
                />
              )}
            </Box>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

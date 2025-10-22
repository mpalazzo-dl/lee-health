"use client";

import { alpha } from "@mui/material";
import { ContentfulLivePreview } from "@contentful/live-preview";

import { CfBaseComponent, CfLinkTypes, PageLinkProps } from "@aces/types";
import { useMediaQuery } from "@aces/hooks";
import { generateId } from "@aces/utils";
import { breakpoints, containerPadding, palette, shape } from "@aces/theme";
import { Box, Container, ImageFill, FlexBox, Text, Image, H2 } from "@aces/ui";
import { CfLink } from "../cf-link/render";
import { CfButtonUi } from "../cf-button/render";

export interface CfLiteHeroProps extends CfBaseComponent {
  headline?: string;
  subhead?: string;
  buttonText?: string;
  pageLink?: PageLinkProps;
  image: {
    url: string;
    width: number;
    height: number;
  };
  fullOverlay: boolean;
  slim: boolean;
}

export const CfLiteHero = ({
  internalTitle,
  headline,
  subhead,
  buttonText,
  pageLink,
  image,
  fullOverlay,
  slim,
  __typename,
  id,
  lang,
  preview,
}: CfLiteHeroProps) => {
  const { isSmallerThanMd } = useMediaQuery();

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
    <FlexBox
      id={generateId(internalTitle)}
      data-component={__typename}
      justifyContent="center"
      position="relative"
      minHeight={{ xs: "none", md: slim ? "380px" : "470px" }}
    >
      <FlexBox
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        width="100%"
        style={{
          backgroundColor: palette.tertiary.grayblue,
        }}
        {...ContentfulLivePreview.getProps({
          entryId: id,
          fieldId: "image",
          locale: lang,
        })}
      >
        {isSmallerThanMd && !fullOverlay && image ? (
          <Image
            url={image.url}
            alt={""}
            width={image.width}
            height={image.height}
            responsive
          />
        ) : image ? (
          <ImageFill
            url={image.url}
            alt={""}
            width={image.width}
            height={image.height}
            containerMaxWidth={breakpoints.values.xxl}
          />
        ) : (
          <></>
        )}

        {fullOverlay && (headline || subhead || (buttonText && pageLink)) && (
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            style={{
              background: alpha(palette.common.black, 0.4),
            }}
          />
        )}
        {(headline || subhead || (buttonText && pageLink)) && (
          <Container nested={isSmallerThanMd && !fullOverlay}>
            <FlexBox justifyContent={fullOverlay ? "center" : "flex-start"}>
              <FlexBox
                alignItems={fullOverlay ? "center" : "start"}
                flexDirection="column"
                gap={6}
                justifyContent="center"
                marginY={{
                  xs: fullOverlay ? 12 : 0,
                  md: fullOverlay ? 4 : 12,
                }}
                maxWidth={{
                  xs: fullOverlay ? "650px" : "none",
                  md: fullOverlay ? "800px" : "650px",
                }}
                paddingX={{
                  xs: fullOverlay ? 10 : containerPadding.xs,
                  md: fullOverlay ? 5 : 10,
                }}
                paddingY={fullOverlay ? 5 : 10}
                position="relative"
                width={{ xs: "100%", md: fullOverlay ? "100%" : "65%" }}
                style={{
                  background: fullOverlay ? "none" : palette.primary.main,
                  borderRadius: { xs: 0, md: shape.borderRadius },
                  zIndex: 2,
                }}
              >
                {headline && (
                  <H2
                    align={fullOverlay ? "center" : "left"}
                    color={palette.common.white}
                    component="h1"
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "headline",
                      locale: lang,
                    })}
                  >
                    {headline}
                  </H2>
                )}
                {subhead && (
                  <Text.Subtitle
                    align={fullOverlay ? "center" : "left"}
                    color={palette.common.white}
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "subhead",
                      locale: lang,
                    })}
                  >
                    {subhead}
                  </Text.Subtitle>
                )}
                {buttonText && pageLink && (
                  <FlexBox
                    alignItems={fullOverlay ? "center" : "flex-start"}
                    flexDirection={{ xs: "column", sm: "row" }}
                    flexWrap="wrap"
                    gap={5}
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
                        style={{ color: "secondary", variant: "outlined" }}
                        __typename={__typename}
                        id={id}
                        lang={lang}
                        preview={preview}
                      />
                    </CfLink>
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>
          </Container>
        )}
      </FlexBox>
    </FlexBox>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Node } from "@contentful/rich-text-types";

import { CfAlignment } from "@aces/types";
import { maxTextWidth, palette, typography } from "@aces/theme";
import { Box, FlexBox, H1, H2, H3, H4, H5, H6, Text } from "@aces/ui";
import {
  CfAccordionsClient,
  CfGridClient,
  CfLockupClient,
  CfImageClient,
  CfButtonClient,
  CfRichTextRenderProps,
} from "@aces/cf";

import { fetchRichTextEmbedEntry } from "./services";
import style from "./style.module.css";

const mapAlignment = (alignment: CfAlignment) =>
  ["center", "inherit", "justify", "left", "right"].includes(
    alignment.toLowerCase(),
  )
    ? (alignment.toLowerCase() as
        | "center"
        | "inherit"
        | "justify"
        | "left"
        | "right")
    : undefined;

const flexMapAlignment = (alignment: CfAlignment) => {
  switch (alignment) {
    case "Center":
      return "center";
    case "Right":
      return "flex-end";
    default:
      return "flex-start";
  }
};

export const CfRichTextRenderClient = ({
  richTextDocument,
  color = palette.text.primary,
  alignment = "Left",
  baseFontSize = typography.body1.fontSize,
  enableMaxTextWidth = false,
  columns,
  lang,
  preview,
  ...rest
}: CfRichTextRenderProps) => {
  const [embeddedEntries, setEmbeddedEntries] = useState<Record<string, any>>(
    {},
  );

  useEffect(() => {
    const ids: string[] = [];
    const collectIds = (node: any) => {
      if (
        node.nodeType === BLOCKS.EMBEDDED_ENTRY ||
        node.nodeType === INLINES.EMBEDDED_ENTRY
      ) {
        ids.push(node.data.target.sys.id);
      }
      if (node.content) node.content.forEach(collectIds);
    };
    richTextDocument.content.forEach(collectIds);

    const fetchEntries = async () => {
      const results: Record<string, any> = {};
      await Promise.all(
        ids.map(async (id) => {
          results[id] = await fetchRichTextEmbedEntry(id);
        }),
      );
      setEmbeddedEntries(results);
    };
    fetchEntries();
  }, [richTextDocument]);

  const processChildrenWithLineBreaks = (
    children: React.ReactNode,
  ): React.ReactNode =>
    React.Children.map(children, (child) => {
      if (typeof child === "string") {
        return child.split("\n").map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ));
      }
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          // @ts-ignore
          children: processChildrenWithLineBreaks(child.props?.children),
        });
      }
      return child;
    });

  const CfText = ({ children }: { children: React.ReactNode }) => (
    <Text
      align={mapAlignment(alignment)}
      style={{
        fontSize: "inherit",
        lineHeight: "inherit",
        paddingBottom: "1rem",
        maxWidth: enableMaxTextWidth ? maxTextWidth : "none",
        marginX:
          enableMaxTextWidth && alignment === "Center" ? "auto" : "inherit",
        "&:last-child": { paddingBottom: 0 },
      }}
    >
      {processChildrenWithLineBreaks(children)}
    </Text>
  );

  const renderEmbeddedBlock = (id: string) => {
    const entry = embeddedEntries[id];
    if (!entry) return null;
    switch (entry.__typename) {
      case "Accordions":
        return (
          <CfAccordionsClient id={id} preview={preview} lang={lang} nested />
        );
      case "Image":
        return (
          <FlexBox marginY={2} justifyContent={flexMapAlignment(alignment)}>
            <CfImageClient id={id} preview={preview} lang={lang} nested />
          </FlexBox>
        );
      case "GridUpdated":
        return <CfGridClient id={id} preview={preview} lang={lang} nested />;
      case "Lockup":
        return <CfLockupClient id={id} preview={preview} lang={lang} nested />;
      default:
        return null;
    }
  };

  const renderEmbeddedInline = (id: string) => {
    const entry = embeddedEntries[id];
    if (!entry) return null;
    switch (entry.__typename) {
      case "Button":
        return <CfButtonClient id={id} preview={preview} lang={lang} />;
      default:
        return null;
    }
  };

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => (
        <CfText>{children}</CfText>
      ),
      [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => (
        <H1
          align={mapAlignment(alignment)}
          style={{
            marginBottom: "1rem",
            maxWidth: enableMaxTextWidth ? maxTextWidth : "none",
            marginX:
              enableMaxTextWidth && alignment === "Center" ? "auto" : "inherit",
          }}
        >
          {children}
        </H1>
      ),
      [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => (
        <H2
          align={mapAlignment(alignment)}
          style={{
            marginBottom: "1rem",
            maxWidth: enableMaxTextWidth ? maxTextWidth : "none",
            marginX:
              enableMaxTextWidth && alignment === "Center" ? "auto" : "inherit",
          }}
        >
          {children}
        </H2>
      ),
      [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => (
        <H3
          align={mapAlignment(alignment)}
          style={{
            marginBottom: "1rem",
            maxWidth: enableMaxTextWidth ? maxTextWidth : "none",
            marginX:
              enableMaxTextWidth && alignment === "Center" ? "auto" : "inherit",
          }}
        >
          {children}
        </H3>
      ),
      [BLOCKS.HEADING_4]: (_node: Node, children: React.ReactNode) => (
        <H4
          align={mapAlignment(alignment)}
          style={{
            marginBottom: ".75rem",
            maxWidth: enableMaxTextWidth ? maxTextWidth : "none",
            marginX:
              enableMaxTextWidth && alignment === "Center" ? "auto" : "inherit",
          }}
        >
          {children}
        </H4>
      ),
      [BLOCKS.HEADING_5]: (_node: Node, children: React.ReactNode) => (
        <H5
          align={mapAlignment(alignment)}
          style={{
            marginBottom: ".5rem",
            maxWidth: enableMaxTextWidth ? maxTextWidth : "none",
            marginX:
              enableMaxTextWidth && alignment === "Center" ? "auto" : "inherit",
          }}
        >
          {children}
        </H5>
      ),
      [BLOCKS.HEADING_6]: (_node: Node, children: React.ReactNode) => (
        <H6
          align={mapAlignment(alignment)}
          style={{
            marginBottom: ".5rem",
            maxWidth: enableMaxTextWidth ? maxTextWidth : "none",
            marginX:
              enableMaxTextWidth && alignment === "Center" ? "auto" : "inherit",
          }}
        >
          {children}
        </H6>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) =>
        renderEmbeddedBlock(node.data.target.sys.id),
      [INLINES.EMBEDDED_ENTRY]: (node: Node) =>
        renderEmbeddedInline(node.data.target.sys.id),
    },
  };

  return (
    <Box
      className={style.richText}
      style={{
        color,
        fontSize: baseFontSize,
        lineHeight: 1.75,
        columns,
        columnGap: { xs: "80px", md: "100px" },
        "& > p": {
          breakInside: "avoid",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        },
      }}
      {...rest}
    >
      {documentToReactComponents(richTextDocument, options)}
    </Box>
  );
};

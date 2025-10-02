"use client";

import { ContentfulLivePreview } from "@contentful/live-preview";

import { useUIState } from "@aces/store";
import { CfBaseComponent, CfLinkProps, CustomCssProps } from "@aces/types";
import { generateId } from "@aces/utils";
import { palette } from "@aces/theme";
import { Button, ButtonColor, ButtonVariant, Icon, IconEnum } from "@aces/ui";
import {
  buttonStyles,
  ButtonStyleType,
  CfLink,
  CfModalClient,
  CfModalProps,
} from "@aces/cf";

export interface CfButtonProps extends CfBaseComponent {
  title: string;
  link: CfLinkProps | CfModalProps;
  buttonStyle: ButtonStyleType;
  rightIcon?: IconEnum;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  customStyles?: CustomCssProps;
}

export interface CfButtonUiProps extends CfBaseComponent {
  title: string;
  style: {
    color: any;
    variant: any;
  };
  rightIcon?: IconEnum;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  customStyles?: CustomCssProps;
  onClick?: () => void;
}

export const CfButton = ({
  internalTitle,
  title,
  link,
  buttonStyle,
  rightIcon,
  fullWidth,
  fullWidthMobile,
  customStyles,
  __typename,
  id,
  lang,
  preview,
}: CfButtonProps) => {
  const style = buttonStyles[buttonStyle];

  const { setActiveModal } = useUIState();

  const isCfLink = (link: any): link is CfLinkProps => {
    return "linkType" in link;
  };

  const isCfModal = (link: any): link is CfModalProps => {
    return "internalTitle" in link;
  };

  if (!Button || !style) return null;

  if (isCfLink(link)) {
    return (
      <CfLink
        linkType={link.linkType}
        pageLink={link.pageLink}
        customLink={link.customLink}
        target={link.target}
        lang={lang}
        style={{
          width: fullWidth ? "100%" : "auto",
        }}
      >
        <CfButtonUi
          internalTitle={internalTitle}
          title={title}
          style={style}
          rightIcon={rightIcon}
          fullWidth={fullWidth}
          fullWidthMobile={fullWidthMobile}
          customStyles={customStyles}
          __typename={__typename}
          id={id}
          lang={lang}
          preview={preview}
        />
      </CfLink>
    );
  }

  if (isCfModal(link)) {
    return (
      <>
        <CfButtonUi
          internalTitle={internalTitle}
          title={title}
          style={style}
          rightIcon={rightIcon}
          fullWidth={fullWidth}
          fullWidthMobile={fullWidthMobile}
          customStyles={customStyles}
          onClick={() => setActiveModal(generateId(link.internalTitle))}
          __typename={__typename}
          id={id}
          lang={lang}
          preview={preview}
        />
        <CfModalClient id={link?.sys?.id || ""} lang={lang} preview={preview} />
      </>
    );
  }
};

const CfButtonUi = ({
  internalTitle,
  title,
  style,
  rightIcon,
  fullWidth,
  fullWidthMobile,
  customStyles,
  onClick,
  __typename,
  id,
  lang,
  preview,
}: CfButtonUiProps) => {
  return (
    <Button
      id={generateId(internalTitle)}
      data-component={__typename}
      color={style.color}
      variant={style.variant}
      fullWidth={fullWidth}
      fullWidthMobile={fullWidthMobile}
      onClick={onClick}
      endIcon={
        rightIcon && (
          <Icon
            icon={rightIcon as IconEnum}
            color={palette.primary.main}
            marginLeft={4}
            style={
              rightIcon === "ArrowForward"
                ? { transform: "rotate(-45deg)" }
                : {}
            }
          />
        )
      }
      style={customStyles}
      {...ContentfulLivePreview.getProps({
        entryId: id,
        fieldId: "title",
        locale: lang,
      })}
    >
      {title}
    </Button>
  );
};

export interface CfButtonListingProps extends CfBaseComponent {
  rightIcon?: IconEnum;
  title: string;
  link: CfLinkProps | CfModalProps;
  style: {
    color: ButtonColor;
    variant: ButtonVariant;
  };
}

export const CfButtonListing = ({
  id,
  lang,
  preview,
  internalTitle,
  __typename,
  rightIcon,
  title,
  link,
  style,
}: CfButtonListingProps) => {
  const isCfLink = (link: any): link is CfLinkProps => {
    return "linkType" in link;
  };

  const isCfModal = (link: any): link is CfModalProps => {
    return "internalTitle" in link;
  };

  if (!Button || !style) return null;

  if (isCfLink(link)) {
    return (
      <CfLink
        linkType={link.linkType}
        target={link.target}
        pageLink={link.pageLink}
        customLink={link.customLink}
      >
        <Button
          key={generateId(internalTitle)}
          id={generateId(internalTitle)}
          data-component={__typename}
          color={style.color}
          variant={style.variant}
          style={{
            justifyContent: "space-between",
            border: "none",
            borderRadius: 0,
            width: "100%",
          }}
          endIcon={
            rightIcon && (
              <Icon
                icon={rightIcon as IconEnum}
                color={palette.primary.main}
                marginLeft={4}
                style={{ transform: "rotate(-45deg)" }}
              />
            )
          }
        >
          {title}
        </Button>
      </CfLink>
    );
  }
};

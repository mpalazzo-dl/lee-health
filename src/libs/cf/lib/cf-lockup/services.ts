import { gql } from "@apollo/client";

import {
  ButtonFragment,
  cfClient,
  cfPreviewClient,
  ImageFragment,
} from "@aces/contentful";
import { defaultLocale } from "@aces/i18n";
import { VideoEmbedFragment } from "../cf-video-embed/services";
import { ButtonListFragment } from "../cf-button-list/services";

export const LockupFragement = gql`
  ${ButtonFragment}
  ${ButtonListFragment}
  ${ImageFragment}
  ${VideoEmbedFragment}

  fragment Lockup on Lockup {
    internalTitle
    headline
    subhead
    bodyCopy {
      json
    }
    buttonsCollection(limit: 2) {
      items {
        ...Button
        ...ButtonList
      }
    }
    media {
      __typename
      ...Image
      ...VideoEmbed
    }
    mediaSize
    mediaAlignment
    mediaBleed
    sys {
      id
    }
  }
`;

export const LockupQuery = gql`
  ${LockupFragement}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    lockup(id: $id, preview: $preview, locale: $locale) {
      ...Lockup
    }
  }
`;

export const fetchLockup = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: LockupQuery,
      variables: { id, preview, locale },
    });
    return response.data.lockup;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

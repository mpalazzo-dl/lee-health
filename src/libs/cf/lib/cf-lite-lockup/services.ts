import { gql } from "@apollo/client";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

export const LiteLockupQuery = gql`
  query ($id: String!, $preview: Boolean!, $locale: String) {
    liteLockup(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      headline
      subhead
      buttonText
      pageLink {
        slug
        parentPage {
          slug
        }
      }
      image {
        height
        width
        url
      }
      mediaAlignment
      bodyCopy {
        json
      }
      sys {
        id
      }
    }
  }
`;

export const fetchLiteLockupData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: LiteLockupQuery,
      variables: { id, preview, locale },
    });
    console.log(response.data.liteLockup);
    return response.data.liteLockup;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

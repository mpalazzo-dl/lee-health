import { gql } from "@apollo/client";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

export const LiteHeroQuery = gql`
  query ($id: String!, $preview: Boolean!, $locale: String) {
    liteHero(id: $id, preview: $preview, locale: $locale) {
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
      fullOverlay
      slim
      sys {
        id
      }
    }
  }
`;

export const fetchLiteHeroData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: LiteHeroQuery,
      variables: { id, preview, locale },
    });

    return response.data.liteHero;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

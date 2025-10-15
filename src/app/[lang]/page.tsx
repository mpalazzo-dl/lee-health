import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { defaultLocale } from "@aces/i18n";
import { PageProps, SpecialtyPages } from "@aces/types";
import { fetchSpecialtyPageData } from "@aces/contentful";
import {
  buildMetadata,
  DefaultPageHero,
  DefaultPageBody,
} from "@aces/features";

import PagePreviewClient from "./_components/page-preview-client";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const pageData = await fetchSpecialtyPageData(
    SpecialtyPages.Homepage,
    isEnabled,
  );
  const pageResponse = pageData.pageResponse.data.pageCollection.items[0];

  if (!pageResponse) {
    notFound();
  }

  return await buildMetadata(pageResponse.seo, {});
}

export default async function Homepage({
  params,
}: {
  params: Promise<PageProps>;
}) {
  const resolvedParams = await params;
  const { lang = defaultLocale } = resolvedParams;

  const { isEnabled } = await draftMode();

  const pageData = await fetchSpecialtyPageData("Homepage", false, lang);

  if (isEnabled) {
    return (
      <PagePreviewClient
        slug={pageData.pageResponse.data.pageCollection.items[0].slug}
      />
    );
  }

  const pageResponse = pageData.pageResponse.data.pageCollection.items[0];

  if (!pageResponse) notFound();

  const pageHeroResponse = pageData.pageHeroResponse.data.page.pageHero;
  const pageBodyResponse =
    pageData.pageBodyResponse.data.page.pageBodyCollection.items;

  return (
    <>
      <DefaultPageHero item={pageHeroResponse} lang={lang} preview={true} />
      <DefaultPageBody items={pageBodyResponse} lang={lang} preview={true} />
    </>
  );
}

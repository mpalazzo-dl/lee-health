import { redirect } from "next/navigation";

import { RouteDirectory, SpecialtyPages } from "@aces/types";
import { EnableArticles } from "@aces/features";
import { defaultLocale } from "@aces/i18n";

export const specialtyPageRedirect = (
  specialtyPage: string,
  locale?: string,
) => {
  if (!specialtyPage) return;

  const localePrefix = locale && locale !== defaultLocale ? `/${locale}` : "";

  switch (specialtyPage) {
    case SpecialtyPages.Homepage:
      return redirect(`${localePrefix}${RouteDirectory.Homepage}`);
    case SpecialtyPages.Articles:
      if (EnableArticles) {
        return redirect(`${localePrefix}${RouteDirectory.Articles}`);
      }
      break;
    default:
      break;
  }
};

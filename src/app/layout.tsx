import React from "react";
import { draftMode } from "next/headers";
import { GoogleTagManager } from "@next/third-parties/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import { defaultLocale } from "@aces/i18n";
import { palette, theme } from "@aces/theme";
import { FlexBox } from "@aces/ui";
import { DraftModeBar, HeaderServer, FooterServer } from "@aces/features";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

export async function generateMetadata() {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  };
}

export default async function RootLayout({
  children,
  params: { lang = defaultLocale },
}: Readonly<{
  children: React.ReactNode;
  params: { lang?: string };
}>) {
  const { isEnabled } = await draftMode();
  const appId = process.env.NEXT_PUBLIC_CF_APP_ID || "";
  const gtmId = process.env.NEXT_PUBLIC_CF_GTM_ID || "";

  return (
    <html lang={lang}>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body style={{ backgroundColor: palette.background.default }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <HeaderServer
              appId={appId}
              sticky={false}
              preview={isEnabled}
              lang={lang}
            />
            <FlexBox component="main" flexDirection={"column"} flex={1}>
              {children}
            </FlexBox>
            <FooterServer appId={appId} preview={isEnabled} lang={lang} />
            {isEnabled && <DraftModeBar />}
          </ThemeProvider>
        </AppRouterCacheProvider>
        {/* {isEnabled && <Script src={`/scripts/${lang}.mjs`} />} */}
      </body>
    </html>
  );
}

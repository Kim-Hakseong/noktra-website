import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LangProvider } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { SITE_URL, siteGraph } from "@/lib/seo";
import { asset } from "@/lib/asset";

// 시안 지정 폰트 3계층 — next/font로 셀프호스트(woff2), 외부 요청 없음
const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-data",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.positioning}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.desc,
  applicationName: SITE.name,
  keywords: [
    "NOKTRA",
    "verification tools",
    "test engineering",
    "offline-first",
    "air-gapped",
    "deterministic verification",
    "golden vectors",
    "ICD",
    "SIL",
    "IRIG 106",
    "SECS/GEM",
    "FMECA",
  ],
  icons: { icon: [{ url: asset("/favicon.svg"), type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.positioning}`,
    description: SITE.desc,
    url: `${SITE_URL}/`,
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} — ${SITE.positioning}`,
    description: SITE.desc,
  },
};

// FOUC 방지: 첫 페인트 전에 data-theme 확정.
// 기본값은 prefers-color-scheme, localStorage('noktra-theme') 우선.
const themeInit = `(function(){try{var t=localStorage.getItem('noktra-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <JsonLd data={siteGraph()} />
        <LangProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}

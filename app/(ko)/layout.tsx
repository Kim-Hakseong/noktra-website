import type { Metadata } from "next";
import "@/styles/tokens.css";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LangProvider } from "@/lib/i18n";
import { siteGraph } from "@/lib/seo";
import { fontClass, themeInit } from "@/lib/fonts";
import { rootMetadata } from "@/lib/root-meta";

export const metadata: Metadata = rootMetadata("ko");

export default function KoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      data-theme="dark"
      className={fontClass}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <JsonLd data={siteGraph()} />
        <LangProvider lang="ko">
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}

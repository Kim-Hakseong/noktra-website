import type { Metadata } from "next";
import "@/styles/tokens.css";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LangProvider } from "@/lib/i18n";
import StarField from "@/components/StarField";
import ScrollRail from "@/components/ScrollRail";
import { siteGraph } from "@/lib/seo";
import { fontClass, themeInit } from "@/lib/fonts";
import { rootMetadata } from "@/lib/root-meta";

export const metadata: Metadata = rootMetadata("en");

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={fontClass}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <StarField />
        <ScrollRail />
        <JsonLd data={siteGraph()} />
        <LangProvider lang="en">
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}

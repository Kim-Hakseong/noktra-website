import type { Metadata } from "next";
import BrandPage from "@/components/pages/BrandPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "What NOKTRA is: an offline-first brand of desktop instruments for test and verification engineering — the name, the principles, the structure, the look.",
  alternates: localeAlternates("/brand/", "en"),
};

export default function Page() {
  return <BrandPage />;
}

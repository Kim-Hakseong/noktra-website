import type { Metadata } from "next";
import ProductsIndexPage from "@/components/pages/ProductsIndexPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Every build, every state, one page. Nine verification instruments across five verbs.",
  alternates: localeAlternates("/products/", "en"),
};

export default function Page() {
  return <ProductsIndexPage />;
}

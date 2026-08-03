import type { Metadata } from "next";
import ProductsIndexPage from "@/components/pages/ProductsIndexPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "제품",
  description:
    "모든 빌드, 모든 상태를 한 페이지에. 다섯 개의 동사, 아홉 개의 검증 도구.",
  alternates: localeAlternates("/products/", "ko"),
};

export default function Page() {
  return <ProductsIndexPage />;
}

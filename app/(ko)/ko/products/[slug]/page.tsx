import type { Metadata } from "next";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { PRODUCTS, productBySlug } from "@/lib/products";
import { koOf } from "@/lib/ko";
import { localeAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = productBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: koOf(p.slug)?.oneLiner ?? p.oneLiner,
    alternates: localeAlternates(`/products/${p.slug}/`, "ko"),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductDetailPage slug={params.slug} lang="ko" />;
}

import type { Metadata } from "next";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { PRODUCTS, productBySlug } from "@/lib/products";
import { koOf } from "@/lib/ko";
import { localeAlternates } from "@/lib/seo";
import { productOgMeta } from "@/lib/root-meta";

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
  const desc = koOf(p.slug)?.oneLiner ?? p.oneLiner;
  return {
    title: p.name,
    description: desc,
    alternates: localeAlternates(`/products/${p.slug}/`, "ko"),
    ...productOgMeta({
      name: p.name,
      description: desc,
      slug: p.slug,
      lang: "ko",
    }),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductDetailPage slug={params.slug} lang="ko" />;
}

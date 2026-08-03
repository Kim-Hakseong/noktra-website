import type { Metadata } from "next";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { PRODUCTS, productBySlug } from "@/lib/products";
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
  return {
    title: p.name,
    description: p.oneLiner,
    alternates: localeAlternates(`/products/${p.slug}/`, "en"),
    ...productOgMeta({
      name: p.name,
      description: p.oneLiner,
      slug: p.slug,
      lang: "en",
    }),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductDetailPage slug={params.slug} lang="en" />;
}

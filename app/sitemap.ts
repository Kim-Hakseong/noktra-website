import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { NOTES } from "@/content/notes";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    "/method",
    "/notes",
    "/brand",
    "/security",
    "/contact",
    ...PRODUCTS.map((p) => `/products/${p.slug}`),
    ...NOTES.map((n) => `/notes/${n.slug}`),
  ];
  // en + ko 로케일 쌍 — hreflang은 각 페이지 <head>의 alternates가 담당
  return paths.flatMap((r) => [
    {
      url: `${SITE_URL}${r}/`,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : r.startsWith("/products/") ? 0.8 : 0.7,
    },
    {
      url: `${SITE_URL}/ko${r}/`,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 0.9 : r.startsWith("/products/") ? 0.7 : 0.6,
    },
  ]);
}

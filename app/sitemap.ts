import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/method", "/contact"].map((r) => ({
    url: `${SITE_URL}${r}/`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const products = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...routes, ...products];
}

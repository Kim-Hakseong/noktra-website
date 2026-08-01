// lib/seo.ts — JSON-LD 그래프 (Organization + SoftwareApplication ×9)
import { PRODUCTS, STATUS_LABEL } from "@/lib/products";
import { SITE } from "@/lib/site";

const ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://kim-hakseong.github.io";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_URL = `${ORIGIN}${BASE}`;

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE.name,
        url: `${SITE_URL}/`,
        email: SITE.email,
        sameAs: [SITE.github],
        slogan: SITE.philosophy,
        description: SITE.desc,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        name: SITE.name,
        url: `${SITE_URL}/`,
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      ...PRODUCTS.map((p) => ({
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/products/${p.slug}/#app`,
        name: p.name,
        url: `${SITE_URL}/products/${p.slug}/`,
        description: p.oneLiner,
        applicationCategory: "DeveloperApplication",
        operatingSystem: p.specs.find(([k]) => k === "Platform")?.[1],
        creativeWorkStatus: STATUS_LABEL[p.status],
        author: { "@id": `${SITE_URL}/#org` },
      })),
    ],
  };
}

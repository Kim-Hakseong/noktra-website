// lib/seo.ts — JSON-LD 그래프 (Organization + SoftwareApplication ×9 + FAQ/Breadcrumb)
// sameAs 저장소 연결·FAQPage 패턴은 testbench.tools(운영 사이트) 스택에서 이식.
import {
  PRODUCTS,
  STATUS_LABEL,
  refOf,
  verbLabel,
  type Product,
} from "@/lib/products";
import { SITE } from "@/lib/site";

const ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://kim-hakseong.github.io";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_URL = `${ORIGIN}${BASE}`;

// 브랜드 저장소 전체 — 검색·AI 엔진이 사이트와 오픈소스를
// 하나의 엔티티로 해석하도록 sameAs에 연결.
export const NOKTRA_REPOS = [SITE.github, ...PRODUCTS.map((p) => p.repo)];

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
        sameAs: NOKTRA_REPOS,
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

export interface FaqItem {
  q: string;
  qKo: string;
  a: string;
  aKo: string;
}

/** 제품 FAQ — products.json 사실(상태·스펙·저장소)에서만 파생. 창작 주장 없음. */
export function productFaqs(p: Product): FaqItem[] {
  const platform = p.specs.find(([k]) => k === "Platform")?.[1];
  const hasDownload = Boolean(p.download.win || p.download.mac);
  const faqs: FaqItem[] = [
    {
      q: `Does ${p.name} work offline?`,
      qKo: `${p.name}는 오프라인에서 동작하나요?`,
      a: `Yes. Like every NOKTRA instrument it is offline-first: no cloud services, no telemetry, and any AI runs locally on your own machine. It is built for air-gapped networks.`,
      aKo: `네. 모든 NOKTRA 도구처럼 오프라인 우선입니다: 클라우드 서비스도, 텔레메트리도 없고, AI는 전부 사용자 머신에서 로컬로 실행됩니다. 폐쇄망을 전제로 만들어졌습니다.`,
    },
    {
      q: `What platform does ${p.name} run on?`,
      qKo: `${p.name}는 어떤 플랫폼에서 실행되나요?`,
      a: platform
        ? `${platform}. ${p.specs.find(([k]) => k === "Deploy")?.[1] === "Single-file exe" ? "It ships as a single executable — no runtime install." : "See the datasheet on this page for build details."}`
        : "See the datasheet on this page for build details.",
      aKo: platform
        ? `${platform}. ${p.specs.find(([k]) => k === "Deploy")?.[1] === "Single-file exe" ? "단일 실행 파일로 배포됩니다 — 런타임 설치가 없습니다." : "빌드 상세는 이 페이지의 데이터시트를 참고하세요."}`
        : "빌드 상세는 이 페이지의 데이터시트를 참고하세요.",
    },
    {
      q: `Is ${p.name} available for download now?`,
      qKo: `${p.name}는 지금 내려받을 수 있나요?`,
      a: hasDownload
        ? `Yes — the current build downloads directly from this page.`
        : `Not yet — it is ${STATUS_LABEL[p.status].toLowerCase()}. It is listed with no promised date, until a build exists you can run. Development is public in the repository.`,
      aKo: hasDownload
        ? `네 — 현재 빌드를 이 페이지에서 바로 내려받을 수 있습니다.`
        : `아직입니다 — 현재 ${STATUS_LABEL[p.status] === "In development" ? "개발 중" : STATUS_LABEL[p.status]}입니다. 실행할 수 있는 빌드가 나오기 전까지 날짜를 약속하지 않고 목록에만 올립니다. 개발 과정은 저장소에 공개되어 있습니다.`,
    },
    {
      q: `Where is the source code for ${p.name}?`,
      qKo: `${p.name}의 소스는 어디에 있나요?`,
      a: `On GitHub: ${p.repo}`,
      aKo: `GitHub에 있습니다: ${p.repo}`,
    },
  ];
  return faqs;
}

/** FAQPage + BreadcrumbList JSON-LD (제품 상세) — 로케일별 URL·문구 */
export function productPageGraph(p: Product, lang: "en" | "ko" = "en") {
  const prefix = lang === "ko" ? "/ko" : "";
  const url = `${SITE_URL}${prefix}/products/${p.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: productFaqs(p).map((f) => ({
          "@type": "Question",
          name: lang === "ko" ? f.qKo : f.q,
          acceptedAnswer: { "@type": "Answer", text: lang === "ko" ? f.aKo : f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#crumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: `${SITE_URL}${prefix}/` },
          { "@type": "ListItem", position: 2, name: lang === "ko" ? "제품" : "Products", item: `${SITE_URL}${prefix}/products/` },
          { "@type": "ListItem", position: 3, name: `${p.name} (${refOf(p.slug)} · ${verbLabel(p.verb)})`, item: url },
        ],
      },
    ],
  };
}

/** hreflang 대응 canonical/languages (Metadata.alternates) — path는 "/products/" 꼴 */
export function localeAlternates(path: string, lang: "en" | "ko") {
  const koPath = path === "/" ? "/ko/" : `/ko${path}`;
  return {
    canonical: lang === "ko" ? koPath : path,
    languages: { en: path, ko: koPath, "x-default": path },
  };
}

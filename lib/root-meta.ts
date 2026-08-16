// 로케일 루트 레이아웃 공용 메타데이터 팩토리
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SITE_URL } from "@/lib/seo";
import { asset } from "@/lib/asset";
import type { Lang } from "@/lib/i18n";

export const KO_POSITIONING = "폐쇄망 환경을 위한 검증 도구.";
export const KO_DESC =
  "방위·항공우주·산업·반도체 시험 엔지니어링을 위한 아홉 개의 데스크톱 도구. 인터넷과 완전히 분리된 네트워크에서 동작하도록 설계되었습니다.";

/** 제품 페이지 전용 OG/트위터 카드 — 자식 openGraph는 부모를 통째로 대체하므로 완전한 객체를 반환 */
export function productOgMeta(opts: {
  name: string;
  description: string;
  slug: string;
  lang: Lang;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const title = `${opts.name} — ${SITE.name}`;
  const image = `/og/${opts.slug}.png`;
  const prefix = opts.lang === "ko" ? "/ko" : "";
  return {
    openGraph: {
      type: "website",
      locale: opts.lang === "ko" ? "ko_KR" : "en_US",
      siteName: SITE.name,
      title,
      description: opts.description,
      url: `${SITE_URL}${prefix}/products/${opts.slug}/`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opts.description,
      images: [image],
    },
  };
}

export function rootMetadata(lang: Lang): Metadata {
  const title =
    lang === "ko"
      ? `${SITE.name} — ${KO_POSITIONING}`
      : `${SITE.name} — ${SITE.positioning}`;
  const description = lang === "ko" ? KO_DESC : SITE.desc;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${SITE.name}` },
    description,
    applicationName: SITE.name,
    keywords: [
      "NOKTRA",
      "verification tools",
      "test engineering",
      "offline-first",
      "air-gapped",
      "deterministic verification",
      "golden vectors",
      "ICD",
      "SIL",
      "IRIG 106",
      "SECS/GEM",
      "FMECA",
      ...(lang === "ko"
        ? ["검증 도구", "시험 자동화", "폐쇄망", "오프라인", "신뢰성"]
        : []),
    ],
    icons: { icon: [{ url: asset("/favicon.svg?v=2"), type: "image/svg+xml" }] },
    openGraph: {
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      siteName: SITE.name,
      title,
      description,
      url: `${SITE_URL}${lang === "ko" ? "/ko/" : "/"}`,
      // 공용 프리뷰 카드 — metadataBase(basePath 포함)가 절대화하므로 루트 상대 경로.
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

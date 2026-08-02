// lib/ko.ts — content/product-i18n.ko.json 소비층 (영문 원본과 배열 순서 대응)
import ko from "@/content/product-i18n.ko.json";

export interface KoProduct {
  oneLiner: string;
  intro: string;
  needs: { need: string; answer: string }[];
  gallery: { title: string; body: string }[];
  features: string[];
}

const MAP = ko.products as Record<string, KoProduct>;

export function koOf(slug: string): KoProduct | undefined {
  return MAP[slug];
}

/** 클라이언트 컴포넌트에 통째로 넘길 slug→한줄 맵 */
export const KO_ONELINERS: Record<string, string> = Object.fromEntries(
  Object.entries(MAP).map(([slug, v]) => [slug, v.oneLiner])
);

// lib/details.ts — content/product-details.json 소비층
// (README 발췌 워크스루 콘텐츠 — 문장 출처는 각 제품 저장소)
import data from "@/content/product-details.json";

export interface GalleryItem {
  image: string;
  title: string;
  body: string;
}

export interface ProductDetail {
  intro: string;
  gallery: GalleryItem[];
}

const DETAILS = data.details as Record<string, ProductDetail>;

export function detailOf(slug: string): ProductDetail | undefined {
  return DETAILS[slug];
}

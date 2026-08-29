// lib/products.ts — content/products.json 단일 진실 소비층 (문구 수정 금지)
import data from "@/content/products.json";

/** 제품 저장소 공개 여부. false면 사이트 어디에도 저장소 링크를 노출하지 않는다
 *  (비공개 저장소 링크는 방문자에게 404가 되므로). products.json의 repo URL은
 *  그대로 보존되며, 공개로 되돌릴 때 이 한 줄만 true로 바꾸면 복구된다. */
export const REPOS_PUBLIC = false;

export type ProductStatus = "available" | "beta" | "in-development";

export interface Product {
  slug: string;
  name: string;
  verb: string;
  status: ProductStatus;
  repo: string;
  download: { win: string; mac: string };
  /** 릴리스 무결성 검증용 — 실물 릴리스 등록 시 사람이 주입. 없으면 미표시 */
  sha256?: { win?: string; mac?: string };
  oneLiner: string;
  features: string[];
  specs: [string, string][];
  image?: string;
}

export interface Verb {
  id: string;
  label: string;
}

export const VERBS: Verb[] = data.verbs;
export const PRODUCTS: Product[] = data.products as Product[];

/** REF 코드: products.json 배열 순서 기준 NK-01 … NK-09 */
export function refOf(slug: string): string {
  const i = PRODUCTS.findIndex((p) => p.slug === slug);
  return `NK-${String(i + 1).padStart(2, "0")}`;
}

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByVerb(verbId: string): Product[] {
  return PRODUCTS.filter((p) => p.verb === verbId);
}

export function verbLabel(verbId: string): string {
  return VERBS.find((v) => v.id === verbId)?.label ?? verbId;
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  available: "Available",
  beta: "Beta",
  "in-development": "In development",
};

/** 상태 배지 시맨틱 (DESIGN.md): available=액센트 / beta=amber / in-development=mute */
export const STATUS_CLASS: Record<ProductStatus, string> = {
  available: "st-ok",
  beta: "st-amber",
  "in-development": "st-mute",
};

export function statusTally(): string {
  const n = (s: ProductStatus) => PRODUCTS.filter((p) => p.status === s).length;
  return `${PRODUCTS.length} instruments · ${n("available")} available · ${n("beta")} beta · ${n("in-development")} in development`;
}

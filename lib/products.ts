// lib/products.ts — content/products.json 단일 진실 소비층 (문구 수정 금지)
import data from "@/content/products.json";

export type ProductStatus = "available" | "beta" | "in-development";

export interface Product {
  slug: string;
  name: string;
  verb: string;
  status: ProductStatus;
  repo: string;
  download: { win: string; mac: string };
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

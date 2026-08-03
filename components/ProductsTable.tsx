"use client";

// /products 인덱스 테이블 — Products Index 시안 정본 (동사·상태 필터 + 행 테이블).
// 제품 정보는 content/products.json 단일 진실 (props 주입).
import { useState } from "react";
import LLink from "@/components/LLink";
import { useLang } from "@/lib/i18n";
import {
  STATUS_CLASS,
  STATUS_LABEL,
  type Product,
  type ProductStatus,
  type Verb,
} from "@/lib/products";

interface Props {
  verbs: Verb[];
  products: Product[];
  koOneLiners?: Record<string, string>;
}

type StateFilter = "all" | ProductStatus;

export default function ProductsTable({ verbs, products, koOneLiners }: Props) {
  const [verb, setVerb] = useState<string>("all");
  const [state, setState] = useState<StateFilter>("all");
  const { lang } = useLang();
  const t = (en: string, ko: string) => (lang === "ko" ? ko : en);

  const refOf = (slug: string) =>
    `NK-${String(products.findIndex((p) => p.slug === slug) + 1).padStart(2, "0")}`;

  const rows = products.filter(
    (p) =>
      (verb === "all" || p.verb === verb) &&
      (state === "all" || p.status === state)
  );

  const verbFilters: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    ...verbs.map((v) => ({ label: v.label, value: v.id })),
  ];
  const stateFilters: { label: string; value: StateFilter }[] = [
    { label: "All", value: "all" },
    { label: "Available", value: "available" },
    { label: "Beta", value: "beta" },
    { label: "In dev", value: "in-development" },
  ];

  const seg = (
    label: string,
    active: boolean,
    onClick: () => void
  ) => (
    <button
      key={label}
      onClick={onClick}
      style={{
        fontFamily: "var(--font-data), monospace",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        paddingBottom: 4,
        borderBottom: `1px solid ${active ? "var(--accent)" : "transparent"}`,
        color: active ? "var(--accent)" : "var(--text-dim)",
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 34,
          paddingBottom: 26,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span className="t-label t-label--faint" style={{ fontSize: 10 }}>
            Verb
          </span>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {verbFilters.map((f) =>
              seg(f.label, verb === f.value, () => setVerb(f.value))
            )}
          </div>
        </div>
        <span style={{ flex: 1, height: 1, background: "var(--line-soft)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span className="t-label t-label--faint" style={{ fontSize: 10 }}>
            State
          </span>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {stateFilters.map((f) =>
              seg(f.label, state === f.value, () => setState(f.value))
            )}
          </div>
        </div>
      </div>

      <div className="tbl__cols">
        <span>Ref</span>
        <span>Instrument</span>
        <span>Verb</span>
        <span>State</span>
        <span style={{ textAlign: "right" }}>Build</span>
      </div>

      {rows.map((p) => {
        const hasDownload = Boolean(p.download.win || p.download.mac);
        return (
          <div className="tbl__row" key={p.slug} id={p.verb}>
            <span className="tbl__ref">{refOf(p.slug)}</span>
            <span className="tbl__name" style={{ minWidth: 0 }}>
              <LLink href={`/products/${p.slug}`}>{p.name}</LLink>
              <span className="tbl__line">
                {lang === "ko" && koOneLiners?.[p.slug]
                  ? koOneLiners[p.slug]
                  : p.oneLiner}
              </span>
            </span>
            <span className="tbl__verb">
              {verbs.find((v) => v.id === p.verb)?.label}
            </span>
            <span className={`tbl__state ${STATUS_CLASS[p.status]}`}>
              <span className="tick" />
              {STATUS_LABEL[p.status]}
            </span>
            <span className="tbl__cta">
              {hasDownload ? (
                <a className="st-ok" href={p.download.win || p.download.mac}>
                  {t("Download", "다운로드")}
                </a>
              ) : (
                <LLink href={`/products/${p.slug}`} className="st-mute">
                  {t("Details", "상세 보기")}
                </LLink>
              )}
            </span>
          </div>
        );
      })}

      <div className="tbl__foot">
        <span>
          {rows.length === products.length
            ? t(
                `Showing all ${products.length} refs`,
                `전체 ${products.length}개 표시 중`
              )
            : t(
                `Showing ${rows.length} of ${products.length} refs`,
                `${products.length}개 중 ${rows.length}개 표시 중`
              )}
        </span>
        <span>All builds win64 · single-file · no telemetry</span>
      </div>
    </>
  );
}

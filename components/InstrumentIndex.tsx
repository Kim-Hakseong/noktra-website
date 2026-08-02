"use client";

// 홈 Instrument index — Home v2 시안 정본 (좌측 리스트 + 우측 상세 패널).
// 제품 정보는 content/products.json 단일 진실 (props 주입).
import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";
import { useLang } from "@/lib/i18n";
import {
  STATUS_CLASS,
  STATUS_LABEL,
  type Product,
  type Verb,
} from "@/lib/products";

interface Props {
  verbs: Verb[];
  products: Product[];
  koOneLiners?: Record<string, string>;
}

export default function InstrumentIndex({ verbs, products, koOneLiners }: Props) {
  const [selected, setSelected] = useState(products[0]?.slug ?? "");
  const { lang } = useLang();
  const t = (en: string, ko: string) => (lang === "ko" ? ko : en);
  const sel = products.find((p) => p.slug === selected) ?? products[0];
  const refOf = (slug: string) =>
    `NK-${String(products.findIndex((p) => p.slug === slug) + 1).padStart(2, "0")}`;
  const selVerb = verbs.find((v) => v.id === sel.verb);
  const hasDownload = Boolean(sel.download.win || sel.download.mac);

  return (
    <section id="products" className="band band--catalog">
      <div className="wrap band__in">
        <Reveal className="sec-head">
          <div>
            <div className="t-label">Instrument index</div>
            <h2>
              {t("Nine instruments, five verbs.", "아홉 개의 도구, 다섯 개의 동사.")}
            </h2>
          </div>
          <p className="side">
            {t(
              "Select a line to read its specification. Every build ships as one file with a golden-vector suite.",
              "행을 선택하면 사양이 열립니다. 모든 빌드는 골든 벡터 스위트를 품은 단일 파일로 배포됩니다."
            )}
          </p>
        </Reveal>

        <Reveal className="idx" delay={1}>
          <div className="idx__list">
            <div className="idx__cols">
              <span>Ref</span>
              <span>Instrument</span>
              <span>State</span>
            </div>
            {verbs.map((verb, vi) => {
              const tools = products.filter((p) => p.verb === verb.id);
              return (
                <div key={verb.id}>
                  <div className="idx__verb">
                    <span className="idx__verb-name">{verb.label}</span>
                    <span className="idx__verb-rule" />
                    <span className="idx__verb-meta">
                      {String(vi + 1).padStart(2, "0")} · {tools.length}{" "}
                      {tools.length === 1 ? "ref" : "refs"}
                    </span>
                  </div>
                  {tools.map((tool) => (
                    <button
                      key={tool.slug}
                      className="idx__row"
                      aria-pressed={tool.slug === selected}
                      onClick={() => setSelected(tool.slug)}
                    >
                      <span className="ref">{refOf(tool.slug)}</span>
                      <span className="name">{tool.name}</span>
                      <span className={`state ${STATUS_CLASS[tool.status]}`}>
                        {STATUS_LABEL[tool.status]}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })}
            <div className="idx__foot">
              <span>{products.length} refs</span>
              <span>{refOf(sel.slug)} selected</span>
            </div>
          </div>

          <div className="idx__pane">
            <div className="idx__pane-top">
              <span>
                {refOf(sel.slug)} &nbsp;/&nbsp; {selVerb?.label} &nbsp;/&nbsp;{" "}
                {STATUS_LABEL[sel.status]}
              </span>
              <span className={STATUS_CLASS[sel.status]}>
                {STATUS_LABEL[sel.status]}
              </span>
            </div>

            <div className="idx__pane-body">
              <div className="idx__pane-title">
                <h3>{sel.name}</h3>
                <span className="ref">{refOf(sel.slug)}</span>
              </div>
              <p className="idx__pane-blurb">
                {lang === "ko" && koOneLiners?.[sel.slug]
                  ? koOneLiners[sel.slug]
                  : sel.oneLiner}
              </p>
            </div>

            {sel.image ? (
              <div className="idx__pane-shot">
                <img
                  key={sel.slug}
                  src={asset(sel.image)}
                  alt={`${sel.name} screenshot`}
                  loading="lazy"
                />
              </div>
            ) : null}

            <div className="idx__pane-specs">
              {sel.specs.map(([k, v]) => (
                <div className="kv kv--edge" key={k}>
                  <span className="k">{k}</span>
                  <span className="sp" />
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>

            <div className="idx__pane-ctas">
              {hasDownload ? (
                <a className="btn btn--sm" href={sel.download.win || sel.download.mac}>
                  Download
                </a>
              ) : (
                <span className="btn btn--sm" aria-disabled="true">
                  {t("In development", "개발 중")}
                </span>
              )}
              <Link className="btn btn--ghost btn--sm" href={`/products/${sel.slug}`}>
                {t("Specification", "사양 보기")}
              </Link>
              <a
                className="end-note"
                href={sel.repo}
                target="_blank"
                rel="noopener"
                style={{ color: "var(--text-dim)" }}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

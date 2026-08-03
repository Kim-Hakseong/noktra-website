// /products/[slug] — Product Detail 시안 정본 템플릿 ×9 (정적 생성).
// 제품 정보는 content/products.json 단일 진실 — 버전·용량 등 미보유 데이터는 렌더하지 않는다.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ScreenshotFrame from "@/components/ScreenshotFrame";
import {
  PRODUCTS,
  STATUS_CLASS,
  STATUS_LABEL,
  productBySlug,
  refOf,
  verbLabel,
} from "@/lib/products";
import { detailOf } from "@/lib/details";
import { koOf } from "@/lib/ko";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Tx } from "@/lib/i18n";
import { productFaqs, productPageGraph } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = productBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.oneLiner,
    alternates: { canonical: `/products/${p.slug}/` },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug);
  if (!p) return null;

  const ref = refOf(p.slug);
  const verb = verbLabel(p.verb);
  const hasDownload = Boolean(p.download.win || p.download.mac);
  const i = PRODUCTS.findIndex((x) => x.slug === p.slug);
  const adjacent = [1, 2, 3].map((d) => PRODUCTS[(i + d) % PRODUCTS.length]);
  const detail = detailOf(p.slug);
  const ko = koOf(p.slug);

  const faqs = productFaqs(p);

  return (
    <>
      <JsonLd data={productPageGraph(p)} />
      {/* Masthead */}
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>
              <Link href="/products">Index</Link> &nbsp;/&nbsp; {verb}{" "}
              &nbsp;/&nbsp; {ref}
            </span>
            <span className={STATUS_CLASS[p.status]}>
              {STATUS_LABEL[p.status]}
            </span>
          </div>

          <div className="masthead__grid">
            <div style={{ minWidth: 0 }}>
              <h1 className="masthead__title">{p.name}</h1>
              <p className="masthead__lead">
                <Tx en={p.oneLiner} ko={ko?.oneLiner ?? p.oneLiner} />
              </p>
            </div>
            <div className="masthead__side">
              <div className="kv-grid">
                <div className="kv kv--edge">
                  <span className="k">REF</span>
                  <span className="sp" />
                  <span className="v">{ref}</span>
                </div>
                <div className="kv kv--edge">
                  <span className="k">VERB</span>
                  <span className="sp" />
                  <span className="v">{verb.toUpperCase()}</span>
                </div>
                <div className="kv">
                  <span className="k">STATE</span>
                  <span className="sp" />
                  <span className={`v ${STATUS_CLASS[p.status]}`}>
                    {STATUS_LABEL[p.status].toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="masthead__ctas">
            {hasDownload ? (
              <a className="btn" href={p.download.win || p.download.mac}>
                Download · win64
              </a>
            ) : (
              <span className="btn" aria-disabled="true">
                <Tx en="In development" ko="개발 중" />
              </span>
            )}
            <a className="btn btn--ghost" href="#specification">
              <Tx en="Specification" ko="사양" />
            </a>
            <a className="btn btn--ghost" href={p.repo} target="_blank" rel="noopener">
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Needs — 문제 → 해결 카드 (RTNgine 소개부 형태 참고, 카피는 README 발췌) */}
      {detail?.needs?.length ? (
        <section className="band band--catalog">
          <div className="wrap band__in">
            <Reveal className="sec-head">
              <div>
                <div className="t-label">Needs</div>
                <h2>
                  <Tx en="What brings you here." ko="찾아오게 되는 이유." />
                </h2>
              </div>
              <p className="side">
                <Tx
                  en="The situations this instrument was built for — and what it does about each one."
                  ko="이 도구가 만들어진 상황들 — 그리고 각각에 대해 이 도구가 하는 일."
                />
              </p>
            </Reveal>
            <div className="cells" style={{ marginTop: 0 }}>
              {detail.needs.map((n, ni) => (
                <Reveal className="cell need" key={n.need} delay={ni}>
                  <div className="cell__no cell__no--faint">
                    Need {String(ni + 1).padStart(2, "0")}
                  </div>
                  <p className="need__q">
                    <Tx en={n.need} ko={ko?.needs?.[ni]?.need ?? n.need} />
                  </p>
                  <div className="need__rule" />
                  <div className="need__a-label">Answer</div>
                  <p className="need__a">
                    <Tx
                      en={n.answer}
                      ko={ko?.needs?.[ni]?.answer ?? n.answer}
                    />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Instrument panel — 스크린샷 프레임 */}
      <section className="band band--catalog">
        <div className="wrap" style={{ paddingTop: 78, paddingBottom: 88 }}>
          <Reveal>
            <ScreenshotFrame
              name={p.name}
              image={p.image}
              barLeft={`${p.name} — instrument view`}
              footLeft={`REF ${ref}`}
              footRight={`${verb.toUpperCase()} · ${STATUS_LABEL[p.status].toUpperCase()}`}
            />
          </Reveal>
        </div>
      </section>

      {/* Feature trio — products.json features */}
      <section className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="t-label">
            <Tx en="What it does" ko="하는 일" />
          </Reveal>
          <div className="cells">
            {p.features.map((f, fi) => (
              <Reveal className="cell" key={f} delay={fi}>
                <div className="cell__no">{String(fi + 1).padStart(2, "0")}</div>
                <p style={{ marginTop: 20, fontSize: 17, color: "var(--text)" }}>
                  <Tx en={f} ko={ko?.features?.[fi] ?? f} />
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* In practice — README 발췌 워크스루 (텍스트·스크린샷 교차 배치) */}
      {detail ? (
        <section className="band band--catalog">
          <div className="wrap band__in">
            <Reveal className="sec-head">
              <div>
                <div className="t-label">In practice</div>
                <h2>
                  <Tx en="What you'll see." ko="실제로 보게 될 것." />
                </h2>
              </div>
              <p className="side" style={{ maxWidth: 460 }}>
                <Tx en={detail.intro} ko={ko?.intro ?? detail.intro} />
              </p>
            </Reveal>
            {detail.gallery.map((g, gi) => (
              <Reveal
                className={`walk${gi % 2 ? " walk--flip" : ""}`}
                key={g.image}
              >
                <div className="walk__text">
                  <div className="t-label" style={{ color: "var(--accent)" }}>
                    {String(gi + 1).padStart(2, "0")}
                  </div>
                  <h3>
                    <Tx
                      en={g.title}
                      ko={ko?.gallery?.[gi]?.title ?? g.title}
                    />
                  </h3>
                  <p>
                    <Tx en={g.body} ko={ko?.gallery?.[gi]?.body ?? g.body} />
                  </p>
                </div>
                <figure className="walk__shot">
                  <img
                    src={asset(g.image)}
                    alt={g.title}
                    loading="lazy"
                  />
                  <figcaption>
                    {refOf(p.slug)} · {String(gi + 1).padStart(2, "0")} /{" "}
                    {String(detail.gallery.length).padStart(2, "0")}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Specification — datasheet */}
      <section id="specification" className="band band--catalog">
        <div className="wrap band__in">
          <Reveal className="sec-head">
            <div>
              <div className="t-label">Specification</div>
              <h2>{ref} datasheet</h2>
            </div>
            <span className="t-label t-label--faint">{SITE.name} index</span>
          </Reveal>
          <div className="spec-grid">
            <Reveal className="spec-group">
              <div className="spec-group__title">Build</div>
              {p.specs.map(([k, v]) => (
                <div className="kv kv--edge" key={k}>
                  <span className="k">{k}</span>
                  <span className="sp" />
                  <span className="v">{v}</span>
                </div>
              ))}
            </Reveal>
            <Reveal className="spec-group" delay={1}>
              <div className="spec-group__title">Reference</div>
              <div className="kv kv--edge">
                <span className="k">REF</span>
                <span className="sp" />
                <span className="v">{ref}</span>
              </div>
              <div className="kv kv--edge">
                <span className="k">VERB</span>
                <span className="sp" />
                <span className="v">{verb.toUpperCase()}</span>
              </div>
              <div className="kv kv--edge">
                <span className="k">STATE</span>
                <span className="sp" />
                <span className={`v ${STATUS_CLASS[p.status]}`}>
                  {STATUS_LABEL[p.status].toUpperCase()}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Download band */}
      <section id="downloads" className="band band--philosophy">
        <div className="wrap band__in strip">
          <Reveal style={{ minWidth: 0 }}>
            <div className="strip__tick" />
            <h2 className="strip--md">
              <Tx
                en={<>One file.<br />Copy it and run.</>}
                ko={<>파일 하나.<br />복사해서 실행하세요.</>}
              />
            </h2>
            <p
              className="idx__pane-blurb"
              style={{ marginTop: 26, maxWidth: 560 }}
            >
              <Tx
                en="No installer, no package manager, no service account. Move the executable onto the air-gapped machine and open your work."
                ko="설치 프로그램도, 패키지 매니저도, 서비스 계정도 없습니다. 실행 파일을 폐쇄망 머신으로 옮기고 작업을 여세요."
              />
            </p>
          </Reveal>
          <Reveal className="strip__side" delay={1}>
            <div className="kv kv--edge">
              <span className="k">STATE</span>
              <span className="sp" />
              <span className={`v ${STATUS_CLASS[p.status]}`}>
                {STATUS_LABEL[p.status].toUpperCase()}
              </span>
            </div>
            <div className="kv">
              <span className="k">SOURCE</span>
              <span className="sp" />
              <span className="v">
                <a href={p.repo} target="_blank" rel="noopener">
                  GitHub ↗
                </a>
              </span>
            </div>
            <div style={{ marginTop: 20 }}>
              {hasDownload ? (
                <a className="btn" href={p.download.win || p.download.mac}>
                  Download · win64
                </a>
              ) : (
                <span className="btn" aria-disabled="true">
                  <Tx en="In development" ko="개발 중" />
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — 가시 콘텐츠 + FAQPage JSON-LD 동기 (AEO) */}
      <section className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="refusals">
            <div>
              <div className="t-label">FAQ</div>
              <h2>
                <Tx en="Quick answers" ko="빠른 답" />
              </h2>
            </div>
            <div>
              {faqs.map((f) => (
                <div className="faq" key={f.q}>
                  <h3 className="faq__q">
                    <Tx en={f.q} ko={f.qKo} />
                  </h3>
                  <p className="faq__a">
                    <Tx en={f.a} ko={f.aKo} />
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Adjacent tools */}
      <section className="band band--catalog">
        <div className="wrap" style={{ paddingTop: 66, paddingBottom: 72 }}>
          <div className="adjacent__head">
            <span className="t-label">
              <Tx en="Next in the index" ko="인덱스의 다음 항목" />
            </span>
            <span className="rule" />
          </div>
          <div className="adjacent">
            {adjacent.map((a) => (
              <Link
                key={a.slug}
                className="adjacent__item"
                href={`/products/${a.slug}`}
              >
                <div className="adjacent__meta">
                  <span>
                    {refOf(a.slug)} · {verbLabel(a.verb)}
                  </span>
                  <span className={STATUS_CLASS[a.status]}>
                    {STATUS_LABEL[a.status]}
                  </span>
                </div>
                <div className="adjacent__name">{a.name}</div>
                <div className="adjacent__line">
                  <Tx
                    en={a.oneLiner}
                    ko={koOf(a.slug)?.oneLiner ?? a.oneLiner}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

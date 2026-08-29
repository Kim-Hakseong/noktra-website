// /notes/[slug] — Field Note 본문. (en)/(ko) 공유.
import LLink from "@/components/LLink";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { Tx, type Lang } from "@/lib/i18n";
import { noteBySlug } from "@/content/notes";
import { productBySlug, refOf, verbLabel, STATUS_CLASS, STATUS_LABEL, REPOS_PUBLIC } from "@/lib/products";
import { koOf } from "@/lib/ko";
import { noteGraph } from "@/lib/seo";

export default function NoteDetailPage({
  slug,
  lang = "en",
}: {
  slug: string;
  lang?: Lang;
}) {
  const n = noteBySlug(slug);
  if (!n) return null;
  const rel = productBySlug(n.relatedSlug);
  const paras = lang === "ko" ? n.bodyKo : n.body;

  return (
    <>
      <JsonLd data={noteGraph(n, lang)} />
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>
              <LLink href="/notes">
                <Tx en="Notes" ko="노트" />
              </LLink>{" "}
              &nbsp;/&nbsp; {n.slug}
            </span>
            <span>{n.published}</span>
          </div>
          <div className="statement" style={{ paddingBottom: 72 }}>
            <div className="strip__tick" />
            <h1 style={{ fontSize: "clamp(44px, 5.6vw, 76px)" }}>
              <Tx en={n.title} ko={n.titleKo} />
            </h1>
            <p className="statement__lead" style={{ fontSize: "clamp(19px, 1.8vw, 24px)" }}>
              <Tx en={n.description} ko={n.descriptionKo} />
            </p>
          </div>
        </div>
      </section>

      <section className="band band--catalog">
        <div className="wrap band__in note-body">
          <Reveal className="note-prose">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {REPOS_PUBLIC && (
              <div className="note-cite">
                <span className="t-label t-label--faint">
                  <Tx en="The code that makes this argument" ko="이 논지를 증명하는 코드" />
                </span>
                <a href={n.source} target="_blank" rel="noopener">
                  {n.source.replace("https://github.com/", "github.com/")}
                </a>
              </div>
            )}
          </Reveal>

          {rel ? (
            <Reveal className="note-rel" delay={1}>
              <div className="t-label">
                <Tx en="Related instrument" ko="관련 도구" />
              </div>
              <LLink className="adjacent__item" href={`/products/${rel.slug}`} style={{ borderRight: "none", paddingRight: 0 }}>
                <div className="adjacent__meta">
                  <span>
                    {refOf(rel.slug)} · {verbLabel(rel.verb)}
                  </span>
                  <span className={STATUS_CLASS[rel.status]}>
                    {STATUS_LABEL[rel.status]}
                  </span>
                </div>
                <div className="adjacent__name">{rel.name}</div>
                <div className="adjacent__line">
                  <Tx en={rel.oneLiner} ko={koOf(rel.slug)?.oneLiner ?? rel.oneLiner} />
                </div>
              </LLink>
            </Reveal>
          ) : null}
        </div>
      </section>
    </>
  );
}

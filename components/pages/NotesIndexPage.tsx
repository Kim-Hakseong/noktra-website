// /notes 인덱스 — Field Notes 목록. (en)/(ko) 공유.
import LLink from "@/components/LLink";
import Reveal from "@/components/Reveal";
import { Tx } from "@/lib/i18n";
import { NOTES } from "@/content/notes";
import { productBySlug } from "@/lib/products";

export default function NotesIndexPage() {
  return (
    <>
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>
              <Tx en="Field notes" ko="필드 노트" />
            </span>
            <span>
              <Tx
                en="Design decisions, argued in public"
                ko="설계 결정, 공개적으로 논증하다"
              />
            </span>
          </div>
          <div className="masthead__grid" style={{ paddingBottom: 64 }}>
            <div style={{ minWidth: 0 }}>
              <h1 className="masthead__title">
                <Tx en="Notes" ko="노트" />
              </h1>
              <p className="masthead__lead">
                <Tx
                  en="Short essays on the design decisions inside these instruments — each one grounded in a public repository you can read."
                  ko="이 도구들 안의 설계 결정에 대한 짧은 에세이 — 전부 직접 읽을 수 있는 공개 저장소에 근거합니다."
                />
              </p>
            </div>
            <div className="masthead__side">
              <p>
                <Tx
                  en="Nothing here asks to be believed. Every note names the repository whose code makes the argument."
                  ko="믿어달라는 글은 없습니다. 모든 노트는 그 논지를 코드로 증명하는 저장소를 명시합니다."
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--catalog">
        <div className="wrap" style={{ paddingTop: 44, paddingBottom: 92 }}>
          {NOTES.map((n, i) => {
            const rel = productBySlug(n.relatedSlug);
            return (
              <Reveal className="note-row" key={n.slug} delay={i}>
                <div className="note-row__meta">
                  <span className="t-label t-label--faint">{n.published}</span>
                  {rel ? (
                    <span className="t-label" style={{ marginTop: 6 }}>
                      {rel.name}
                    </span>
                  ) : null}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2 className="note-row__title">
                    <LLink href={`/notes/${n.slug}`}>
                      <Tx en={n.title} ko={n.titleKo} />
                    </LLink>
                  </h2>
                  <p className="note-row__desc">
                    <Tx en={n.description} ko={n.descriptionKo} />
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

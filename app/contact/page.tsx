// /contact — 폼 없음 (정적): mailto + GitHub 링크
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Tx } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a build, report an issue, or ask about licensing.",
};

export default function ContactPage() {
  return (
    <section className="band band--hero">
      <div className="wrap">
        <div className="statusbar">
          <span>
            <Tx en="Contact" ko="문의" />
          </span>
          <span>No forms · No trackers</span>
        </div>
        <div className="statement" style={{ paddingBottom: 104 }}>
          <div className="strip__tick" />
          <h1 style={{ fontSize: "clamp(56px, 6.6vw, 96px)" }}>
            <Tx
              en={<>Write when<br />you&apos;re ready.</>}
              ko={<>준비되면<br />쓰세요.</>}
            />
          </h1>
          <p className="statement__lead">
            <Tx
              en="There is no form here, because a form is a queue you cannot see. Mail goes to a person; issues go to the repository."
              ko="여기에 폼은 없습니다 — 폼은 당신이 볼 수 없는 대기열이기 때문입니다. 메일은 사람에게 가고, 이슈는 저장소로 갑니다."
            />
          </p>

          <div className="contact-list">
            <div className="kv kv--edge">
              <span className="k">EMAIL</span>
              <span className="sp" />
              <span className="v">
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </span>
            </div>
            <div className="kv kv--edge">
              <span className="k">GITHUB</span>
              <span className="sp" />
              <span className="v">
                <a href={SITE.github} target="_blank" rel="noopener">
                  github.com/Kim-Hakseong
                </a>
              </span>
            </div>
            <div className="kv">
              <span className="k">ISSUES</span>
              <span className="sp" />
              <span className="v">
                <Tx
                  en="Per-product repository trackers"
                  ko="제품별 저장소 이슈 트래커"
                />
              </span>
            </div>
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a className="btn" href={`mailto:${SITE.email}`}>
              <Tx en="Request a build" ko="빌드 요청하기" />
            </a>
            <a
              className="btn btn--ghost"
              href={SITE.github}
              target="_blank"
              rel="noopener"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

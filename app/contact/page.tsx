// /contact — 폼 없음 (정적): mailto + GitHub 링크
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a build, report an issue, or ask about licensing.",
};

export default function ContactPage() {
  return (
    <section className="band band--hero">
      <div className="wrap">
        <div className="statusbar">
          <span>Contact</span>
          <span>No forms · No trackers</span>
        </div>
        <div className="statement" style={{ paddingBottom: 104 }}>
          <div className="strip__tick" />
          <h1 style={{ fontSize: "clamp(56px, 6.6vw, 96px)" }}>
            Write when
            <br />
            you&apos;re ready.
          </h1>
          <p className="statement__lead">
            There is no form here, because a form is a queue you cannot see.
            Mail goes to a person; issues go to the repository.
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
              <span className="v">Per-product repository trackers</span>
            </div>
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a className="btn" href={`mailto:${SITE.email}`}>
              Request a build
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

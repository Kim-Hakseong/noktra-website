"use client";

// v3 — 풀스크린 스크롤 씬 홈 (aaronjcunningham / irisventure / edolus 문법).
// 각 씬은 sticky 풀뷰포트 스테이지 + 키가 큰 래퍼: 스크롤이 씬 내부 진행(--p)을 스크럽한다.
// 씬 구성: //00 LAUNCH(워드마크 플라이스루) → //01 MISSION(문장 스크럽)
//        → //02 THE NINE(스크롤이 9개 제품을 순서대로 스캔) → //03 PROOF(대형 선언)
import { useEffect, useRef, useState } from "react";
import LLink from "@/components/LLink";
import HudFrame from "@/components/HudFrame";
import { useLang } from "@/lib/i18n";
import {
  PRODUCTS,
  STATUS_CLASS,
  STATUS_LABEL,
  refOf,
  verbLabel,
} from "@/lib/products";
import { KO_ONELINERS } from "@/lib/ko";
import { SITE } from "@/lib/site";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export default function SceneHome() {
  const { lang } = useLang();
  const t = (en: string, ko: string) => (lang === "ko" ? ko : en);

  const launchRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const nineRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const reduce = document.documentElement.dataset.motion === "static";
    const wraps = [launchRef, missionRef, nineRef, proofRef];
    let raf = 0;

    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const w of wraps) {
        const el = w.current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - vh;
        const p = total > 0 ? clamp01(-rect.top / total) : 0;
        el.style.setProperty("--p", reduce ? "1" : String(p));
      }
      // THE NINE: 진행률 → 활성 제품 인덱스
      const nine = nineRef.current;
      if (nine) {
        const rect = nine.getBoundingClientRect();
        const total = nine.offsetHeight - vh;
        const p = total > 0 ? clamp01(-rect.top / total) : 0;
        const idx = Math.min(
          PRODUCTS.length - 1,
          Math.floor(p * PRODUCTS.length)
        );
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const sel = PRODUCTS[active];
  const oneLiner =
    lang === "ko" ? KO_ONELINERS[sel.slug] ?? sel.oneLiner : sel.oneLiner;

  return (
    <div className="scenes">
      {/* ---- //00 LAUNCH — 워드마크 플라이스루 ---- */}
      <div className="scene scene--launch" ref={launchRef}>
        <div className="scene__stage">
          <div className="launch__center">
            <div className="launch__eyebrow">
              {t(
                "DEFENSE · AEROSPACE · INDUSTRIAL · SEMICONDUCTOR",
                "국방 · 항공우주 · 산업 · 반도체"
              )}
            </div>
            <h1 className="launch__wordmark">{SITE.name}</h1>
            <p className="launch__tagline">
              {t(SITE.positioning, "폐쇄망 환경을 위한 검증 도구.")}
            </p>
          </div>
          <div className="launch__hint">
            <span className="launch__hint-line" />
            {t("SCROLL TO DESCEND", "스크롤로 하강")}
          </div>
        </div>
      </div>

      {/* ---- //01 MISSION — 문장 스크럽 ---- */}
      <div className="scene scene--mission" ref={missionRef}>
        <div className="scene__stage">
          <div className="scene__no">
            //01 <b>{t("MISSION", "미션")}</b>
          </div>
          <div className="mission__lines">
            <p className="mission__line" style={{ "--i": 0 } as React.CSSProperties}>
              {t("Nine desktop instruments.", "아홉 개의 데스크톱 도구.")}
            </p>
            <p className="mission__line" style={{ "--i": 1 } as React.CSSProperties}>
              {t(
                "Built for rooms where the network is deliberately absent.",
                "네트워크가 의도적으로 존재하지 않는 방을 위해."
              )}
            </p>
            <p className="mission__line mission__line--energy" style={{ "--i": 2 } as React.CSSProperties}>
              {t(
                "They run where the internet doesn't reach.",
                "인터넷이 닿지 않는 곳에서 동작합니다."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ---- //02 THE NINE — 스크롤 스캔 ---- */}
      <div className="scene scene--nine" ref={nineRef}>
        <div className="scene__stage nine__stage">
          <div className="scene__no">
            //02 <b>{t("THE NINE", "아홉 개의 도구")}</b>
          </div>

          <div className="nine__grid">
            <div className="nine__list">
              {PRODUCTS.map((p, i) => (
                <div
                  key={p.slug}
                  className={`nine__row${i === active ? " nine__row--on" : ""}`}
                >
                  <span className="nine__row-ref">{refOf(p.slug)}</span>
                  <span className="nine__row-name">{p.name}</span>
                  <span className={`nine__row-state ${STATUS_CLASS[p.status]}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
              ))}
              <div className="nine__counter">
                <span className="nine__counter-n">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="nine__counter-d">
                  / {String(PRODUCTS.length).padStart(2, "0")}
                </span>
                <span className="nine__counter-hint">
                  {t("SCROLL TO SCAN", "스크롤로 스캔")}
                </span>
              </div>
            </div>

            <div className="nine__hud">
              <HudFrame
                lockKey={sel.slug}
                name={sel.name}
                refCode={refOf(sel.slug)}
                verb={verbLabel(sel.verb)}
                state={STATUS_LABEL[sel.status]}
                stateClass={STATUS_CLASS[sel.status]}
                image={sel.image}
              />
              <p className="nine__oneliner" key={`o-${sel.slug}`}>
                {oneLiner}
              </p>
              <LLink
                className="nine__spec"
                href={`/products/${sel.slug}`}
              >
                {t("OPEN SPECIFICATION", "사양 열기")} ↗
              </LLink>
            </div>
          </div>
        </div>
      </div>

      {/* ---- //03 PROOF — 대형 선언 ---- */}
      <div className="scene scene--proof" ref={proofRef}>
        <div className="scene__stage">
          <div className="scene__no">
            //03 <b>{t("PROOF", "증명")}</b>
          </div>
          <div className="proof__center">
            <div className="proof__tick" />
            <h2 className="proof__title">
              Proof,
              <br />
              not consensus.
            </h2>
            <div className="proof__pillars">
              <span>OFFLINE-FIRST</span>
              <span>DETERMINISTIC</span>
              <span>SINGLE-FILE</span>
            </div>
            <div className="proof__ctas">
              <LLink className="btn" href="/products">
                {t("Browse the nine tools", "9개 도구 살펴보기")}
              </LLink>
              <LLink className="btn btn--ghost" href="/method">
                {t("Read the method", "방법론 읽기")}
              </LLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

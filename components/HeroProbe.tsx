"use client";

// 홈 히어로 — Home v2 시안 정본.
// 배경의 ICD 테이블이 커서 반경(프로브)으로만 드러나는 마스크 연출.
import { useRef, useState } from "react";
import LLink from "@/components/LLink";
import { SITE } from "@/lib/site";
import { PRODUCTS, VERBS } from "@/lib/products";
import { useLang } from "@/lib/i18n";

// 시안 원문 배경 테이블 (장식용 계기 데이터)
const PROBE_ROWS = [
  "0x1A2C  ALT_BARO        UINT16  m       [0, 65535]      SCALE 1.0     OK",
  "0x1A2E  ALT_RADAR       UINT16  m       [0, 4095]       SCALE 0.5     OK",
  "0x1A30  IAS             INT16   kt      [-512, 511]     SCALE 0.25    OK",
  "0x1A34  ATT_PITCH       INT16   deg     [-180, 180]     SCALE 0.01    OK",
  "0x1A36  ATT_ROLL        INT16   deg     [-180, 180]     SCALE 0.01    OK",
  "0x1A38  ATT_YAW         INT16   deg     [-180, 180]     SCALE 0.01    OK",
  "0x1A40  ENG1_N1         UINT16  %       [0, 120]        SCALE 0.05    OK",
  "0x1A42  ENG1_EGT        UINT16  degC    [0, 1200]       SCALE 0.1     OK",
  "0x1A46  FUEL_QTY_L      UINT16  kg      [0, 8000]       SCALE 1.0     OK",
  "0x1A48  FUEL_QTY_R      UINT16  kg      [0, 8000]       SCALE 1.0     OK",
  "0x1A50  BUS_28V         UINT8   V       [0, 40]         SCALE 0.2     OK",
  "0x1A52  MODE_WORD       BITF    —       8 FLAGS         GOLDEN VEC    OK",
  "0x1A54  CRC16           UINT16  —       CCITT-FALSE     VERIFIED      OK",
  "0x1A58  FRAME_COUNT     UINT32  —       [0, 2^32-1]     MONOTONIC     OK",
  "0x1A5C  TIME_IRIG       UINT48  us      IRIG-106 CH10   LOCKED        OK",
  "0x1A62  SECS_MSG        S6F11   —       EVENT REPORT    DECODED       OK",
  "0x1A66  MTBF_EST        FLOAT32 h       PARTS COUNT     AUDIT TRAIL   OK",
];

export default function HeroProbe() {
  const ref = useRef<HTMLElement>(null);
  const [readout, setReadout] = useState("STANDBY");
  const { lang } = useLang();
  const t = (en: string, ko: string) => (lang === "ko" ? ko : en);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x.toFixed(1)}px`);
    el.style.setProperty("--my", `${y.toFixed(1)}px`);
    const v = `${((x / Math.max(r.width, 1)) * 4.8 + 0.6).toFixed(3)} V`;
    if (v !== readout) setReadout(v);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    setReadout("STANDBY");
  };

  return (
    <section
      ref={ref}
      className="band band--hero hero"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="hero__probe" aria-hidden="true">
        {PROBE_ROWS.map((row) => (
          <div key={row}>{row}</div>
        ))}
      </div>

      <div className="wrap hero__in">
        <div className="statusbar">
          <span>AIR-GAPPED · LOCAL AI ONLY · NO TELEMETRY</span>
          <span className="statusbar__right">
            <span>{PRODUCTS.length} TOOLS</span>
            <span>{VERBS.length} VERBS</span>
            <span style={{ color: "var(--text-mid)" }}>SYSTEM READY</span>
          </span>
        </div>

        {/* CSS 키프레임 인트로 — 하이드레이션 전에 시작해 LCP를 막지 않는다 */}
        <div className="hero__grid hero__intro">
          <div style={{ minWidth: 0 }}>
            <div className="hero__eyebrow">
              {t(
                "Defense · Aerospace · Industrial · Semiconductor",
                "국방 · 항공우주 · 산업 · 반도체"
              )}
            </div>
            <h1 className="hero__wordmark">{SITE.name}</h1>
            <p className="hero__lead">
              {t(SITE.positioning, "폐쇄망 환경을 위한 검증 도구.")}
            </p>
            <p className="hero__desc">
              {t(
                "NOKTRA builds desktop instruments for defense, aerospace, industrial and semiconductor test engineering — interface definition, MIL/SIL execution, test sequencing, telemetry, protocol work and reliability analysis. They run where the internet doesn't reach.",
                "NOKTRA는 국방·항공우주·산업·반도체 시험 현장을 위한 데스크톱 도구를 만듭니다 — 인터페이스 정의, MIL/SIL 실행, 시험 시퀀싱, 텔레메트리, 프로토콜 작업, 신뢰성 분석까지. 인터넷 닿지 않는 환경에서 동작합니다."
              )}
            </p>
          </div>
          <div className="hero__side">
            <div className="hero__verbs">
              {[
                {
                  v: "Define",
                  en: "Interface definitions, refined",
                  ko: "인터페이스 정의를 정제",
                },
                {
                  v: "Run",
                  en: "Simulation and test sequencing",
                  ko: "시뮬레이션과 시험 시퀀싱",
                },
                {
                  v: "Observe",
                  en: "Telemetry and flight recordings",
                  ko: "텔레메트리와 비행 기록",
                },
                {
                  v: "Connect",
                  en: "Industrial and fab protocols",
                  ko: "산업·팹 프로토콜",
                },
                {
                  v: "Assure",
                  en: "Reliability and test generation",
                  ko: "신뢰성과 시험 생성",
                },
              ].map((r) => (
                <div className="hero__verb" key={r.v}>
                  <span className="verb">{r.v}</span>
                  <span className="role">{t(r.en, r.ko)}</span>
                </div>
              ))}
            </div>
            <div className="hero__side-note">
              nox — night · offline · deterministic
            </div>
          </div>
        </div>

        <div className="hero__rule">
          <span>
            {t(
              "Move the cursor to probe the interface beneath this page",
              "커서를 움직이면 페이지 아래의 인터페이스가 드러납니다"
            )}
          </span>
          <span className="probe-tag">
            PROBE · <span className="probe-readout">{readout}</span>
          </span>
        </div>

        <div className="hero__ctas">
          <LLink className="btn" href="/products">
            {t("Browse the nine tools", "9개 도구 살펴보기")}
          </LLink>
          <LLink className="btn btn--ghost" href="/method">
            {t("Proof, not consensus", "합의가 아니라 증명")}
          </LLink>
          <span className="end-note">WIN64 · SINGLE-FILE · NO RUNTIME INSTALL</span>
        </div>
      </div>
    </section>
  );
}

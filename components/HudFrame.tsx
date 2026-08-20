"use client";

// v2 — probe-HUD 프레임: 제품 스크린샷을 "스캔 중인 대상"으로 감싸는 크롬.
// 포스터 레퍼런스 문법: 스캔 링(틱) + 코너 브래킷 + 오렌지 이름 태그 + 모노 판독값.
// v2.2: 링 회전은 시간이 아니라 스크롤 휠이 구동한다 — 휠을 돌리면 계기가 돈다.
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

function useScrollRotation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset.motion === "static") return;
    let raf = 0;
    const apply = () => {
      el.style.transform = `rotate(${window.scrollY * 0.06}deg)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return ref;
}

interface Props {
  name: string;
  refCode: string; // NK-01
  verb: string;
  state: string;
  stateClass: string; // st-ok | st-amber | st-mute
  image?: string;
  /** 선택 전환 시 재조준 애니메이션 트리거 (key 재마운트용) */
  lockKey?: string;
}

export default function HudFrame({
  name,
  refCode,
  verb,
  state,
  stateClass,
  image,
  lockKey,
}: Props) {
  const ringRef = useScrollRotation();

  return (
    <figure className="hud" key={lockKey}>
      {/* 스캔 링 — 스크롤 구동 회전 */}
      <div className="hud__ringwrap" ref={ringRef}>
      <svg className="hud__ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="49.2" fill="none" strokeWidth="0.18" className="hud__ring-line" />
        <g className="hud__ring-ticks">
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i / 72) * Math.PI * 2;
            const long = i % 6 === 0;
            const r1 = long ? 46.4 : 47.8;
            const x1 = 50 + Math.cos(a) * r1;
            const y1 = 50 + Math.sin(a) * r1;
            const x2 = 50 + Math.cos(a) * 49;
            const y2 = 50 + Math.sin(a) * 49;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={long ? 0.32 : 0.16}
              />
            );
          })}
        </g>
        {/* 스캔 활성 아크 — 에너지 */}
        <circle
          cx="50"
          cy="50"
          r="49.2"
          fill="none"
          strokeWidth="0.5"
          className="hud__ring-arc"
          strokeDasharray="46 263"
        />
      </svg>
      </div>

      {/* 스크린샷 + 코너 브래킷 */}
      <div className="hud__target">
        <span className="hud__bracket hud__bracket--tl" aria-hidden="true" />
        <span className="hud__bracket hud__bracket--tr" aria-hidden="true" />
        <span className="hud__bracket hud__bracket--bl" aria-hidden="true" />
        <span className="hud__bracket hud__bracket--br" aria-hidden="true" />
        {image ? (
          <img src={asset(image)} alt={`${name} screenshot`} />
        ) : (
          <span className="hud__ph">NO SIGNAL</span>
        )}
        {/* 크로스헤어 */}
        <span className="hud__cross" aria-hidden="true" />
      </div>

      {/* 오렌지 이름 태그 */}
      <figcaption className="hud__tag">
        <span className="hud__tag-ref">{refCode}</span>
        <span className="hud__tag-name">{name}</span>
      </figcaption>

      {/* 모노 판독값 */}
      <div className="hud__readout hud__readout--tr">
        <span>{verb.toUpperCase()}</span>
        <span className={stateClass}>{state.toUpperCase()}</span>
      </div>
      <div className="hud__readout hud__readout--bl">
        <span>SCAN</span>
        <span className="hud__lock">LOCKED</span>
      </div>
    </figure>
  );
}

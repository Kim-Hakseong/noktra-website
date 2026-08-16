"use client";

// v2.2 — 우측 고정 하강 게이지: 스크롤 진행률을 계기 판독값으로.
// 모노 % 리드아웃 + 채워지는 레일 + 오렌지 캐럿.
import { useEffect, useRef, useState } from "react";

export default function ScrollRail() {
  const [pct, setPct] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const compute = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      raf.current = 0;
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const shown = String(Math.round(pct * 100)).padStart(3, "0");

  return (
    <div className="srail" aria-hidden="true">
      <span className="srail__label">DESCENT</span>
      <span className="srail__track">
        <span className="srail__fill" style={{ height: `${pct * 100}%` }} />
        <span className="srail__caret" style={{ top: `${pct * 100}%` }} />
      </span>
      <span className="srail__pct">{shown}%</span>
    </div>
  );
}

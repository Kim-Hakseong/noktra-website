"use client";

// v2 — //NN 섹션 인덱스: 뷰포트 진입 시 숫자가 슬롯머신처럼 틱업하며 잠긴다.
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function SecNo({
  n,
  children,
}: {
  n: string; // "01"
  children: ReactNode; // 라벨
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("00");
  const [locked, setLocked] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduce) {
      setDisplay(n);
      setLocked(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        io.disconnect();
        // 스크램블 → 목표값 락
        const t0 = performance.now();
        const DUR = 620;
        const tick = () => {
          const p = (performance.now() - t0) / DUR;
          if (p >= 1) {
            setDisplay(n);
            setLocked(true);
            return;
          }
          setDisplay(
            String(Math.floor(Math.random() * 100)).padStart(2, "0")
          );
          setTimeout(tick, 46);
        };
        tick();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n]);

  return (
    <div ref={ref} className={`sec-no${locked ? " sec-no--locked" : ""}`}>
      //{display} <b>{children}</b>
    </div>
  );
}

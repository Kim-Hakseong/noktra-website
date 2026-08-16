"use client";

// v2.2 — 우주 캔버스: 커서 인터랙션 제거, 스크롤 구동으로 전환.
// 별마다 깊이(depth)를 부여해 스크롤 휠에 따라 서로 다른 속도로 흐른다 = 하강하는 패럴랙스.
// prefers-reduced-motion이면 정적 1회 렌더.
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  depth: number; // 0.1(멀다) ~ 0.6(가깝다) — 스크롤 패럴랙스 계수
  vx: number;
  tint: 0 | 1 | 2; // 0=white 1=mint 2=orange
}

export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let stars: Star[] = [];
    let raf = 0;
    let scrollY = window.scrollY;
    let lastY = scrollY;
    let vel = 0; // 스크롤 속도(평활) — 워프 스트릭 길이
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const colors = () => {
      const cs = getComputedStyle(document.documentElement);
      return [
        cs.getPropertyValue("--star").trim() || "rgba(237,241,242,0.8)",
        cs.getPropertyValue("--star-accent").trim() || "rgba(49,169,188,0.9)",
        cs.getPropertyValue("--star-energy").trim() || "rgba(255,92,31,0.85)",
      ];
    };

    const seed = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 24000));
      stars = Array.from({ length: count }, () => {
        const roll = Math.random();
        const tint: 0 | 1 | 2 = roll < 0.82 ? 0 : roll < 0.95 ? 1 : 2;
        const depth = 0.1 + Math.random() * 0.5;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          // 가까운 별일수록 크고 밝게 — 깊이감
          r: (tint === 2 ? 1.3 : 0.4 + Math.random() * 0.7) * (0.6 + depth),
          depth,
          vx: (Math.random() - 0.5) * 0.05,
          tint,
        };
      });
    };

    const mod = (n: number, m: number) => ((n % m) + m) % m;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const [cw, cm, co] = colors();
      // 속도 평활 — 휠을 굴리면 워프, 멈추면 감쇠
      vel += ((scrollY - lastY) - vel) * 0.18;
      lastY += (scrollY - lastY) * 0.18;
      const warp = Math.min(Math.abs(vel), 44);
      for (const s of stars) {
        let x = s.x;
        if (!reduce) {
          s.x += s.vx;
          x = mod(s.x, w);
        }
        // 스크롤 하강 — 깊이별 속도차 패럴랙스
        const y = mod(s.y - scrollY * (0.3 + s.depth), h);
        ctx.fillStyle = s.tint === 0 ? cw : s.tint === 1 ? cm : co;
        if (warp > 6) {
          // 워프 스트릭 — 흐릿하게, 시선을 뺏지 않는 수준으로
          const len = warp * (0.22 + s.depth * 0.5) * Math.sign(vel);
          ctx.save();
          ctx.globalAlpha = 0.28;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = Math.max(0.5, s.r * 0.7);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + len);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduce) draw();
    };
    const onResize = () => {
      seed();
      if (reduce) draw();
    };

    seed();
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const mo = new MutationObserver(() => reduce && draw());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mo.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}

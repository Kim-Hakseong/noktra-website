"use client";

// DARK / LIGHT 세그먼트 토글 — 시안 헤더 정본.
// <html data-theme> + localStorage('noktra-theme') 유지, FOUC 방지는 layout 인라인 스크립트.
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setTheme(t === "light" ? "light" : "dark");
  }, []);

  const apply = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("noktra-theme", t);
    } catch {}
    setTheme(t);
  };

  return (
    <div className="tg" role="group" aria-label="Color theme">
      <button
        className="tg__seg tg__seg--dark"
        aria-pressed={theme === "dark"}
        onClick={() => apply("dark")}
      >
        DARK
      </button>
      <button
        className="tg__seg tg__seg--light"
        aria-pressed={theme === "light"}
        onClick={() => apply("light")}
      >
        LIGHT
      </button>
    </div>
  );
}

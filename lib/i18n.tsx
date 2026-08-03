"use client";

// 라우트 기반 i18n — 언어는 URL이 결정한다: / = en, /ko/* = ko.
// LangProvider는 각 로케일 루트 레이아웃이 lang을 주입하고,
// Tx/useLang은 컨텍스트만 읽는다 (SSG 시 해당 언어로 프리렌더 → SEO 노출).
import { createContext, useContext, type ReactNode } from "react";

export type Lang = "en" | "ko";

const LangContext = createContext<Lang>("en");

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() {
  return { lang: useContext(LangContext) };
}

/** 인라인 이중언어 텍스트 */
export function Tx({ en, ko }: { en: ReactNode; ko: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "ko" ? ko : en}</>;
}

/** 현재 경로의 반대 로케일 경로 (헤더 토글용) */
export function switchLocalePath(pathname: string, to: Lang): string {
  const bare = pathname.startsWith("/ko")
    ? pathname.slice(3) || "/"
    : pathname;
  return to === "ko" ? `/ko${bare === "/" ? "" : bare}` || "/ko" : bare;
}

"use client";

// nexys-website 골격의 i18n 패턴 이식 — 클라이언트 언어 컨텍스트.
// 기본 en(글로벌), localStorage('noktra-lang') 유지. URL은 단일(정적 export 유지).
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ko";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("noktra-lang");
      if (saved === "ko") setLangState("ko");
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("noktra-lang", l);
    } catch {}
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** 인라인 이중언어 텍스트 */
export function Tx({ en, ko }: { en: ReactNode; ko: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "ko" ? ko : en}</>;
}

// 폰트 스택 — 라틴 3계층 + 한국어 2계층 (전부 OFL 셀프호스트).
// 사용처는 --font-display/--font-ui/--font-data 간접 변수만 참조하고,
// html[lang="ko"]에서 한글 폴백을 뒤에 잇는다 (라틴 글리프는 항상 라틴 폰트가 먼저).
import {
  Newsreader,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Noto_Serif_KR,
  IBM_Plex_Sans_KR,
} from "next/font/google";

export const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif-l",
  display: "swap",
});
export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-l",
  display: "swap",
});
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-l",
  display: "swap",
});

// 한국어 — Newsreader의 세리프 결을 잇는 Noto Serif KR,
// Plex의 공식 한국어판 IBM Plex Sans KR (계기 텍스처 유지)
export const koSerif = Noto_Serif_KR({
  weight: ["400", "600"],
  variable: "--font-serif-k",
  display: "swap",
  preload: false,
});
export const koSans = IBM_Plex_Sans_KR({
  weight: ["400", "500", "600"],
  variable: "--font-sans-k",
  display: "swap",
  preload: false,
});

export const fontClass = `${serif.variable} ${sans.variable} ${mono.variable}`;
export const koFontClass = `${fontClass} ${koSerif.variable} ${koSans.variable}`;

// FOUC 방지: 첫 페인트 전에 data-theme 확정.
export const themeInit = `(function(){try{var t=localStorage.getItem('noktra-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

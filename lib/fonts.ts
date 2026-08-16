// 폰트 스택 — 라틴 3계층 (전부 OFL 셀프호스트).
// 사용처는 --font-display/--font-ui/--font-data 간접 변수만 참조한다.
// 한국어 폴백은 lib/fonts-ko.ts — (ko) 레이아웃만 임포트해 CSS 청크를 분리한다.
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

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

export const fontClass = `${serif.variable} ${sans.variable} ${mono.variable}`;

// FOUC 방지: 첫 페인트 전에 data-theme 확정.
export const themeInit = `(function(){try{var t=localStorage.getItem('noktra-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

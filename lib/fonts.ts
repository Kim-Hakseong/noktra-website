// 시안 지정 폰트 3계층 — next/font로 셀프호스트(woff2), 외부 요청 없음.
// (en)/(ko) 두 루트 레이아웃이 공유.
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

export const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-data",
  display: "swap",
});

export const fontClass = `${serif.variable} ${sans.variable} ${mono.variable}`;

// FOUC 방지: 첫 페인트 전에 data-theme 확정.
export const themeInit = `(function(){try{var t=localStorage.getItem('noktra-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

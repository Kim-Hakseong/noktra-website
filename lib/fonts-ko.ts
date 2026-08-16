// 한국어 폰트 — (ko) 레이아웃 전용 (CSS 청크 분리로 영어 페이지에 미탑재).
// Newsreader의 세리프 결을 잇는 Noto Serif KR, Plex 공식 한국어판 IBM Plex Sans KR.
import { Noto_Serif_KR, IBM_Plex_Sans_KR } from "next/font/google";
import { fontClass } from "./fonts";

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

export const koFontClass = `${fontClass} ${koSerif.variable} ${koSans.variable}`;

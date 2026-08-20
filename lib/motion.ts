"use client";

// 모션 상태 단일 진실 — 인라인 스크립트가 <html data-motion>을 결정한다.
// static: OS 동작줄이기 또는 사용자 off / active: 기본 또는 사용자 on(오버라이드).
export function motionIsStatic(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.motion === "static";
}

export function setMotion(mode: "on" | "off" | "auto") {
  try {
    if (mode === "auto") localStorage.removeItem("noktra-motion");
    else localStorage.setItem("noktra-motion", mode);
  } catch {}
  // 씬·캔버스 초기화 경로가 마운트 시점에 갈리므로 리로드가 가장 견고하다
  window.location.reload();
}

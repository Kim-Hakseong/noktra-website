// lib/ci.ts — content/ci-status.json 소비층 (verify-status 워크플로가 매일 갱신).
// 데이터 없으면 배지 미표시 — 빈 값=숨김 패턴.
import data from "@/content/ci-status.json";

export interface VerifyRun {
  conclusion: "success" | "failure" | string;
  date: string; // YYYY-MM-DD
  url: string;
}

interface CiStatus {
  generated?: string;
  runs?: Record<string, VerifyRun>;
}

const STATUS = data as CiStatus;

export function verifyRunOf(slug: string): VerifyRun | undefined {
  return STATUS.runs?.[slug];
}

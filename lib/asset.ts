// lib/asset.ts — basePath 인지 자산 경로 헬퍼 (nexys-website 골격 이식)
// GitHub Pages는 /<repo> 서브경로로 서빙되므로 public 자산(raw <img>, favicon 등)에
// basePath를 직접 붙여야 한다. (Next의 basePath는 <Link>/_next 자산만 자동 처리)
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith("mailto:")) return path;
  return `${BASE_PATH}${path}`;
}

# NOKTRA — 메인 웹사이트

> Verification tools for air-gapped environments. · Proof, not consensus.

NOKTRA 브랜드 홈이자 9개 검증 도구의 다운로드 허브. Next.js 14(App Router) 정적 export로 빌드되며 서버 기능이 전혀 없다(폼·API·DB 없음, 분석·텔레메트리 없음).

## 스택

- Next.js 14 (App Router, `output: 'export'`) + React 18 + framer-motion
- 패키지 매니저: **pnpm** (npm 사용 금지)
- 폰트: Newsreader / IBM Plex Sans / IBM Plex Mono — `next/font`로 셀프호스트(외부 요청 0)

## 개발

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 정적 export → out/
pnpm serve        # out/ 로컬 서빙
```

## 콘텐츠 관리

| 위치 | 역할 |
|---|---|
| `content/products.json` | **제품 정보의 단일 진실** — 이름·한줄·기능·상태·저장소·다운로드 URL. 코드 수정 없이 상태 승격(`in-development` → `beta` → `available`) 및 릴리스 URL 주입 |
| `styles/tokens.css` | 룩의 단일 기준 — Token Sheet 시안에서 추출한 다크/라이트 CSS 변수 2세트 |
| `design-mockups/` | Claude Design 시안 원본 (참조 전용, 빌드 미포함) |
| `public/shots/` | 제품 스크린샷 투입 위치 — `products.json`의 `image` 필드로 연결 |

- 다운로드 링크: `products.json`의 `download.win`(또는 `.mac`)이 비어 있으면 사이트는 자동으로 "In development" 처리한다.
- 릴리스 해시: 실물 릴리스 등록 시 제품 객체에 `"sha256": {"win": "<64자리>"}` 필드를 추가하면 상세페이지 다운로드 밴드에 SHA-256이 표시된다(없으면 미표시). 해시 추출: `shasum -a 256 <파일>` (macOS) / `certutil -hashfile <파일> SHA256` (Windows).
- 상태 배지: available=액센트 / beta=앰버 / in-development=뮤트.

## 배포 (GitHub Pages)

`main` 푸시 시 `.github/workflows/deploy.yml`이 pnpm 빌드 → `out/`을 Pages로 배포한다.

**최초 1회 설정**: 저장소 Settings → Pages → *Build and deployment* → Source를 **GitHub Actions**로 선택.

기본 서빙 주소: `https://kim-hakseong.github.io/noktra-website/`

### 커스텀 도메인(noktra.io) 연결 절차

1. DNS 설정 (도메인 등록기관에서):
   - apex(`noktra.io`): A 레코드 4개 → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: CNAME → `kim-hakseong.github.io`
2. 저장소 Settings → Pages → Custom domain에 `noktra.io` 입력 → DNS 체크 통과 후 **Enforce HTTPS** 활성화.
3. `public/CNAME` 파일 생성(내용: `noktra.io`) — export 시 `out/`에 포함되어 배포마다 유지된다.
4. `.github/workflows/deploy.yml`의 빌드 env 교체:
   ```yaml
   NEXT_PUBLIC_BASE_PATH: ''
   NEXT_PUBLIC_SITE_ORIGIN: https://noktra.io
   ```
   (커스텀 도메인은 루트 서빙이므로 basePath가 없어야 한다.)
5. 푸시 → 배포 후 `https://noktra.io` 확인.

## 문서

- `CONTEXT.md` — 포지셔닝·철학·빌드 전략
- `PRD.md` — 페이지·마일스톤 정의
- `DESIGN.md` / `DESIGN_VISUAL.md` — 구조 / 룩 기준
- `RALPH_LOG.md` — 빌드 세션 로그(결정·미정 사항 포함)

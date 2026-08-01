# DESIGN_VISUAL.md — 비주얼의 유일한 기준 (Claude Design 실물 산출 파일 기반)

이 저장소의 룩(색·타이포·간격·라운드·레이아웃)은 아래 시안 파일들이 유일한 진실이다.
Ralph는 매 세션 시작 시 이 문서와 시안 파일을 함께 읽는다. 임의 스타일 발명 금지.

## 1. 시안 파일 위치와 역할

사람이 저장소 루트의 **`design-mockups/`** 폴더에 아래 파일을 넣어 둔다 (다운로드 원본 그대로):

| 파일 | 역할 → 대응 산출물 |
|---|---|
| `NOKTRA Token Sheet.dc.html` | **토큰의 원천.** 색·타이포·간격·라운드·배지·버튼 상태 → `styles/tokens.css` |
| `NOKTRA Home v2.dc.html` | 홈(/) 레이아웃 정본 — 밴드 순서·히어로·5동사 그리드·기둥·철학 스트립 |
| `NOKTRA Product Detail.dc.html` | /products/[slug] 템플릿 정본 |
| `NOKTRA Products Index.dc.html` | /products 정본 |
| `NOKTRA Philosophy.dc.html` | /method 정본 |
| `support.js`, `image-slot.js` | Claude Design 뷰어 런타임 — **참조 전용, 프로덕션 빌드에 포함 금지** |

`design-mockups/`는 빌드 대상에서 제외한다 (next 빌드에 포함되지 않게, 저장소에는 커밋해 히스토리 보존).

## 2. 추출 규칙 (W1에서 수행)

1. **토큰 추출**: `Token Sheet.dc.html`의 `<style>`/인라인 정의에서 CSS 변수·색 hex·폰트 패밀리·타입 스케일·간격·라운드·그림자 값을 추출해 `styles/tokens.css`로 정리한다.
   - `[data-theme="light"]` / `[data-theme="dark"]` 2세트 구조로 재구성. 시안에 두 테마가 모두 정의돼 있으면 그대로, **한 테마만 있으면 그 테마를 구현하고 반대 테마는 `[미정]` 로그 후 뉴트럴 유도값**(발명 금지, 사람 확인 대기).
   - 변수명은 시안의 명명을 우선 존중, 없으면 역할 기반(-canvas/-panel/-ink/-accent/-warn/-muted)으로.
2. **레이아웃 추출**: 각 페이지 시안의 밴드 순서·섹션 구성·타이포 위계·컴포넌트 형태를 **구조로 옮긴다** — `.dc.html` 마크업을 프로덕션에 복붙하지 않는다. 구현은 nexys-website 골격의 컴포넌트(밴드/Header/Footer/Reveal)를 시안 모습대로 재구성하는 방식.
3. **폰트**: 시안이 지정한 패밀리를 셀프호스트(woff2). 유료/미배포 폰트면 `[미정]` 로그 + 동계열 오픈소스 대역을 임시 적용하고 사람 확인 대기.
4. **support.js / image-slot.js**: 열어보되 코드·스크립트를 산출물에 가져오지 않는다. 이미지 슬롯 위치 정보만 참고(스크린샷 프레임 배치).

## 3. 충실도 규칙

- **정확히 일치해야 하는 것**: 색 값, 배지 3상태 색(available/beta/in-development), 타이포 3계층(디스플레이/UI/모노) 패밀리·크기 위계, 밴드 순서, 다크·라이트 각 테마의 배경/텍스트 대비.
- **적응 허용**: 반응형 세부(시안에 모바일이 없으면 데스크톱 비례를 유지하며 축소 설계), framer-motion 리빌 정도, 시맨틱 HTML 구조.
- **충돌 심판**: 구조·페이지 구성·데이터 스키마는 DESIGN.md 승 / 룩은 시안 승. 시안과 DESIGN.md의 페이지 구성이 다르면(섹션 추가·순서 차이) **시안을 따르고 `[결정]` 로그**.

## 4. 검증 (각 UI milestone DoD에 포함)

- tokens.css의 주요 값(액센트·캔버스·잉크·배지 3색)이 Token Sheet 추출값과 일치하는지 대조 기록.
- 완성 페이지를 시안과 나란히 놓고 밴드 순서·위계 일치 스모크 확인, 차이는 `[결정]`/`[미정]`으로 로그.

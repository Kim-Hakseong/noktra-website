# CONTEXT.md — NOKTRA 메인 웹사이트
- 목적: NOKTRA 브랜드 홈 (noktra.io 예정). 9개 검증 도구의 얼굴이자 다운로드 허브. 영어 기본(글로벌), /ko는 후순위.
- 포지셔닝: "Verification tools that work in the dark."(dark=오프라인·폐쇄망 은유) / 철학: "Proof, not consensus."
- 빌드 전략: **기존 nexys-website 골격 재사용**(같은 소유자 저장소 — Next.js 14 + framer-motion + 정적 export + dark/ink/paper 밴드 문법 + Header/Footer/Reveal/Timeline 컴포넌트). 콘텐츠·브랜드만 교체해 빠르게.
- 비주얼: Claude Design 산출 시안이 유일한 룩 기준 — DESIGN_VISUAL.md(사람이 산출 토큰 붙여넣는 파일)와 styles/tokens.css로 주입. 라이트+다크 듀얼, FOUC 방지 토글.
- 제품 상태: Available/Beta/In Development 3배지, content/products.json에서만 관리(코드 수정 없이 승격).
- NOKTRA 인프라 사실(사이트 Method/Philosophy에 반영 가능한 실화): 골든 벡터 방법론, 3900X 24/7 CI 회귀 팜, 로컬 LLM 실측 벤치(모델 카탈로그), Jetson Orin 컴패니언 컴퓨터 실기 테스트베드(MAVLink 계열).

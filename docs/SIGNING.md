# SIGNING.md — 코드 서명 런북 (내부 문서, 무료 전략 기준)

> 2026-08-03 합의: 베타까지 0원(SHA-256 + SignPath + self-signed), 유료화 시 Azure Trusted Signing(연 ~$120).
> OV 인증서(연 $200~400)는 구매하지 않는다. 고객용 정책 페이지: /security (사이트).

## 단계 0 — 지금 (릴리스 없음) : 비용 0원

- 할 일 없음. SHA-256 배관(products.json `sha256` 필드)과 /security 정책 페이지가 이미 준비됨.
- 릴리스가 생기면 이 문서의 단계 1로.

## 단계 1 — 첫 공개 베타 릴리스 : 비용 0원

### 1-A. SignPath Foundation 신청 (오픈소스 무료 서명)

- 신청: https://signpath.org/apply (Foundation의 OSS 프로그램)
- 자격 요건(신청 전 점검):
  - [ ] 공개 저장소 + OSS 라이선스 명시 (ram-toolkit은 MIT 확인됨 — **나머지 저장소들의 LICENSE 파일 상태를 먼저 정리할 것**. 일부는 "Copyright Noktra. All rights reserved."라 OSS 요건 불충족 가능)
  - [ ] CI에서 재현 가능한 빌드 (verify.yml이 이미 있으므로 release 워크플로만 추가)
  - [ ] 프로젝트 실사용/활동 증빙 (README·릴리스·커밋 히스토리)
- 승인 후: SignPath가 서명 파이프라인(GitHub Actions 연동)을 제공. 릴리스 워크플로에서 아티팩트 업로드 → 서명본 회수.
- **주의**: 게시자 표기가 "SignPath Foundation"으로 뜬다. /security 페이지에 이미 그렇게 명시해 두었으니 표기 문구만 실물에 맞게 갱신.

### 1-B. 폐쇄망 고객용 자체 서명 인증서 (병행, 0원)

고객 IT가 자기 환경 신뢰 저장소에 1회 등록하는 방식. 생성·서명·검증 절차:

```powershell
# 1) 릴리스 서명용 인증서 생성 (Windows, 관리자 PowerShell) — 유효기간 3년
New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=NOKTRA Release Signing" `
  -CertStoreLocation Cert:\CurrentUser\My -HashAlgorithm SHA256 `
  -NotAfter (Get-Date).AddYears(3)

# 2) 공개 인증서(.cer) 내보내기 — 이것을 고객에게 전달 (개인키 아님!)
Export-Certificate -Cert (Get-ChildItem Cert:\CurrentUser\My -CodeSigningCert | Select -First 1) `
  -FilePath noktra-release-signing.cer

# 3) exe 서명 (+RFC3161 타임스탬프 — 무료 서버, 인증서 만료 후에도 서명 유효)
signtool sign /fd SHA256 /td SHA256 /tr http://timestamp.digicert.com `
  /n "NOKTRA Release Signing" noktra-<tool>-<ver>.exe

# 4) 검증 (고객측 — 인증서 등록 후)
signtool verify /pa noktra-<tool>-<ver>.exe
```

- 개인키 보관: 오프라인(USB·금고). 유출 = 인증서 재발급 + 고객 재등록.
- 고객 전달물: `.cer` 파일 + 등록 안내 1장(신뢰할 수 있는 게시자 저장소에 등록 → signtool verify).
- 타임스탬프 서버 사용은 서명 시 1회 온라인 필요 — **NOKTRA 빌드 머신에서만**. 고객 검증은 완전 오프라인.

### 1-C. 릴리스 체크리스트 (매 릴리스)

1. 빌드 → (SignPath 또는 self-signed) 서명
2. `shasum -a 256` 으로 해시 추출
3. GitHub Release 업로드 (해시를 릴리스 노트에도 기재 — 이중 채널)
4. noktra-website `products.json`: `download.win` URL + `sha256.win` 주입
5. 사이트 자동 배포 확인 → 다운로드 밴드에 SHA-256 표시 확인

## 단계 2 — 유료 판매 시작 : 연 ~$120

- Azure Trusted Signing 기본 티어(월 $9.99)로 전환.
  - 신원 검증(개인 또는 사업자) → 게시자명이 실명/사업자명으로 표기됨
  - GitHub Actions 공식 액션 존재(azure/trusted-signing-action) — release 워크플로에서 서명 단계만 교체
- SignPath는 병행 유지하거나 종료(둘 다 서명해도 무방하나 불필요).
- 이 시점에도 SHA-256 게시와 self-signed 폐쇄망 경로는 그대로 유지.

## 비용 요약

| 단계 | 서명 수단 | 연 비용 |
|---|---|---|
| 지금 | 없음 (해시만) | 0원 |
| 공개 베타 | SignPath Foundation + self-signed(.cer) | 0원 |
| 유료화 | Azure Trusted Signing | ~$120 |

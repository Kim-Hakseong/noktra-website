// /security — 다운로드 무결성 검증 가이드 (고객용 정본).
// 아직 공개 빌드가 없는 상태에서 "모든 릴리스가 따를 정책"을 미리 명시한다 — 상태를 정직하게 표기.
import Reveal from "@/components/Reveal";
import LLink from "@/components/LLink";
import { Tx } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function SecurityPage() {
  return (
    <>
      {/* Masthead */}
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>
              <Tx en="Security" ko="보안" />
              &nbsp;/&nbsp;
              <Tx en="Verifying a download" ko="다운로드 검증"/>
            </span>
            <span>
              <Tx
                en="Policy stated before the first release"
                ko="첫 릴리스 전에 명시하는 정책"
              />
            </span>
          </div>
          <div className="masthead__grid" style={{ paddingBottom: 64 }}>
            <div style={{ minWidth: 0 }}>
              <h1 className="masthead__title">
                <Tx en="Verify, then run." ko="검증하고, 실행하세요." />
              </h1>
              <p className="masthead__lead">
                <Tx
                  en="A NOKTRA build usually travels through an internet PC and a USB stick before it reaches the machine that matters. This page is the procedure for proving it arrived intact."
                  ko="NOKTRA 빌드는 보통 외부망 PC와 USB를 거쳐 정작 중요한 머신에 도착합니다. 이 페이지는 그 파일이 온전하게 도착했음을 증명하는 절차입니다."
                />
              </p>
            </div>
            <div className="masthead__side">
              <p>
                <Tx
                  en="No public build has shipped yet. This page states, in advance, the policy every release will follow — so the procedure is on record before the first file is."
                  ko="아직 공개 빌드는 없습니다. 이 페이지는 모든 릴리스가 따를 정책을 미리 명시합니다 — 첫 파일보다 절차가 먼저 기록되도록."
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHA-256 절차 */}
      <section className="band band--catalog">
        <div className="wrap band__in">
          <Reveal className="sec-head">
            <div>
              <div className="t-label">SHA-256</div>
              <h2>
                <Tx en="Check the fingerprint." ko="지문을 대조하세요." />
              </h2>
            </div>
            <p className="side">
              <Tx
                en="Every release publishes its SHA-256 hash on the product page, next to the download. One flipped bit anywhere produces a completely different value."
                ko="모든 릴리스는 제품 페이지의 다운로드 옆에 SHA-256 해시를 게시합니다. 어디서든 1비트만 달라져도 완전히 다른 값이 나옵니다."
              />
            </p>
          </Reveal>

          <div className="cells" style={{ marginTop: 0 }}>
            <Reveal className="cell">
              <div className="cell__no">01</div>
              <h3>
                <Tx en="Record the hash outside" ko="외부망에서 해시를 기록" />
              </h3>
              <p>
                <Tx
                  en="On the connected PC, open the product page over HTTPS and note the published SHA-256 — on paper, a photo, or the delivery form."
                  ko="인터넷이 되는 PC에서 HTTPS로 제품 페이지를 열고, 게시된 SHA-256을 종이·사진·반입 신청서 어디로든 옮겨 적습니다."
                />
              </p>
            </Reveal>
            <Reveal className="cell" delay={1}>
              <div className="cell__no">02</div>
              <h3>
                <Tx en="Carry the file in" ko="파일을 반입" />
              </h3>
              <p>
                <Tx
                  en="Move the executable however your site allows — USB, data diode, transfer server. The path does not need to be trusted; the next step is what proves it."
                  ko="USB, 자료 전송 서버 등 사업장이 허용하는 어떤 경로로든 실행 파일을 옮깁니다. 경로 자체를 신뢰할 필요는 없습니다 — 다음 단계가 그것을 증명하니까요."
                />
              </p>
            </Reveal>
            <Reveal className="cell" delay={2}>
              <div className="cell__no">03</div>
              <h3>
                <Tx en="Compute and compare inside" ko="내부망에서 계산·대조" />
              </h3>
              <p>
                <Tx
                  en="On the target machine, compute the hash with an OS built-in tool and compare all 64 characters. Match → the whole journey was clean. Mismatch → do not run it."
                  ko="대상 머신에서 OS 내장 도구로 해시를 계산해 64자리 전체를 대조합니다. 일치 → 여정 전체가 결백. 불일치 → 실행하지 마세요."
                />
              </p>
            </Reveal>
          </div>

          <Reveal className="cmd-block">
            <div className="t-label t-label--faint" style={{ marginBottom: 12 }}>
              <Tx
                en="Built-in commands — nothing to install"
                ko="OS 내장 명령 — 설치할 것 없음"
              />
            </div>
            <pre>
{`Windows   certutil -hashfile noktra-<tool>-<ver>.exe SHA256
macOS     shasum -a 256 noktra-<tool>-<ver>.exe
Linux     sha256sum noktra-<tool>-<ver>.exe`}
            </pre>
          </Reveal>
        </div>
      </section>

      {/* 코드 서명 정책 */}
      <section className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="refusals">
            <div>
              <div className="t-label">
                <Tx en="Code signing" ko="코드 서명" />
              </div>
              <h2>
                <Tx en="The signing policy" ko="서명 정책" />
              </h2>
            </div>
            <div>
              <div className="refusal">
                <span className="k">
                  <Tx en="Public releases" ko="공개 릴리스" />
                </span>
                <span className="v">
                  <Tx
                    en="From the first public release, builds are signed through an open-source code-signing service, with the signature verifiable in Windows file properties. Because the certificate belongs to the signing foundation, the publisher field may read the foundation's name rather than NOKTRA — the product pages will state exactly what to expect."
                    ko="첫 공개 릴리스부터 빌드는 오픈소스 코드 서명 서비스를 통해 서명되며, Windows 파일 속성에서 서명을 확인할 수 있습니다. 인증서가 서명 재단 소유이므로 게시자 필드에 NOKTRA 대신 재단 이름이 표시될 수 있고 — 무엇이 표시되는지는 제품 페이지에 그대로 명시합니다."
                  />
                </span>
              </div>
              <div className="refusal">
                <span className="k">
                  <Tx en="Closed networks" ko="폐쇄망 고객" />
                </span>
                <span className="v">
                  <Tx
                    en="For sites that manage their own trust policy, NOKTRA can provide a release-signing certificate file for one-time registration in your environment. After that, every release verifies against it locally — no certificate authority, no network check, consistent with everything else here."
                    ko="자체 신뢰 정책을 운용하는 사업장에는 릴리스 서명 인증서 파일을 제공해 환경에 1회 등록할 수 있게 합니다. 이후 모든 릴리스는 로컬에서 그 인증서로 검증됩니다 — 인증기관도, 네트워크 확인도 없이. 이곳의 다른 모든 것과 같은 방식입니다."
                  />
                </span>
              </div>
              <div className="refusal">
                <span className="k">
                  <Tx en="Either way" ko="어느 쪽이든" />
                </span>
                <span className="v">
                  <Tx
                    en="The SHA-256 procedure above always applies, signature or not. A signature says who built it; the hash says nothing changed since. They answer different questions, so we publish both."
                    ko="서명 여부와 무관하게 위의 SHA-256 절차는 항상 유효합니다. 서명은 '누가 만들었는가'에, 해시는 '그 뒤로 바뀌지 않았는가'에 답합니다. 다른 질문이므로 둘 다 게시합니다."
                  />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 다운로드가 하지 않는 일 */}
      <section className="band band--philosophy">
        <div className="wrap band__in strip">
          <Reveal style={{ minWidth: 0 }}>
            <div className="strip__tick" />
            <h2 className="strip--md">
              <Tx
                en={<>What a download<br />never does.</>}
                ko={<>다운로드가 결코<br />하지 않는 일.</>}
              />
            </h2>
          </Reveal>
          <Reveal className="strip__side" delay={1}>
            <div className="kv kv--edge">
              <span className="k">INSTALLER</span>
              <span className="sp" />
              <span className="v">
                <Tx en="None — one file" ko="없음 — 파일 하나" />
              </span>
            </div>
            <div className="kv kv--edge">
              <span className="k">AUTO-UPDATE</span>
              <span className="sp" />
              <span className="v">
                <Tx en="Never phones home" ko="외부 접속 없음" />
              </span>
            </div>
            <div className="kv kv--edge">
              <span className="k">TELEMETRY</span>
              <span className="sp" />
              <span className="v">
                <Tx en="None, ever" ko="영구히 없음" />
              </span>
            </div>
            <div className="kv">
              <span className="k">
                <Tx en="QUESTIONS" ko="문의" />
              </span>
              <span className="sp" />
              <span className="v">
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </span>
            </div>
            <div style={{ marginTop: 20 }}>
              <LLink className="btn btn--ghost" href="/products">
                <Tx en="Back to the index" ko="인덱스로 돌아가기" />
              </LLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

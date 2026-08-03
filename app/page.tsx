// 홈(/) — Home v2 시안 정본: 히어로 → Instrument index → 신뢰 기둥 3 → 철학 스트립
// (푸터는 layout 공통). 제품 정보는 content/products.json 단일 진실.
import Link from "next/link";
import HeroProbe from "@/components/HeroProbe";
import InstrumentIndex from "@/components/InstrumentIndex";
import Reveal from "@/components/Reveal";
import { PRODUCTS, VERBS } from "@/lib/products";
import { KO_ONELINERS } from "@/lib/ko";
import { SITE } from "@/lib/site";
import { Tx } from "@/lib/i18n";

const PILLARS = [
  {
    no: "01",
    title: "Offline-first",
    titleKo: "오프라인 우선",
    body: "Designed for air-gapped networks. Any AI runs locally on the engineer's own machine; nothing about your program leaves the room.",
    bodyKo:
      "폐쇄망을 전제로 설계되었습니다. AI는 전부 엔지니어의 머신에서 로컬로 실행되며, 프로그램에 관한 어떤 것도 방 밖으로 나가지 않습니다.",
  },
  {
    no: "02",
    title: "Deterministic verification",
    titleKo: "결정론적 검증",
    body: "Golden-vector suites and reproducible runs. The same input gives the same verdict today, next quarter, and in the audit.",
    bodyKo:
      "골든 벡터 스위트와 재현 가능한 실행. 같은 입력은 오늘도, 다음 분기에도, 감사 자리에서도 같은 판정을 냅니다.",
  },
  {
    no: "03",
    title: "Single-file deploy",
    titleKo: "단일 파일 배포",
    body: "One executable, copied onto the target machine. No runtime installs, no package managers, no IT ticket.",
    bodyKo:
      "실행 파일 하나를 대상 머신에 복사하면 끝. 런타임 설치도, 패키지 매니저도, IT 티켓도 없습니다.",
  },
];

export default function Home() {
  return (
    <>
      <HeroProbe />

      <InstrumentIndex
        verbs={VERBS}
        products={PRODUCTS}
        koOneLiners={KO_ONELINERS}
      />

      <section id="pillars" className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="t-label">
            <Tx en="Why these tools are trusted" ko="이 도구들이 신뢰받는 이유" />
          </Reveal>
          <div className="cells">
            {PILLARS.map((p, i) => (
              <Reveal className="cell" key={p.no} delay={i}>
                <div className="cell__no">{p.no}</div>
                <h3>
                  <Tx en={p.title} ko={p.titleKo} />
                </h3>
                <p>
                  <Tx en={p.body} ko={p.bodyKo} />
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" className="band band--philosophy">
        <div className="wrap band__in strip">
          <Reveal style={{ minWidth: 0 }}>
            <div className="strip__tick" />
            <h2>
              Proof,
              <br />
              not consensus.
            </h2>
          </Reveal>
          <Reveal className="strip__side" delay={1}>
            <p>
              <Tx
                en={`A test that passes because everyone agreed it should is not a test. Every ${SITE.name} tool ships with golden-vector suites; deterministic checkers judge the result, AI only proposes, and a human approves before anything is released.`}
                ko={`모두가 통과해야 한다고 합의했기에 통과하는 시험은 시험이 아닙니다. 모든 ${SITE.name} 도구는 골든 벡터 스위트와 함께 배포되고, 결정론적 검사기가 결과를 판정하며, AI는 제안만 하고, 사람이 승인해야 무엇이든 릴리스됩니다.`}
              />
            </p>
            <Link className="link-under" href="/method">
              <Tx en="Read the method" ko="방법론 읽기" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

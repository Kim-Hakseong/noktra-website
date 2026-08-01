// 홈(/) — Home v2 시안 정본: 히어로 → Instrument index → 신뢰 기둥 3 → 철학 스트립
// (푸터는 layout 공통). 제품 정보는 content/products.json 단일 진실.
import Link from "next/link";
import HeroProbe from "@/components/HeroProbe";
import InstrumentIndex from "@/components/InstrumentIndex";
import Reveal from "@/components/Reveal";
import { PRODUCTS, VERBS } from "@/lib/products";
import { SITE } from "@/lib/site";

const PILLARS = [
  {
    no: "01",
    title: "Offline-first",
    body: "Designed for air-gapped networks. Any AI runs locally on the engineer's own machine; nothing about your program leaves the room.",
  },
  {
    no: "02",
    title: "Deterministic verification",
    body: "Golden-vector suites and reproducible runs. The same input gives the same verdict today, next quarter, and in the audit.",
  },
  {
    no: "03",
    title: "Single-file deploy",
    body: "One executable, copied onto the target machine. No runtime installs, no package managers, no IT ticket.",
  },
];

export default function Home() {
  return (
    <>
      <HeroProbe />

      <InstrumentIndex verbs={VERBS} products={PRODUCTS} />

      <section id="pillars" className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="t-label">Why these tools are trusted</Reveal>
          <div className="cells">
            {PILLARS.map((p, i) => (
              <Reveal className="cell" key={p.no} delay={i}>
                <div className="cell__no">{p.no}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
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
              A test that passes because everyone agreed it should is not a
              test. Every {SITE.name} tool ships with golden-vector suites;
              deterministic checkers judge the result, AI only proposes, and a
              human approves before anything is released.
            </p>
            <Link className="link-under" href="/method">
              Read the method
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

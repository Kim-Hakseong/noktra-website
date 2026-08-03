// /products — Products Index 시안 정본: 마스트헤드 → 필터+테이블 → 배포 노트 밴드
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductsTable from "@/components/ProductsTable";
import { PRODUCTS, VERBS, statusTally } from "@/lib/products";
import { KO_ONELINERS } from "@/lib/ko";
import { Tx } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Every build, every state, one page. Nine verification instruments across five verbs.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>Downloads &nbsp;/&nbsp; Full index</span>
            <span>{statusTally()}</span>
          </div>
          <div className="masthead__grid" style={{ paddingBottom: 64 }}>
            <div style={{ minWidth: 0 }}>
              <h1 className="masthead__title">
                <Tx en="The index" ko="인덱스" />
              </h1>
              <p className="masthead__lead">
                <Tx
                  en="Every build, every state, one page. Nothing hidden behind a sales call."
                  ko="모든 빌드, 모든 상태를 한 페이지에. 상담 전화 뒤로 감춘 것은 없습니다."
                />
              </p>
            </div>
            <div className="masthead__side">
              <p>
                <Tx
                  en="Available builds download directly. Beta builds are published with known limits. In-development instruments are listed so you can plan around them — not to sell you a roadmap."
                  ko="Available 빌드는 바로 내려받습니다. Beta 빌드는 알려진 한계와 함께 공개됩니다. 개발 중인 도구도 목록에 올립니다 — 로드맵을 팔기 위해서가 아니라, 당신이 계획을 세울 수 있도록."
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="index" className="band band--catalog">
        <div className="wrap" style={{ paddingTop: 44, paddingBottom: 92 }}>
          <ProductsTable
            verbs={VERBS}
            products={PRODUCTS}
            koOneLiners={KO_ONELINERS}
          />
        </div>
      </section>

      <section className="band band--philosophy">
        <div className="wrap strip" style={{ paddingTop: 78, paddingBottom: 84 }}>
          <Reveal style={{ minWidth: 0 }}>
            <div className="strip__tick" />
            <h2 className="strip--md">
              <Tx
                en={<>Carry it in<br />on a stick.</>}
                ko={<>USB에 담아<br />들고 들어가세요.</>}
              />
            </h2>
          </Reveal>
          <Reveal className="strip__side" delay={1}>
            <p>
              <Tx
                en="Every download is a single executable with its golden-vector suite embedded. Verify the hash on the outside network, copy the file across, run the suite on the target machine — the same verdict, or it doesn't ship."
                ko="모든 다운로드는 골든 벡터 스위트를 내장한 단일 실행 파일입니다. 외부망에서 해시를 검증하고, 파일을 옮기고, 대상 머신에서 스위트를 돌리세요 — 같은 판정이 나오거나, 출하되지 않거나."
              />
            </p>
            <Link className="link-under" href="/method">
              <Tx en="Why we verify this way" ko="왜 이렇게 검증하는가" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

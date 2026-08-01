// /products — Products Index 시안 정본: 마스트헤드 → 필터+테이블 → 배포 노트 밴드
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductsTable from "@/components/ProductsTable";
import { PRODUCTS, VERBS, statusTally } from "@/lib/products";

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
              <h1 className="masthead__title">The index</h1>
              <p className="masthead__lead">
                Every build, every state, one page. Nothing hidden behind a
                sales call.
              </p>
            </div>
            <div className="masthead__side">
              <p>
                Available builds download directly. Beta builds are published
                with known limits. In-development instruments are listed so you
                can plan around them — not to sell you a roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="index" className="band band--catalog">
        <div className="wrap" style={{ paddingTop: 44, paddingBottom: 92 }}>
          <ProductsTable verbs={VERBS} products={PRODUCTS} />
        </div>
      </section>

      <section className="band band--philosophy">
        <div className="wrap strip" style={{ paddingTop: 78, paddingBottom: 84 }}>
          <Reveal style={{ minWidth: 0 }}>
            <div className="strip__tick" />
            <h2 className="strip--md">
              Carry it in
              <br />
              on a stick.
            </h2>
          </Reveal>
          <Reveal className="strip__side" delay={1}>
            <p>
              Every download is a single executable with its golden-vector
              suite embedded. Verify the hash on the outside network, copy the
              file across, run the suite on the target machine — the same
              verdict, or it doesn&apos;t ship.
            </p>
            <Link className="link-under" href="/method">
              Why we verify this way
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

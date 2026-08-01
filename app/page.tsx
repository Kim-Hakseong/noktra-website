// W1 placeholder — W2에서 시안 정본 홈으로 교체
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <section className="band band--hero">
      <div className="wrap band__in">
        <div className="hero__wordmark t-serif">{SITE.name}</div>
        <p className="hero__lead">{SITE.positioning}</p>
      </div>
    </section>
  );
}

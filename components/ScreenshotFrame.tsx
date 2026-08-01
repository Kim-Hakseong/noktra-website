// 16:10 스크린샷 프레임 — 이미지 경로는 products.json(image)에서,
// 없으면 회색 프레임 + "screenshot" 라벨 (가짜 UI 이미지 생성 금지).
import { asset } from "@/lib/asset";

interface Props {
  name: string;
  image?: string;
  barLeft: string;
  footLeft: string;
  footRight: string;
}

export default function ScreenshotFrame({
  name,
  image,
  barLeft,
  footLeft,
  footRight,
}: Props) {
  return (
    <figure className="shot">
      <div className="shot__bar">
        <span>
          <span className="dot" />
          {barLeft}
        </span>
      </div>
      <div className="shot__frame">
        {image ? (
          <img src={asset(image)} alt={`${name} screenshot`} loading="lazy" />
        ) : (
          <span className="shot__ph">screenshot</span>
        )}
      </div>
      <figcaption className="shot__foot">
        <span>{footLeft}</span>
        <span>{footRight}</span>
      </figcaption>
    </figure>
  );
}

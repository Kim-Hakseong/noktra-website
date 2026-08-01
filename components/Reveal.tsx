"use client";

// nexys-website 골격 이식 — 강건한 스크롤 reveal (구조 보존)
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";

const EASE = "cubic-bezier(.16,1,.3,1)";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  [key: string]: unknown;
};

/**
 * - SSR/JS 미실행 시: 항상 보임 (콘텐츠가 절대 숨겨지지 않음)
 * - 마운트 시 화면 안/근처면 즉시 표시 (깜빡임 없음 → 히어로 등 상단 콘텐츠 보장)
 * - 화면 아래 요소만 숨겼다가 스크롤 진입 시 등장, 안전망 타이머로 1.6s 후 무조건 표시
 */
export default function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const rect = el.getBoundingClientRect();
    const nearViewport = rect.top < window.innerHeight * 0.92;

    if (reduce || nearViewport) {
      setShown(true);
      return;
    }

    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    const t = setTimeout(() => setShown(true), 1600);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const Tag = as as ElementType;
  const d = shown ? delay * 0.08 : 0;
  const animStyle: CSSProperties = armed
    ? {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity .9s ${EASE} ${d}s, transform .9s ${EASE} ${d}s`,
        willChange: "opacity, transform",
      }
    : {};

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...animStyle, ...(style as object) }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

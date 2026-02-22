import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseCountUpOptions {
  end:           number;
  duration?:     number; // ms — default: 1800
  startOnMount?: boolean;
}

interface UseCountUpReturn {
  count: number;
  ref:   RefObject<HTMLDivElement | null>;
}

// ─────────────────────────────────────────────
// شمارش از 0 تا عدد هدف با ease-out cubic
// وقتی المان وارد viewport میشه شروع می‌کنه
// ─────────────────────────────────────────────
export function useCountUp({
  end,
  duration     = 1800,
  startOnMount = false,
}: UseCountUpOptions): UseCountUpReturn {
  const [count,  setCount]  = useState(0);
  const [inView, setInView] = useState(startOnMount);
  const ref = useRef<HTMLDivElement>(null);

  // ── Intersection Observer ──────────────────────────────
  useEffect(() => {
    if (startOnMount) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // فقط یه بار
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnMount]);

  // ── Animation Loop ─────────────────────────────────────
  useEffect(() => {
    if (!inView) return;

    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCount(Math.round(end * eased));

      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return { count, ref };
}

"use client";
import { useEffect, useRef, useState } from "react";

// Counts from 0 → value when scrolled into view. SSR renders the final value
// (no-JS + hydration safe); animation only runs with JS and motion allowed.
export function CountUp({ value, decimals = 1, duration = 1300 }: { value: number; decimals?: number; duration?: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            const start = performance.now();
            setDisplay(0);
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="serif-num">
      {display.toFixed(decimals)}
    </span>
  );
}

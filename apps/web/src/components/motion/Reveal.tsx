"use client";
import { useEffect, useRef, useState } from "react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

/** Fades a single block up when it scrolls into view. */
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`io-reveal ${className}`} data-shown={shown} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/** The grid/flex container itself; direct children stagger in. Pass the layout classes through. */
export function RevealStagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`rstagger ${className}`} data-shown={shown}>
      {children}
    </div>
  );
}

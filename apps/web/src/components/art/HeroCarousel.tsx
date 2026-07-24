"use client";
import { useEffect, useRef, useState } from "react";

export type HeroSlide = {
  src: string;
  theme: string; // e.g. "Infrastructure"
  place: string; // e.g. "Bandra-Worli Sea Link, Mumbai"
  alt: string;
  credit: { name: string; href: string };
};

// Cinematic rotating hero background. Photos crossfade on a timer (paused on hover/focus
// and disabled under reduced-motion); dots give manual control. The active slide carries
// real alt text; the rest are decorative. A slow Ken Burns zoom lives in CSS.
export function HeroCarousel({ slides, intervalMs = 6000 }: { slides: HeroSlide[]; intervalMs?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (reduced || paused || slides.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [reduced, paused, slides.length, intervalMs]);

  const s = slides[active];

  return (
    <div
      className="hero-cine-bg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div key={slide.src} className="hero-slide" data-active={i === active}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={i === active ? slide.alt : ""}
            aria-hidden={i !== active}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </div>
      ))}
      <div className="hero-scrim" aria-hidden />

      <div className="hero-caption" aria-live="off">
        <span className="hc-theme">{s.theme}</span>
        <span className="hc-place">{s.place}</span>
      </div>

      <div className="hero-dots" role="tablist" aria-label="India in focus">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${slide.theme}: ${slide.place}`}
            className="hero-dot"
            data-active={i === active}
            onClick={() => setActive(i)}
          >
            <span className="hero-dot-fill" data-run={i === active && !paused && !reduced} />
          </button>
        ))}
      </div>

      <a className="hero-credit" href={s.credit.href} target="_blank" rel="noopener noreferrer">
        {s.credit.name} / CC BY-SA
      </a>
    </div>
  );
}

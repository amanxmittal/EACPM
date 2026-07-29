"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

export type HeroSlide = {
  src: string;
  theme: string; // e.g. "Infrastructure"
  place: string; // e.g. "Bandra-Worli Sea Link, Mumbai"
  alt: string;
  credit: { name: string; href: string };
};

// Cinematic rotating hero. The active slide sits in a framed card with the
// previous/next photos peeking at either edge (à la NeGD's homepage banner);
// a control bar below carries prev/next arrows + dot pagination. Photos
// crossfade on a timer (paused on hover/focus, disabled under reduced-motion).
// The active slide carries real alt text; the rest are decorative.
export function HeroCarousel({
  slides,
  intervalMs = 6000,
  children,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
  children?: ReactNode;
}) {
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

  const count = slides.length;
  const goTo = (i: number) => setActive(((i % count) + count) % count);
  const goPrev = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  const s = slides[active];
  const prevSlide = slides[(active - 1 + count) % count];
  const nextSlide = slides[(active + 1) % count];
  const hasPeeks = count > 1;

  return (
    <>
      <div
        className="hero-carousel-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {hasPeeks && (
          <button
            type="button"
            className="hero-peek hero-peek-prev"
            onClick={goPrev}
            aria-label={`Previous: ${prevSlide.theme}, ${prevSlide.place}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={prevSlide.src} alt="" aria-hidden loading="lazy" />
          </button>
        )}

        <div className="hero-card">
          <div className="hero-cine-bg">
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
          </div>

          {children}

          <div className="hero-caption" aria-live="off">
            <span className="hc-theme">{s.theme}</span>
            <span className="hc-place">{s.place}</span>
          </div>

          <a className="hero-credit" href={s.credit.href} target="_blank" rel="noopener noreferrer">
            {s.credit.name} / CC BY-SA
          </a>
        </div>

        {hasPeeks && (
          <button
            type="button"
            className="hero-peek hero-peek-next"
            onClick={goNext}
            aria-label={`Next: ${nextSlide.theme}, ${nextSlide.place}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nextSlide.src} alt="" aria-hidden loading="lazy" />
          </button>
        )}
      </div>

      {hasPeeks && (
        <div className="hero-controls">
          <button type="button" className="ux4g-icon-btn ux4g-icon-btn-pill hero-arrow" onClick={goPrev} aria-label="Previous slide">
            <Icon name="chevronLeft" size={20} />
          </button>
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
                onClick={() => goTo(i)}
              >
                <span className="hero-dot-fill" data-run={i === active && !paused && !reduced} />
              </button>
            ))}
          </div>
          <button type="button" className="ux4g-icon-btn ux4g-icon-btn-pill hero-arrow" onClick={goNext} aria-label="Next slide">
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      )}
    </>
  );
}

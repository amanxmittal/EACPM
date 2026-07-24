"use client";
import { useEffect, useRef, useState } from "react";
import { ChapterArt } from "@/components/art/ChapterArt";
import type { Chapter } from "@/content/story";

export function IndiaStoryScrolly({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setLive(true); // enables the pinned-stage + focus-dim treatment (progressive enhancement)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`scrolly${live ? " scrolly-live" : ""}`}>
      <div className="scrolly-stage" aria-hidden>
        <div className="stage-frame">
          {chapters.map((c, i) => (
            <div key={c.id} className="story-art" data-active={i === active}>
              <ChapterArt id={c.id} />
            </div>
          ))}
          <span className="stage-era">{chapters[active]?.era}</span>
          <span className="stage-count">
            {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="scrolly-steps">
        {chapters.map((c, i) => (
          <article
            key={c.id}
            id={c.id}
            data-index={i}
            data-active={i === active}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="story-step"
            style={{ scrollMarginTop: "96px" }}
          >
            <div className="step-art">
              <ChapterArt id={c.id} />
            </div>
            <div className="step-inner">
              <span className="kicker">
                Chapter {i + 1} · {c.era}
              </span>
              <h2 className="t-h2 balance" style={{ marginTop: "0.6rem" }}>
                {c.title}
              </h2>
              <p className="t-lead" style={{ marginTop: "0.8rem", color: "var(--app-text)" }}>
                {c.dek}
              </p>
              <details className="evidence">
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>Evidence &amp; sources</summary>
                <p style={{ marginTop: "0.5rem" }}>{c.evidence}</p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

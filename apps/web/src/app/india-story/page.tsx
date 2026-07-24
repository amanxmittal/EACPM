import Link from "next/link";
import type { Metadata } from "next";
import { chapters } from "@/content/story";
import { IndiaStoryScrolly } from "@/components/story/IndiaStoryScrolly";
import { ChapterArt } from "@/components/art/ChapterArt";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "The India Story",
  description: "From the Arthashastra to LLMs — three thousand years of Indian economic thought and practice, told with evidence.",
};

export default function IndiaStoryPage() {
  return (
    <>
      <section className="page-hero hero-stage grain">
        <div className="hero-field texture-lattice" aria-hidden style={{ opacity: 0.35 }} />
        <div className="container hero-content">
          <span className="kicker">The India Story</span>
          <h1 className="t-display balance" style={{ maxWidth: "15ch", marginTop: "0.8rem" }}>
            From the Arthashastra to LLMs
          </h1>
          <hr className="gold-rule" style={{ margin: "1.2rem 0" }} />
          <p className="t-lead measure">
            Three thousand years of economic thought and practice, closing one loop: Sanskrit →
            the concept of zero → the arithmetic finance runs on → population-scale digital rails
            → language models. Every figure is sourced, or flagged for fact-check.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <span className="flag">Draft narrative — figures pending EAC-PM fact-check</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <IndiaStoryScrolly chapters={chapters} />
        </div>
      </section>

      {/* Last-Mile companion */}
      <section className="section tint" id="last-mile" style={{ scrollMarginTop: "96px" }}>
        <div className="container">
          <div className="scrolly" style={{ alignItems: "center" }}>
            <div className="stage-frame" style={{ height: "min(60vh, 420px)" }}>
              <div className="story-art" data-active="true">
                <ChapterArt id="dpi" />
              </div>
              <span className="stage-era">Now</span>
            </div>
            <div>
              <span className="kicker">Companion</span>
              <h2 className="t-h2 balance" style={{ marginTop: "0.6rem" }}>
                The Last-Mile Ledger
              </h2>
              <p className="t-lead" style={{ marginTop: "0.8rem", color: "var(--app-text)" }}>
                How India built economic delivery that reaches every citizen — the JAM trinity,
                Direct Benefit Transfer, UPI everywhere, credit for the small — and an honest
                accounting of who it has not yet reached.
              </p>
              <Link href="/publications" className="link-arrow" style={{ marginTop: "1rem" }}>
                Read the inclusion papers <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/art/CountUp";
import { Sparkline } from "@/components/charts/Sparkline";
import type { Indicator } from "@/content/indicators";
import type { Report } from "@/lib/reports";
import type { Notice } from "@/content/media";

// The hero's visual anchor: a sourced data card, ringed by a few decorative
// "component snippet" cards that echo the site's real content types (a publication,
// the bilingual toggle, a live notice). Satellites are aria-hidden decoration.
export function HeroVisual({
  indicator,
  report,
  notice,
}: {
  indicator: Indicator;
  report: Report;
  notice: Notice;
}) {
  const decimals = (indicator.value.split(".")[1] || "").length;

  return (
    <div className="hero-visual">
      {/* satellite — a publication */}
      <div className="marq-card marq-pub" aria-hidden>
        <span className="marq-eyebrow">{report.type}</span>
        <div className="marq-title" style={{ maxWidth: "13rem" }}>
          {report.title.length > 54 ? report.title.slice(0, 52) + "…" : report.title}
        </div>
        <div className="marq-row">
          <Icon name="download" size={13} /> PDF · {report.year ?? "—"}
        </div>
      </div>

      {/* satellite — bilingual toggle */}
      <div className="marq-card marq-lang" aria-hidden>
        <span className="marq-eyebrow">Language</span>
        <div className="marq-langgrid">
          <span className="marq-lang-chip on">EN</span>
          <span className="marq-lang-chip">हिन्दी</span>
        </div>
      </div>

      {/* satellite — a live notice */}
      <div className="marq-card marq-notice" aria-hidden>
        <span className="marq-eyebrow">{notice.kind}</span>
        <div className="marq-title" style={{ maxWidth: "12rem" }}>
          {notice.title.length > 40 ? notice.title.slice(0, 38) + "…" : notice.title}
        </div>
        <div className="marq-row">
          <span className={`status status-${notice.status === "open" ? "open" : notice.status === "soon" ? "soon" : "closed"}`}>
            {notice.status === "open" ? "Open" : notice.status === "soon" ? "Opening soon" : "Closed"}
          </span>
        </div>
      </div>

      {/* anchor — the sourced data card */}
      <Reveal className="spotlight-wrap">
        <div className="spotlight-shadow" aria-hidden />
        <div className="spotlight-card">
          <span className="spotlight-badge">
            <span className="spotlight-dot" aria-hidden /> Illustrative — pending verification
          </span>
          <span className="spotlight-kicker">Featured indicator</span>
          <div className="spotlight-figure">
            <span className="spotlight-value">
              <CountUp value={parseFloat(indicator.value)} decimals={decimals} />
            </span>
            <span className="spotlight-unit">{indicator.unit}</span>
          </div>
          <div className="spotlight-row">
            <span className="spotlight-label">{indicator.label}</span>
            <span className={`trend-${indicator.direction}`}>
              <Sparkline data={indicator.spark} width={72} height={26} />
            </span>
          </div>
          <div className="spotlight-foot">
            <span className="t-micro text-muted">
              {indicator.source} · {indicator.period}
            </span>
            <Link href="/data" className="link-arrow t-small">
              Dashboard <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

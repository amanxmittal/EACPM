"use client";
import { useMemo } from "react";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { MiniArea, type SM } from "@/components/charts/SmallMultiples";

const dirTagClass: Record<NonNullable<SM["dir"]>, string> = {
  up: "ux4g-tag-tonal-success ux4g-tag-s",
  down: "ux4g-tag-tonal-error ux4g-tag-s",
  flat: "ux4g-tag-tonal-neutral ux4g-tag-s",
};

// Thematic group drawn from the same indicator set as /data's "Key
// indicators" — named explicitly rather than sliced positionally, so the
// grouping survives the source array being reordered or extended.
const GROWTH_AND_PRICES = ["Real GDP growth", "CPI inflation", "Fiscal deficit"];

// Placeholder only — no verified Economic Census (EC4/EC5/EC6) time series
// exists yet; /data's own Economic Census card is deliberately numbers-free
// for the same reason (CLAUDE.md §2, never fabricate). Kept local here rather
// than folded into the shared `multiples` export so it can never leak onto
// /data's Key Indicators grid looking like a sourced macro series.
const ECONOMY_CENSUS_ILLUSTRATIVE: SM[] = [
  { label: "Registered enterprises", value: "79.5", unit: "mn", delta: "▲", dir: "up", series: [58.5, 63.1, 66.8, 70.2, 73.4, 76.6, 79.5], color: "var(--cat-2)" },
  { label: "Persons employed", value: "156", unit: "mn", delta: "▲", dir: "up", series: [110, 118, 126, 134, 142, 149, 156], color: "var(--cat-3)" },
  { label: "Establishments surveyed", value: "72.7", unit: "mn", delta: "▲", dir: "up", series: [52, 56.8, 60.9, 64.5, 67.8, 70.4, 72.7], color: "var(--app-gold)" },
];

export function HomeDashboards({ indicators }: { indicators: SM[] }) {
  const growth = useMemo(() => indicators.filter((i) => GROWTH_AND_PRICES.includes(i.label)), [indicators]);

  const renderIndicator = (it: SM, pool: SM[]) => (
    <div className="carousel-item dash-carousel-item">
      <div className="dash-item-head">
        <span className="dash-label">{it.label}</span>
        {it.delta && <span className={dirTagClass[it.dir ?? "flat"]}>{it.delta}</span>}
      </div>
      <div className="dash-value">
        {it.value}
        {it.unit && <span className="u">{it.unit}</span>}
      </div>
      <div className="dash-chart">
        <MiniArea series={it.series} color={it.color ?? "var(--cat-1)"} idx={pool.indexOf(it)} width={640} height={200} />
      </div>
    </div>
  );

  const renderCensusIndicator = (it: SM) => (
    <div className="carousel-item dash-carousel-item">
      <div className="dash-item-head">
        <span className="dash-label">{it.label}</span>
        <span className="flag-inline"><span className="d" aria-hidden /> Illustrative</span>
      </div>
      <div className="dash-value">
        {it.value}
        {it.unit && <span className="u">{it.unit}</span>}
      </div>
      <div className="dash-chart">
        <MiniArea
          series={it.series}
          color={it.color ?? "var(--cat-1)"}
          idx={ECONOMY_CENSUS_ILLUSTRATIVE.indexOf(it)}
          width={640}
          height={200}
        />
      </div>
    </div>
  );

  return (
    <div className="carousel-grid">
      <CarouselCard
        title="Growth & prices"
        items={growth}
        idBase="dashcard-growth"
        renderItem={(it) => renderIndicator(it, growth)}
        emptyLabel="No indicators available yet."
      />
      <CarouselCard
        title="Economy census"
        items={ECONOMY_CENSUS_ILLUSTRATIVE}
        idBase="dashcard-census"
        renderItem={renderCensusIndicator}
        emptyLabel="No indicators available yet."
      />
    </div>
  );
}

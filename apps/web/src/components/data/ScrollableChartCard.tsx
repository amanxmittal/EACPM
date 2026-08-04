"use client";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { DashLegend } from "@/components/data/DashLegend";

export type ChartCardItem = {
  key: string;
  title: string;
  legend: { label: string; color: string }[];
  chart: ReactNode;
};

/**
 * One outer card, N charts stepped through — `visible` of them shown at a
 * time (sub-cards side by side), sliding by one step per arrow press
 * (so with visible=2 and 3 items: [1,2] → [2,3] → [3,1] → …), same
 * carousel-foot/nav markup as CarouselCard.
 */
export function ScrollableChartCard({
  items,
  ariaLabel,
  heading,
  visible = 1,
}: {
  items: ChartCardItem[];
  ariaLabel: string;
  heading?: string;
  visible?: number;
}) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const windowSize = Math.min(visible, count);
  const visibleItems = Array.from({ length: windowSize }, (_, k) => items[(index + k) % count]);

  return (
    <div className="carousel-card dash-card-plain reports-chart-card">
      {heading && (
        <div className="dash-item-head">
          <span className="dash-label">{heading}</span>
          <span className="flag-inline">
            <span className="d" aria-hidden /> Source pending verification
          </span>
        </div>
      )}

      <div className={windowSize > 1 ? "reports-subcards" : undefined} aria-live="polite" aria-atomic="true">
        {visibleItems.map((item) => (
          <div key={item.key} className={windowSize > 1 ? "reports-subcard" : undefined}>
            {windowSize > 1 && <div className="reports-subcard-title">{item.title}</div>}
            <DashLegend series={item.legend} />
            <div className="dash-chart">
              <div className="dash-chart-panel">{item.chart}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-foot">
        <span className="carousel-count" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="carousel-nav">
          <button
            type="button"
            className="ux4g-icon-btn ux4g-icon-btn-sm ux4g-icon-btn-pill carousel-arrow"
            onClick={() => go(-1)}
            aria-label={`Previous chart in ${ariaLabel}`}
          >
            <Icon name="chevronLeft" size={18} />
          </button>
          <button
            type="button"
            className="ux4g-icon-btn ux4g-icon-btn-sm ux4g-icon-btn-pill carousel-arrow"
            onClick={() => go(1)}
            aria-label={`Next chart in ${ariaLabel}`}
          >
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

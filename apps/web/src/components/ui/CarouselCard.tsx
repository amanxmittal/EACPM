"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * One card: a title (with an optional "view all" link), then the top N of
 * `items` stepped through one at a time via prev/next arrows bottom-right.
 * Shared by the homepage's Publications and Newsroom grids so both step
 * through their content the same way.
 */
export function CarouselCard<T>({
  title,
  items,
  idBase,
  renderItem,
  viewAllHref,
  viewAllLabel,
  emptyLabel = "Nothing here yet.",
}: {
  title: string;
  items: T[];
  idBase: string;
  renderItem: (item: T, index: number) => ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
  emptyLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const titleId = `${idBase}-title`;

  const head = (
    <div className="carousel-card-head">
      <h4 id={titleId}>{title}</h4>
      {viewAllHref && viewAllLabel && (
        <Link href={viewAllHref} className="view-all">
          {viewAllLabel} <Icon name="arrowRight" size={16} />
        </Link>
      )}
    </div>
  );

  if (!items.length) {
    return (
      <section className="carousel-card" aria-labelledby={titleId}>
        {head}
        <p className="text-muted t-small">{emptyLabel}</p>
      </section>
    );
  }

  const count = items.length;
  // Wrap at both ends so neither arrow ever dead-ends on a short list.
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="carousel-card" aria-labelledby={titleId}>
      {head}

      {/* Only the slide swaps announce; the arrows below stay silent so a
          screen reader isn't told about the controls on every step. */}
      <div className="carousel-stage" aria-live="polite" aria-atomic="true">
        {renderItem(items[index], index)}
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
            aria-label={`Previous of the top ${count} in ${title}`}
          >
            <Icon name="chevronLeft" size={18} />
          </button>
          <button
            type="button"
            className="ux4g-icon-btn ux4g-icon-btn-sm ux4g-icon-btn-pill carousel-arrow"
            onClick={() => go(1)}
            aria-label={`Next of the top ${count} in ${title}`}
          >
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

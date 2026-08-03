"use client";
import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import { HomeCoverThumbnail } from "@/components/publications/HomeCoverThumbnail";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { readMinutes, REPORTS_THUMBNAIL, WORKING_PAPER_THUMBNAIL, type Report } from "@/lib/reports";

const CARD_SIZE = 5;

export function HomePublications({ reports, excludeSlug }: { reports: Report[]; excludeSlug: string }) {
  // The feature report is already showcased in the hero above, so it's left out
  // of both cards to avoid showing the same paper twice on one screen.
  const { papers, publishedReports } = useMemo(() => {
    const pool = reports.filter((r) => r.slug !== excludeSlug);
    return {
      papers: pool.filter((r) => r.type === "Working Paper").slice(0, CARD_SIZE),
      publishedReports: pool.filter((r) => r.type === "Report").slice(0, CARD_SIZE),
    };
  }, [reports, excludeSlug]);

  const renderItem = (cover: (r: Report) => ReactNode) => (r: Report) => (
    <Link href={`/publications/${r.slug}`} className="carousel-item pub-item">
      {cover(r)}
      <div className="body">
        <span className="ux4g-tag-tonal-primary ux4g-tag-s">{r.type}</span>
        <h4 className="ux4g-mt-xs">{r.title}</h4>
        <p className="pub-item-meta">
          {r.year ?? "Recent"} · {readMinutes(r)} min read
        </p>
        <p className="pub-item-excerpt">{r.abstract}</p>
      </div>
    </Link>
  );

  return (
    <div className="carousel-grid">
      {/* Both carousels show a fixed client-supplied thumbnail for every card,
          not each item's own real cover scan (see chat history) — same
          treatment on both, just a different image per carousel. */}
      <CarouselCard
        title="Working papers"
        items={papers}
        idBase="pubcard-papers"
        renderItem={renderItem(() => <HomeCoverThumbnail src={WORKING_PAPER_THUMBNAIL} />)}
        emptyLabel="Nothing published in this category yet."
      />
      <CarouselCard
        title="Reports"
        items={publishedReports}
        idBase="pubcard-reports"
        renderItem={renderItem(() => <HomeCoverThumbnail src={REPORTS_THUMBNAIL} />)}
        emptyLabel="Nothing published in this category yet."
      />
    </div>
  );
}

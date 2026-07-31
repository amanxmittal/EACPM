"use client";
import { useMemo } from "react";
import Link from "next/link";
import { CoverArt } from "@/components/ui/CoverArt";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { readMinutes, type Report } from "@/lib/reports";

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

  const renderReport = (r: Report) => (
    <Link href={`/publications/${r.slug}`} className="carousel-item pub-item">
      <CoverArt report={r} />
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
      <CarouselCard
        title="Working papers"
        items={papers}
        idBase="pubcard-papers"
        renderItem={renderReport}
        emptyLabel="Nothing published in this category yet."
      />
      <CarouselCard
        title="Reports"
        items={publishedReports}
        idBase="pubcard-reports"
        renderItem={renderReport}
        emptyLabel="Nothing published in this category yet."
      />
    </div>
  );
}

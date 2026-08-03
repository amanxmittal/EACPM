"use client";
import Link from "next/link";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { CoverArt } from "@/components/ui/CoverArt";
import { Icon } from "@/components/ui/Icon";
import { readMinutes, type Report } from "@/lib/reports";

/**
 * "Latest publications" spotlight on /publications — the top N reports stepped
 * through one at a time. Client wrapper because CarouselCard takes a render
 * function, which a Server Component can't pass across the boundary.
 */
export function PublicationsSpotlight({ reports }: { reports: Report[] }) {
  return (
    <CarouselCard
      title="Latest publications"
      items={reports}
      idBase="pub-spotlight"
      emptyLabel="No publications listed yet."
      renderItem={(r) => (
        <Link href={`/publications/${r.slug}`} className="carousel-item spotlight-item">
          <div className="spotlight-cover">
            <CoverArt report={r} />
          </div>
          <div className="spotlight-body">
            <div className="cluster ux4g-inline-gap-s">
              <span className="ux4g-tag-tonal-primary ux4g-tag-s">{r.type}</span>
              <span className="t-micro text-muted">
                {r.year} · {readMinutes(r)} min read
              </span>
            </div>
            <h2 className="t-h2 balance ux4g-mt-xs">{r.title}</h2>
            <p className="text-muted ux4g-mt-s spotlight-desc">{r.abstract}</p>
            <span className="link-arrow ux4g-mt-m">
              Read the paper <Icon name="arrowRight" size={16} />
            </span>
          </div>
        </Link>
      )}
    />
  );
}

"use client";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { Icon } from "@/components/ui/Icon";

export type SpotlightItem = {
  key: string;
  kind: "Article" | "News";
  title: string;
  meta: string;
  href: string;
  imageUrl?: string;
};

/**
 * "Recent media & events" spotlight on /media, before the Articles section —
 * top N articles/press items stepped through one at a time. Client wrapper
 * (like PublicationsSpotlight) because CarouselCard takes a render function,
 * which a Server Component can't pass across the boundary.
 */
export function MediaSpotlight({ items }: { items: SpotlightItem[] }) {
  return (
    <CarouselCard
      title="Recent media & events"
      items={items}
      idBase="media-spotlight"
      emptyLabel="Nothing recent to show yet."
      renderItem={(m) => (
        <a href={m.href} target="_blank" rel="noopener noreferrer" className="carousel-item spotlight-item">
          <div className="spotlight-cover">
            {/* All spotlight items currently carry a real, verified photo — no
                typographic fallback needed (contrast CoverArt on Publications,
                which always has to cover for a missing scan). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.imageUrl} alt="" />
          </div>
          <div className="spotlight-body">
            <div className="cluster ux4g-inline-gap-s">
              <span className="ux4g-tag-tonal-primary ux4g-tag-s">{m.kind}</span>
              <span className="t-micro text-muted">{m.meta}</span>
            </div>
            <h2 className="t-h2 balance ux4g-mt-xs">{m.title}</h2>
            <span className="link-arrow ux4g-mt-m">
              {m.kind === "Article" ? "Read the article" : "View coverage"} <Icon name="external" size={16} />
            </span>
          </div>
        </a>
      )}
    />
  );
}

"use client";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { Icon } from "@/components/ui/Icon";
import {
  noticeStatusClass,
  noticeStatusLabel,
  thumbnailForNoticeKind,
  type Notice,
} from "@/content/media";

/**
 * "Latest notices" spotlight on /notices, before the explorer — same
 * .spotlight-item layout as the Publications/Media spotlights. Notices carry
 * no abstract field (unlike Report), so the body just shows kind/status,
 * title and a link — nothing invented to fill the space. Thumbnail is the
 * client-supplied per-kind image (Tender, Vacancy Circular); other kinds
 * (Work at EAC-PM, Other) fall back to the neutral icon, same as everywhere
 * else this session — no image exists for those yet.
 */
export function NoticesSpotlight({ notices }: { notices: Notice[] }) {
  return (
    <CarouselCard
      title="Latest notices"
      items={notices}
      idBase="notices-spotlight"
      emptyLabel="No notices listed yet."
      renderItem={(n) => {
        const thumbnail = thumbnailForNoticeKind(n.kind);
        return (
          <a
            href={n.href}
            target={n.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="carousel-item spotlight-item"
          >
            <div className="spotlight-cover">
              {thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumbnail} alt="" />
              ) : (
                <div className="spotlight-cover-icon" aria-hidden>
                  <Icon name="landmark" size={28} />
                </div>
              )}
            </div>
            <div className="spotlight-body">
              <div className="cluster ux4g-inline-gap-s">
                <span className="ux4g-tag-tonal-primary ux4g-tag-s">{n.kind}</span>
                <span className={noticeStatusClass[n.status]}>{noticeStatusLabel[n.status]}</span>
                <span className="t-micro text-muted">{n.date}</span>
              </div>
              <h2 className="t-h2 balance ux4g-mt-xs">{n.title}</h2>
              <span className="link-arrow ux4g-mt-m">
                Read more <Icon name="arrowRight" size={16} />
              </span>
            </div>
          </a>
        );
      }}
    />
  );
}

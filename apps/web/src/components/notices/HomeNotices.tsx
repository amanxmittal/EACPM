"use client";
import { useMemo } from "react";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { Icon } from "@/components/ui/Icon";
import {
  isArchived,
  noticeStatusClass,
  noticeStatusLabelShort,
  thumbnailForNoticeKind,
  type Notice,
} from "@/content/media";

const CARD_SIZE = 5;

export function HomeNotices({ notices }: { notices: Notice[] }) {
  // Same "current vs archived" split as /notices — an aged-out notice drops
  // out of these previews the same way it drops out of that page's list.
  const { tenders, vacancies } = useMemo(() => {
    const current = notices.filter((n) => !isArchived(n));
    return {
      tenders: current.filter((n) => n.kind === "Tender").slice(0, CARD_SIZE),
      vacancies: current.filter((n) => n.kind === "Vacancy Circular").slice(0, CARD_SIZE),
    };
  }, [notices]);

  const renderNotice = (n: Notice) => (
    <a
      href={n.href}
      target={n.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="carousel-item notice-carousel-item"
    >
      {/* Every Tender / Vacancy Circular uses its client-supplied thumbnail,
          not a per-notice image (see chat history) — same pattern as
          CoverArt's site-wide Working Paper/Report thumbnails. Other kinds
          keep the neutral icon placeholder. */}
      <span className="notice-thumb" aria-hidden>
        {thumbnailForNoticeKind(n.kind) ? (
          <img src={thumbnailForNoticeKind(n.kind)} alt="" />
        ) : (
          <Icon name="landmark" size={26} />
        )}
      </span>
      <div className="notice-body">
        <span className={noticeStatusClass[n.status]}>{noticeStatusLabelShort[n.status]}</span>
        <h4>{n.title}</h4>
        <p className="nk">{n.date}</p>
      </div>
    </a>
  );

  return (
    <div className="carousel-grid">
      <CarouselCard
        title="Tenders"
        items={tenders}
        idBase="noticecard-tenders"
        renderItem={renderNotice}
        emptyLabel="No open tenders right now."
      />
      <CarouselCard
        title="Vacancy circulars"
        items={vacancies}
        idBase="noticecard-vacancies"
        renderItem={renderNotice}
        emptyLabel="No open vacancy circulars right now."
      />
    </div>
  );
}

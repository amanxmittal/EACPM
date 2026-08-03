"use client";
import { useMemo } from "react";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { Icon } from "@/components/ui/Icon";
import {
  isArchived,
  noticeStatusClass,
  noticeStatusLabelShort,
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
      {/* Real thumbnail where supplied (currently the one Tender entry);
          other notices fall back to the neutral placeholder, same spirit as
          CoverArt's typographic cover for publications. */}
      <span className="notice-thumb" aria-hidden>
        {n.imageUrl ? <img src={n.imageUrl} alt="" /> : <Icon name="landmark" size={26} />}
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

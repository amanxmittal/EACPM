"use client";
import { CarouselCard } from "@/components/ui/CarouselCard";
import type { Article } from "@/content/media";
import type { PressMention } from "@/app/media/page";

const CARD_SIZE = 5;

export function HomeNewsroom({ articles, news }: { articles: Article[]; news: PressMention[] }) {
  return (
    <div className="carousel-grid">
      <CarouselCard
        title="Articles by EAC-PM members"
        items={articles.slice(0, CARD_SIZE)}
        idBase="newscard-articles"
        emptyLabel="No member articles listed yet."
        renderItem={(a) => (
          <a href={a.href} target="_blank" rel="noopener noreferrer" className="carousel-item media-carousel-item">
            <span className="outlet">{a.outlet}</span>
            <h4>{a.title}</h4>
            <p className="byline">{a.author}</p>
          </a>
        )}
      />
      <CarouselCard
        title="EAC-PM in news"
        items={news.slice(0, CARD_SIZE)}
        idBase="newscard-news"
        emptyLabel="No press coverage listed yet."
        renderItem={(n) => (
          <a href={n.href} target="_blank" rel="noopener noreferrer" className="carousel-item news-carousel-item">
            <h4>{n.title}</h4>
          </a>
        )}
      />
    </div>
  );
}

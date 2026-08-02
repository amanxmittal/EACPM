"use client";
import { CarouselCard } from "@/components/ui/CarouselCard";
import { Icon } from "@/components/ui/Icon";
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
            <span className="media-thumb" aria-hidden>
              {a.imageUrl ? <img src={a.imageUrl} alt="" /> : <Icon name="book" size={26} />}
            </span>
            <div className="media-body">
              <span className="outlet">{a.outlet}</span>
              <h4>{a.title}</h4>
              <p className="byline">{a.author}</p>
            </div>
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
            <span className="news-thumb" aria-hidden>
              {n.imageUrl ? <img src={n.imageUrl} alt="" /> : <Icon name="rss" size={26} />}
            </span>
            <div className="news-body">
              <h4>{n.title}</h4>
            </div>
          </a>
        )}
      />
    </div>
  );
}

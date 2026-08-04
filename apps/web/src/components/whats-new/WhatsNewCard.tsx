import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * Card for What's New's Notice/Media items — same shell (.card/.pub-card) as
 * PublicationCard so grid/list read as one consistent system, but without an
 * abstract or PDF button, since notices and articles carry neither (nothing
 * invented to fill those slots — CLAUDE.md §2).
 */
export function WhatsNewCard({
  imageUrl,
  tagLabel,
  badge,
  title,
  href,
  external,
  isNew,
  layout = "grid",
}: {
  imageUrl?: string;
  tagLabel: string;
  badge: string;
  title: string;
  href: string;
  external?: boolean;
  isNew?: boolean;
  layout?: "grid" | "list";
}) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const cover = imageUrl ? (
    <div className="cover cover-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" />
    </div>
  ) : (
    <div className="cover">
      <Icon name="landmark" className="cover-glyph" aria-hidden="true" />
      <span className="cover-mark">EAC·PM</span>
      <span className="cover-type">{badge}</span>
    </div>
  );

  return (
    <article className={`card card-hover pub-card${layout === "list" ? " pub-card-list" : ""}`}>
      {external ? (
        <a href={href} aria-label={title} className="pub-cover-link" {...linkProps}>
          {cover}
        </a>
      ) : (
        <Link href={href} aria-label={title} className="pub-cover-link">
          {cover}
        </Link>
      )}
      <div className="pub-body">
        <div className="cluster ux4g-inline-gap-s">
          <span className="ux4g-tag-tonal-neutral ux4g-tag-s">{tagLabel}</span>
          <span className="t-micro text-muted">{badge}</span>
          {isNew && <span className="new-ribbon">New</span>}
        </div>
        {external ? (
          <a href={href} {...linkProps}>
            <h3 className="pub-title">{title}</h3>
          </a>
        ) : (
          <Link href={href}>
            <h3 className="pub-title">{title}</h3>
          </Link>
        )}
        <div className="pub-foot">
          {external ? (
            <a href={href} className="link-arrow t-small" {...linkProps}>
              Open <Icon name="external" size={16} />
            </a>
          ) : (
            <Link href={href} className="link-arrow t-small">
              View <Icon name="arrowRight" size={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

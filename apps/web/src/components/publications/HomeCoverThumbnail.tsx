/**
 * Homepage-only placeholder cover — a client-supplied thumbnail graphic,
 * self-hosted at public/img, sized via .cover-illustrated (see home.css).
 * Shared by both Working papers (real-scan fallback) and Reports (always-on,
 * see HomePublications.tsx) rather than duplicating the same markup twice.
 */
export function HomeCoverThumbnail({ src }: { src: string }) {
  return (
    <div className="cover cover-photo cover-illustrated">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" />
    </div>
  );
}

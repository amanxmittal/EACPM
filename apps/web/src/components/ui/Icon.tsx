import type { SVGProps } from "react";

// Lean inline-SVG icon set (feather-style, currentColor). Self-hosted, no icon font,
// no third-party CDN — keeps landing JS/CSS light. Decorative by default (aria-hidden).
const paths: Record<string, string> = {
  search: "M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0 M21 21l-4.3-4.3",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  close: "M6 6l12 12 M18 6l-12 12",
  arrowRight: "M5 12h14 M13 6l6 6-6 6",
  download: "M12 3v12 M7 10l5 5 5-5 M5 21h14",
  chevronDown: "M6 9l6 6 6-6",
  external: "M14 4h6v6 M20 4l-9 9 M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5",
  sun: "M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10 M12 1v2 M12 21v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M1 12h2 M21 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  contrast: "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M12 3v18",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  book: "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z M18 3v18",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6",
  chart: "M4 20V10 M10 20V4 M16 20v-8 M22 20H2",
  users: "M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8 M22 20v-2a4 4 0 0 0-3-3.9 M16 2.1a4 4 0 0 1 0 7.8",
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2A19 19 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.5 10.5a16 16 0 0 0 5 5l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z",
  mapPin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  rss: "M4 11a9 9 0 0 1 9 9 M4 4a16 16 0 0 1 16 16 M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  globe: "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M3 12h18 M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z",
  quote: "M7 7H4v6h3l-2 4h3l2-4V7z M17 7h-3v6h3l-2 4h3l2-4V7z",
  check: "M4 12l5 5L20 6",
  spark: "M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z",
  landmark: "M3 21h18 M5 21V11 M9 21V11 M15 21V11 M19 21V11 M12 3l8 5H4z",
  store: "M4 9l1.2-4.5h13.6L20 9 M5 9v11h14V9 M5 9h14 M9 20v-6h6v6",
  wallet: "M3 7a2 2 0 0 1 2-2h13v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M6 5V4a1 1 0 0 1 1-1h10 M16 12h3",
  cpu: "M7 7h10v10H7z M9 3v2 M15 3v2 M9 19v2 M15 19v2 M3 9h2 M3 15h2 M19 9h2 M19 15h2",
  play: "M7 4v16l13-8z",
};

type IconProps = SVGProps<SVGSVGElement> & { name: keyof typeof paths | string; size?: number; title?: string };

export function Icon({ name, size = 20, title, ...rest }: IconProps) {
  const d = paths[name] ?? "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {d.split(" M").map((seg, i) => (
        <path key={i} d={(i === 0 ? seg : "M" + seg).trim()} />
      ))}
    </svg>
  );
}

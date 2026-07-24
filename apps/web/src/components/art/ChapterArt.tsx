import type { ReactNode } from "react";

// Bespoke line-art illustrations, one per India-Story chapter. Consistent geometric
// system on UX4G tokens (indigo + gold), with a dot-grid backdrop. Server-rendered.

function Backdrop() {
  const dots: [number, number][] = [];
  for (let y = 30; y <= 330; y += 38) for (let x = 30; x <= 330; x += 38) dots.push([x, y]);
  return (
    <g aria-hidden>
      <g className="fill-subtle" opacity="0.22">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.5} />
        ))}
      </g>
      <g className="ink-gold" strokeWidth="1" opacity="0.25">
        <line x1="0" y1="300" x2="300" y2="0" />
        <line x1="60" y1="360" x2="360" y2="60" />
      </g>
    </g>
  );
}

const rays = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return [180 + Math.cos(a) * 44, 118 + Math.sin(a) * 44, 180 + Math.cos(a) * 58, 118 + Math.sin(a) * 58];
});

const art: Record<string, ReactNode> = {
  arthashastra: (
    <g strokeWidth="3">
      <rect className="fill-soft ink" x="108" y="120" width="144" height="120" rx="4" />
      <rect className="fill-surface ink" x="92" y="112" width="20" height="136" rx="10" />
      <rect className="fill-surface ink" x="248" y="112" width="20" height="136" rx="10" />
      <g className="ink-gold" strokeWidth="2.4">
        <line x1="126" y1="150" x2="234" y2="150" />
        <line x1="126" y1="168" x2="234" y2="168" />
        <line x1="126" y1="186" x2="210" y2="186" />
        <line x1="126" y1="204" x2="228" y2="204" />
      </g>
      <circle className="fill-gold-soft ink-gold" cx="180" cy="278" r="16" strokeWidth="2.6" />
      <path className="fill-gold" d="M180 268l3 7 7.5.4-5.8 4.6 2 7.2-6.7-4.2-6.7 4.2 2-7.2-5.8-4.6 7.5-.4z" />
    </g>
  ),
  zero: (
    <g>
      <circle className="fill-none ink-accent draw" cx="180" cy="172" r="80" strokeWidth="7" />
      <circle className="fill-soft" cx="180" cy="172" r="30" />
      <ellipse className="fill-none ink-muted" cx="180" cy="172" rx="122" ry="46" strokeWidth="1.6" opacity="0.55" strokeDasharray="3 7" />
      <circle className="fill-gold" cx="302" cy="172" r="7" />
      <circle className="fill-gold" cx="58" cy="172" r="7" />
      <circle className="fill-accent" cx="180" cy="290" r="6" />
      <circle className="fill-accent" cx="180" cy="54" r="6" />
    </g>
  ),
  trade: (
    <g strokeWidth="3">
      <g className="ink-accent" strokeWidth="2.6" opacity="0.7">
        <path className="fill-none" d="M56 252q20-14 40 0t40 0 40 0 40 0 44 0" />
        <path className="fill-none" d="M56 274q20-14 40 0t40 0 40 0 40 0 44 0" />
      </g>
      <path className="fill-soft ink" d="M108 232h144l-20 34a12 12 0 0 1-10 6H138a12 12 0 0 1-10-6z" />
      <line className="ink" x1="180" y1="232" x2="180" y2="92" />
      <path className="fill-gold-soft ink-gold" d="M182 100c42 20 56 68 42 112h-42z" />
      <path className="fill-none ink-gold" d="M172 114c-32 16-42 58-32 98h32z" />
      <path className="fill-gold" d="M300 86l3 8 8.5.5-6.5 5.4 2.2 8.3-7.2-4.7-7.2 4.7 2.2-8.3-6.5-5.4 8.5-.5z" />
    </g>
  ),
  rebuilding: (
    <g strokeWidth="3">
      <circle className="fill-gold-soft ink-gold" cx="180" cy="118" r="34" />
      <g className="ink-gold" strokeWidth="2.6">
        {rays.map((r, i) => (
          <line key={i} x1={r[0]} y1={r[1]} x2={r[2]} y2={r[3]} />
        ))}
      </g>
      <path className="fill-soft ink" d="M96 202h168l-18 86H114z" />
      <g className="ink-accent fill-none" strokeWidth="2.4" opacity="0.7">
        <path d="M120 226h122" />
        <path d="M124 248h114" />
        <path d="M128 268h106" />
      </g>
    </g>
  ),
  "1991": (
    <g>
      <g className="ink fill-none" strokeWidth="3" strokeDasharray="10 8">
        <line x1="58" y1="150" x2="162" y2="150" />
        <line x1="198" y1="150" x2="302" y2="150" />
      </g>
      <g className="ink-muted fill-none" strokeWidth="2.4" opacity="0.5">
        <path d="M92 300v-42h30v42M152 300v-72h30v72M212 300v-112h30v112" />
      </g>
      <path className="fill-none ink-accent draw" strokeWidth="7" d="M180 302V72" />
      <path className="fill-none ink-accent" strokeWidth="7" d="M150 110l30-38 30 38" />
      <g className="ink-gold" strokeWidth="2.8">
        <line x1="150" y1="148" x2="136" y2="136" />
        <line x1="210" y1="148" x2="224" y2="136" />
      </g>
    </g>
  ),
  services: (
    <g>
      <circle className="fill-soft ink" cx="180" cy="176" r="74" strokeWidth="3" />
      <g className="ink-accent fill-none" strokeWidth="2.2" opacity="0.85">
        <ellipse cx="180" cy="176" rx="30" ry="74" />
        <line x1="106" y1="176" x2="254" y2="176" />
        <path d="M122 140h116" />
        <path d="M122 212h116" />
      </g>
      <path className="fill-none ink-gold" strokeWidth="6" d="M92 140l-24 36 24 36" />
      <path className="fill-none ink-gold" strokeWidth="6" d="M268 140l24 36-24 36" />
    </g>
  ),
  dpi: (
    <g>
      <g className="ink-accent fill-none" strokeWidth="2.2" opacity="0.75">
        <line x1="90" y1="92" x2="176" y2="150" />
        <line x1="270" y1="92" x2="204" y2="150" />
        <line x1="82" y1="250" x2="150" y2="220" />
        <line x1="284" y1="250" x2="212" y2="220" />
      </g>
      <g className="fill-gold">
        <circle cx="90" cy="92" r="7" />
        <circle cx="270" cy="92" r="7" />
        <circle cx="82" cy="250" r="7" />
        <circle cx="284" cy="250" r="7" />
      </g>
      <rect className="fill-surface ink" x="146" y="118" width="68" height="144" rx="13" strokeWidth="3" />
      <rect className="fill-soft" x="156" y="138" width="48" height="88" rx="4" />
      <g className="fill-accent">
        <rect x="164" y="148" width="12" height="12" rx="2" />
        <rect x="184" y="148" width="12" height="12" rx="2" />
        <rect x="164" y="168" width="12" height="12" rx="2" />
        <rect x="184" y="190" width="12" height="12" rx="2" />
        <rect x="164" y="196" width="12" height="6" rx="2" />
      </g>
      <line className="ink" strokeWidth="3" x1="172" y1="248" x2="188" y2="248" />
    </g>
  ),
  intelligence: (
    <g>
      <g className="ink-accent fill-none" strokeWidth="2.1" opacity="0.85">
        <line x1="96" y1="96" x2="180" y2="150" />
        <line x1="180" y1="96" x2="180" y2="150" />
        <line x1="264" y1="96" x2="180" y2="150" />
        <line x1="96" y1="96" x2="180" y2="96" />
        <line x1="180" y1="96" x2="264" y2="96" />
      </g>
      <g className="fill-gold">
        <circle cx="96" cy="96" r="8" />
        <circle cx="180" cy="96" r="8" />
        <circle cx="264" cy="96" r="8" />
      </g>
      <circle className="fill-accent" cx="180" cy="150" r="9" />
      <rect className="fill-soft ink" x="140" y="196" width="80" height="80" rx="8" strokeWidth="3" />
      <rect className="fill-none ink-muted" x="158" y="214" width="44" height="44" rx="4" strokeWidth="2.2" />
      <g className="ink" strokeWidth="3">
        <line x1="140" y1="216" x2="126" y2="216" />
        <line x1="140" y1="236" x2="126" y2="236" />
        <line x1="140" y1="256" x2="126" y2="256" />
        <line x1="220" y1="216" x2="234" y2="216" />
        <line x1="220" y1="236" x2="234" y2="236" />
        <line x1="220" y1="256" x2="234" y2="256" />
        <line x1="164" y1="196" x2="164" y2="182" />
        <line x1="196" y1="196" x2="196" y2="182" />
      </g>
    </g>
  ),
};

export function ChapterArt({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 360 360" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <Backdrop />
      {art[id] ?? art.zero}
    </svg>
  );
}

import type { CSSProperties } from "react";

// Deterministic generative sparkline field — a "living landscape of data".
// Server-rendered (no Math.random → SSR-safe); motion is pure CSS (art.css).
function rnd(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function SparklineField({ cols = 7, rows = 5 }: { cols?: number; rows?: number }) {
  const W = 1200;
  const H = 720;
  const cellW = W / cols;
  const cellH = H / rows;
  const n = 9;

  const sparks: { d: string; cx: number; cy: number; color: string; delay: number }[] = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = r * 37 + c * 7 + 1;
      const padX = cellW * 0.12;
      const w = cellW - padX * 2;
      const amp = cellH * 0.3 * (0.6 + rnd(seed) * 0.7);
      const baseY = r * cellH + cellH * 0.62;
      const x0 = c * cellW + padX;
      const growth = 0.5 + rnd(seed + 2) * 0.9;

      const pts: [number, number][] = [];
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        const y = baseY + amp * 0.4 - t * amp * growth - Math.sin(t * Math.PI * 1.8 + seed) * amp * 0.32;
        pts.push([x0 + t * w, y]);
      }
      let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const [px, py] = pts[i - 1];
        const [x, y] = pts[i];
        d += ` Q${px.toFixed(1)} ${py.toFixed(1)} ${((px + x) / 2).toFixed(1)} ${((py + y) / 2).toFixed(1)}`;
      }
      const goldPct = Math.round((c / (cols - 1)) * 100);
      const color = `color-mix(in srgb, var(--app-gold) ${goldPct}%, var(--cat-1))`;
      const delay = (c * 0.05 + r * 0.09).toFixed(2);
      const last = pts[pts.length - 1];
      sparks.push({ d, cx: last[0], cy: last[1], color, delay: Number(delay) });
      idx++;
    }
  }

  return (
    <svg className="sparkfield" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      {sparks.map((s, i) => (
        <path key={i} d={s.d} style={{ stroke: s.color, "--d": `${s.delay}s` } as CSSProperties} />
      ))}
      {sparks.map((s, i) => (
        <circle key={`d${i}`} className="dot" cx={s.cx.toFixed(1)} cy={s.cy.toFixed(1)} r={3.4} style={{ fill: s.color, "--d": `${s.delay}s` } as CSSProperties} />
      ))}
    </svg>
  );
}

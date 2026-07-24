"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

type Annotation = { index: number; label: string; kind?: "peak" | "trough" };
type EventMark = { index: number; label: string };

export function AnimatedAreaChart({
  labels,
  points,
  color = "var(--cat-1)",
  yUnit = "",
  height = 340,
  annotations = [],
  events = [],
  ariaSummary,
  caption,
  decimals = 1,
  suffix,
}: {
  labels: string[];
  points: number[];
  color?: string;
  yUnit?: string;
  height?: number;
  annotations?: Annotation[];
  events?: EventMark[];
  ariaSummary: string;
  caption?: string;
  decimals?: number;
  suffix?: string;
}) {
  const gid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  const W = 760;
  const H = height;
  const m = { top: 26, right: 20, bottom: 34, left: 44 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const pad = (max - min) * 0.15 || 1;
  const lo = Math.min(0, Math.floor(min - pad));
  const hi = Math.ceil(max + pad);
  const range = hi - lo || 1;
  const x = (i: number) => m.left + (i / (labels.length - 1)) * iw;
  const y = (v: number) => m.top + (1 - (v - lo) / range) * ih;

  const line = points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(labels.length - 1).toFixed(1)} ${m.top + ih} L${x(0).toFixed(1)} ${m.top + ih} Z`;
  const ticks = [0, 1, 2, 3, 4].map((i) => lo + (range * i) / 4);
  const suf = suffix ?? yUnit;
  const p10 = 10 ** decimals;
  const fmt = (n: number) => `${Math.round(n * p10) / p10}${suf}`;

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scale = rect.width / W;
    const sx = (e.clientX - rect.left) / scale;
    const i = Math.round(((sx - m.left) / iw) * (labels.length - 1));
    setHover(Math.max(0, Math.min(labels.length - 1, i)));
  }

  const lineStyle: CSSProperties = armed
    ? { stroke: color, strokeDasharray: 2400, strokeDashoffset: shown ? 0 : 2400 }
    : { stroke: color };
  const scalePct = (v: number) => `${(v / W) * 100}%`;

  return (
    <figure className="chart-wrap" style={{ margin: 0 }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={ariaSummary}
        style={{ display: "block", overflow: "visible", touchAction: "none" }}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`g${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {ticks.map((v, i) => (
          <g key={i}>
            <line x1={m.left} x2={W - m.right} y1={y(v)} y2={y(v)} style={{ stroke: "var(--app-border)" }} />
            <text x={m.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" style={{ fill: "var(--app-text-subtle)" }}>
              {Math.round(v)}
              {yUnit}
            </text>
          </g>
        ))}
        {labels.map((l, i) => (
          <text key={l + i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" style={{ fill: "var(--app-text-subtle)" }}>
            {l}
          </text>
        ))}

        {/* event reference lines */}
        {events.map((ev) => (
          <g key={ev.index}>
            <line x1={x(ev.index)} x2={x(ev.index)} y1={m.top - 6} y2={m.top + ih} style={{ stroke: "var(--app-gold)" }} strokeDasharray="4 4" opacity="0.7" />
            <text x={x(ev.index)} y={m.top - 10} textAnchor="middle" fontSize="10" style={{ fill: "var(--app-gold)", fontWeight: 700, letterSpacing: "0.04em" }}>
              {ev.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* area + line */}
        <path className="chart-area" d={area} fill={`url(#g${gid})`} style={{ opacity: armed && !shown ? 0 : 1 }} />
        <path className={`chart-line${armed ? " draw-on" : ""}`} d={line} style={lineStyle} />

        {/* annotations */}
        {annotations.map((a) => {
          const ay = y(points[a.index]);
          const above = a.kind !== "trough";
          return (
            <g key={a.index}>
              <circle cx={x(a.index)} cy={ay} r="4.5" style={{ fill: "var(--app-bg)", stroke: color }} strokeWidth="2.5" />
              <text x={x(a.index)} y={above ? ay - 12 : ay + 20} textAnchor="middle" fontSize="11" style={{ fill: "var(--app-text)", fontWeight: 600 }}>
                {a.label}
              </text>
            </g>
          );
        })}

        {/* hover crosshair + dot */}
        {hover !== null && (
          <g>
            <line className="chart-crosshair" x1={x(hover)} x2={x(hover)} y1={m.top} y2={m.top + ih} />
            <circle cx={x(hover)} cy={y(points[hover])} r="5" style={{ fill: color }} />
          </g>
        )}
      </svg>

      {/* HTML tooltip */}
      {hover !== null && (
        <div className="chart-tip" style={{ left: scalePct(x(hover)), top: `calc(${(y(points[hover]) / H) * 100}% )` }}>
          <div className="text-muted" style={{ fontSize: "0.72rem" }}>
            {labels[hover]}
          </div>
          <div className="tv" style={{ color: "var(--app-text)" }}>
            {fmt(points[hover])}
          </div>
        </div>
      )}

      {caption && (
        <figcaption className="t-micro text-muted" style={{ marginTop: "0.7rem" }}>
          {caption}
        </figcaption>
      )}

      <table className="sr-only">
        <caption>{ariaSummary}</caption>
        <thead>
          <tr>
            <th>Period</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((l, i) => (
            <tr key={l + i}>
              <th scope="row">{l}</th>
              <td>{fmt(points[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

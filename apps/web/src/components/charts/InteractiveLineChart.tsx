"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export type LineSeries = { label: string; color: string; values: number[] };

const TOOLTIP_WIDTH_ESTIMATE = 180;
const VIEWPORT_MARGIN = 12;

/**
 * Interactive multi-series line chart — inline SVG (no external chart lib;
 * UX4G ships none, CLAUDE.md §9.1), token-coloured. Hover any x-position to
 * see every series' value at that point, via invisible per-column hit-areas
 * (avoids doing pixel↔SVG coordinate math for mouse events).
 *
 * The tooltip renders through a portal to <body> and is positioned with
 * `position: fixed` from the hovered column's actual on-screen rect —
 * needed because the chart's card ancestor clips overflow (for the
 * fixed-height cards), which would otherwise cut the tooltip off at the
 * card edge instead of letting it float above everything.
 */
export function InteractiveLineChart({
  labels,
  series,
  width = 640,
  height = 280,
  maxValue,
  valueSuffix = "%",
}: {
  labels: string[];
  series: LineSeries[];
  width?: number;
  height?: number;
  maxValue?: number;
  valueSuffix?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const max = maxValue ?? Math.max(...series.flatMap((s) => s.values)) * 1.15;
  const pad = { top: 16, right: 16, bottom: 28, left: 16 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const colW = chartW / labels.length;

  const xAt = (i: number) => pad.left + (labels.length === 1 ? colW / 2 : (i / (labels.length - 1)) * chartW);
  const yAt = (v: number) => pad.top + chartH - (v / max) * chartH;

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  function handleEnter(i: number, e: React.MouseEvent<SVGRectElement>) {
    setHover(i);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(
      Math.max(rect.left + rect.width / 2, VIEWPORT_MARGIN + TOOLTIP_WIDTH_ESTIMATE / 2),
      window.innerWidth - VIEWPORT_MARGIN - TOOLTIP_WIDTH_ESTIMATE / 2,
    );
    setTooltipPos({ x, y: rect.top });
  }

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" role="img" aria-label={`Line chart of ${series.map((s) => s.label).join(", ")} across ${labels.join(", ")}`}>
        {gridLines.map((t) => {
          const y = pad.top + chartH * (1 - t);
          return <line key={t} x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="var(--app-border)" strokeWidth="1" />;
        })}

        {series.map((s) => {
          const d = s.values.map((v, i) => `${i ? "L" : "M"}${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`).join(" ");
          return (
            <g key={s.label}>
              <path d={d} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={hover === null ? 1 : 0.35} style={{ transition: "opacity .15s ease" }} />
              {s.values.map((v, i) => (
                <circle
                  key={i}
                  cx={xAt(i)}
                  cy={yAt(v)}
                  r={hover === i ? 5 : 3.5}
                  fill={s.color}
                  style={{ transition: "r .15s ease" }}
                />
              ))}
            </g>
          );
        })}

        {labels.map((label, i) => (
          <text key={label} x={xAt(i)} y={height - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill={hover === i ? "var(--app-text)" : "var(--app-text-muted)"}>
            {label}
          </text>
        ))}

        {hover !== null && (
          <line x1={xAt(hover)} x2={xAt(hover)} y1={pad.top} y2={pad.top + chartH} stroke="var(--app-accent)" strokeWidth="1" strokeDasharray="3 3" />
        )}

        {/* Invisible per-column hit areas — hover state only, no coordinate math needed */}
        {labels.map((_, i) => (
          <rect
            key={i}
            x={pad.left + i * colW}
            y={0}
            width={colW}
            height={height}
            fill="transparent"
            onMouseEnter={(e) => handleEnter(i, e)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </svg>

      {hover !== null &&
        tooltipPos &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="line-chart-tooltip"
            style={{
              position: "fixed",
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: "translate(-50%, calc(-100% - 10px))",
            }}
          >
            <div className="line-chart-tooltip-title">{labels[hover]}</div>
            {series.map((s) => (
              <div key={s.label} className="line-chart-tooltip-row">
                <span className="line-chart-tooltip-swatch" style={{ background: s.color }} aria-hidden />
                {s.label}: <strong>{s.values[hover]}{valueSuffix}</strong>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

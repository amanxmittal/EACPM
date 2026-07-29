// The national flag — tricolour with a 24-spoke Ashoka Chakra. Used in the GoI identity strip.
export function FlagIndia({ width = 26 }: { width?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg
      width={width}
      height={(width * 2) / 3}
      viewBox="0 0 36 24"
      role="img"
      aria-label="Flag of India"
      className="ux4g-d-block ux4g-flex-none"
      style={{ borderRadius: 3, boxShadow: "0 0 0 1px rgba(0,0,0,.14)" }}
    >
      <rect width="36" height="8" fill="#FF9933" />
      <rect y="8" width="36" height="8" fill="#ffffff" />
      <rect y="16" width="36" height="8" fill="#138808" />
      <g transform="translate(18 12)" stroke="#0a0a8a">
        <circle r="3.3" fill="none" strokeWidth="0.7" />
        <circle r="0.85" fill="#0a0a8a" stroke="none" />
        {spokes.map((d, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2="-3.3" strokeWidth="0.3" transform={`rotate(${d})`} />
        ))}
      </g>
    </svg>
  );
}

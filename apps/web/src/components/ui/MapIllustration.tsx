// Decorative stand-in for the real map embed (loaded on click, once the map
// service is wired up — see contact/page.tsx). An abstract street layout, not
// a literal geographic rendering, so it carries no boundary-accuracy concerns.
export function MapIllustration() {
  return (
    <svg viewBox="0 0 400 175" className="map-illo" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="175" className="map-illo-bg" />
      <g className="map-illo-blocks">
        <rect x="24" y="20" width="70" height="46" />
        <rect x="24" y="96" width="46" height="58" />
        <rect x="114" y="18" width="52" height="30" />
        <rect x="252" y="24" width="60" height="70" />
        <rect x="330" y="20" width="46" height="40" />
        <rect x="196" y="110" width="64" height="46" />
        <rect x="330" y="100" width="48" height="54" />
      </g>
      <g className="map-illo-roads">
        <path d="M0 68 H400" />
        <path d="M0 158 H190" />
        <path d="M280 158 H400" />
        <path d="M108 0 V175" />
        <path d="M240 0 V90" />
        <path d="M240 118 V175" />
        <path d="M320 0 V175" />
      </g>
      <path d="M0 132 C 90 100, 150 150, 400 108" className="map-illo-avenue" />
      <circle cx="240" cy="104" r="16" className="map-illo-pin-halo" />
      <path
        d="M240 78c-10 0-18 8-18 18 0 13 18 30 18 30s18-17 18-30c0-10-8-18-18-18z"
        className="map-illo-pin"
      />
      <circle cx="240" cy="95" r="6" className="map-illo-pin-dot" />
    </svg>
  );
}

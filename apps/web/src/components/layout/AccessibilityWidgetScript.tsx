"use client";

import Script from "next/script";

// The UX4G widget wires its actual click handlers inside a `DOMContentLoaded`
// listener, expecting a plain page load. Loaded this late (lazyOnload, for perf),
// that event already fired once and never fires again, so the registration is dead
// on arrival and every control looks clickable but does nothing. Re-firing it here
// (after the widget's own script has run and registered its listener) wakes that
// wiring up. `onLoad` requires a Client Component, hence this wrapper.
export function AccessibilityWidgetScript() {
  return (
    <Script
      src="https://cdn.ux4g.gov.in/accessibility-v3.26/accessibility-widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: true }));
      }}
    />
  );
}

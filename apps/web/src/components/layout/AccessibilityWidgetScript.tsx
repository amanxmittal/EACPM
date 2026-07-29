"use client";

import Script from "next/script";

// The UX4G widget assigns *positive* tabindex values (1, 1, 2, 4, 5, …) to ~19 of its own
// controls. Per the HTML spec any positive tabindex jumps ahead of natural document order,
// so those controls hijacked the first ~19 tab stops on every page — pushing our own
// "Skip to main content" link, which must come first to be useful, to roughly the 20th.
// That defeats WCAG 2.4.1 (Bypass Blocks) for exactly the keyboard-only users the widget
// claims to serve.
//
// Rewriting them to tabindex="0" keeps every control reachable and in its natural DOM
// position, while restoring document order for the rest of the page. We do NOT strip the
// attribute outright: some of these are non-native elements (div/span) that would stop
// being focusable at all without it.
//
// Runs after the widget mounts, then keeps watching — the widget rebuilds parts of its
// panel on open/close and re-applies the attribute to freshly created nodes.
function normalisePositiveTabindex(root: ParentNode = document) {
  for (const el of root.querySelectorAll<HTMLElement>('[tabindex]')) {
    const value = Number(el.getAttribute("tabindex"));
    if (Number.isFinite(value) && value > 0) el.setAttribute("tabindex", "0");
  }
}

export function AccessibilityWidgetScript() {
  return (
    <Script
      src="https://cdn.ux4g.gov.in/accessibility-v3.26/accessibility-widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        // The widget wires its click handlers inside a `DOMContentLoaded` listener,
        // expecting a plain page load. Loaded this late (lazyOnload, for perf), that event
        // already fired once and never fires again, so the registration is dead on arrival
        // and every control looks clickable but does nothing. Re-firing it here (after the
        // widget's own script has run and registered its listener) wakes that wiring up.
        document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: true }));

        normalisePositiveTabindex();
        const observer = new MutationObserver((records) => {
          for (const record of records) {
            if (record.type === "attributes" && record.target instanceof HTMLElement) {
              const value = Number(record.target.getAttribute("tabindex"));
              if (Number.isFinite(value) && value > 0) record.target.setAttribute("tabindex", "0");
            }
            for (const node of record.addedNodes) {
              if (node instanceof HTMLElement) normalisePositiveTabindex(node);
            }
          }
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["tabindex"],
        });
      }}
    />
  );
}

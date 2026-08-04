"use client";
import { useEffect, useRef, useState } from "react";
import { MemberAvatar } from "@/components/ui/MemberAvatar";
import type { Member } from "@/content/team";

const PAGE_SIZE = 4;
const AUTO_ADVANCE_MS = 3000;

/**
 * Team rail — cards are sized to exactly 5 per view (see .team-rail-card),
 * so nothing is ever half-cut at the container edge; still hand-scrollable,
 * but also auto-pages forward by 4 cards every 3s, wrapping back to the
 * start once it reaches the end. Paused on hover/focus so a reader mid-scan
 * isn't yanked forward, and disabled under prefers-reduced-motion.
 */
export function TeamRail({ members }: { members: Member[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (reduced || paused || members.length <= PAGE_SIZE) return;
    const id = setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      const cardW = rail.firstElementChild instanceof HTMLElement ? rail.firstElementChild.getBoundingClientRect().width : 0;
      const gap = parseFloat(getComputedStyle(rail).columnGap || "0");
      const step = (cardW + gap) * PAGE_SIZE;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1;
      rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + step, behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduced, paused, members.length]);

  return (
    // The member cards hold no links or buttons, so nothing inside the rail can take
    // focus — without tabindex a keyboard user cannot scroll it at all. Making the
    // container itself focusable restores arrow-key scrolling, and role+label give
    // screen-reader users something to land on and identify. Focusing it also trips
    // onFocusCapture below, so tabbing in pauses the auto-advance.
    <div
      ref={railRef}
      className="rail"
      tabIndex={0}
      role="region"
      aria-label="Team members"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {members.map((m) => (
        <div key={m.slug} className="card member team-rail-card">
          <MemberAvatar member={m} />
          <div>
            <h3>{m.name}</h3>
            <p className="text-muted t-small">
              {m.affiliation} · {m.designation ?? "designation pending"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

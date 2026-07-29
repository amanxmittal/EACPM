# Fact-check queue

Every unverified claim, figure, name, date or URL on the site is tracked here until an
EAC-PM owner confirms it. Nothing in this queue may ship as fact — the page must show a
placeholder or a "pending" state until the row is signed off.

Per [`CLAUDE.md`](../CLAUDE.md) §2.2 the fallback is always a placeholder, never a guess.
Fact-check owner and turnaround are still open (§9, Q5).

| ID | Item | Where | What we need | Status | Owner |
|---|---|---|---|---|---|
| FC-001 | EAC-PM official social handles + URLs (X, LinkedIn, YouTube) | Homepage "Connect with EAC-PM" section; `apps/web/src/content/channels.ts` | The Council's **verified** account names and canonical URLs for each platform, and confirmation of which platforms EAC-PM actually operates. Not guessed: linking a GoI site to an unofficial or parody account is worse than a disabled link. Cards render a "pending confirmation" chip until supplied. | 🔴 Open | EAC-PM (TBD, Q5) |

## How to close a row

1. Get written confirmation from the EAC-PM owner (not a search result, not an inference).
2. Update the source of truth (the content file named in "Where").
3. Move the row to **Resolved** below with the date and who confirmed it.

## Resolved

_None yet._

// The India Story — chapter spine (PROMPT.md §7). Prose is editorial framing.
// Any embedded figure is marked illustrative and must clear the FACTCHECK gate before publish.
export type Chapter = {
  id: string;
  era: string;
  title: string;
  dek: string;
  evidence: string; // shown in the "evidence" drawer; sourced or flagged
};

export const chapters: Chapter[] = [
  {
    id: "arthashastra",
    era: "c. 300 BCE",
    title: "Foundations of statecraft & political economy",
    dek: "Kautilya's Arthashastra codified taxation, treasury, trade regulation and famine policy. Indus Valley weights and seals were an early trade-standards regime.",
    evidence: "Primary text: Arthashastra. Indus standardisation: archaeological record. {{ FACT-CHECK: dates & attributions }}",
  },
  {
    id: "zero",
    era: "628 CE",
    title: "The mathematics that finance runs on",
    dek: "Place-value notation and the formal rules of zero (Brahmagupta) — the arithmetic substrate of accounting, interest and, ultimately, computation.",
    evidence: "Brahmagupta, Brāhmasphuṭasiddhānta (628 CE). Transmission via Arabic scholarship into European commerce. {{ FACT-CHECK }}",
  },
  {
    id: "trade",
    era: "1–1700 CE",
    title: "Trade and the pre-modern world economy",
    dek: "Indian Ocean networks in textiles, spices and steel. India's share of world output in the pre-industrial era is a contested estimate — presented as such.",
    evidence: "Maddison Project — historical estimate, not an official figure. Methodological caveat stated on-page. {{ FACT-CHECK: share-of-GDP }}",
  },
  {
    id: "rebuilding",
    era: "1947–1990",
    title: "Disruption and rebuilding",
    dek: "The post-1947 project of building an economy: planning, institution-building, the Green Revolution and Operation Flood.",
    evidence: "Peer-reviewed economic history. Handled factually and soberly. {{ FACT-CHECK }}",
  },
  {
    id: "1991",
    era: "1991",
    title: "The inflection",
    dek: "Liberalisation, and what three decades of compounding did to output, poverty and the middle class.",
    evidence: "RBI / MoSPI series. {{ FACT-CHECK: growth & poverty figures }}",
  },
  {
    id: "services",
    era: "1991–2015",
    title: "The world's back office → front office",
    dek: "The IT-services era, Global Capability Centres and an engineering talent base that moved up the value chain.",
    evidence: "NASSCOM / MoSPI. {{ FACT-CHECK }}",
  },
  {
    id: "dpi",
    era: "2009–present",
    title: "Digital Public Infrastructure — India's most exported idea",
    dek: "Aadhaar, UPI, DigiLocker, CoWIN, Account Aggregator, ONDC, GSTN — population-scale, interoperable, publicly-governed rails.",
    evidence: "UIDAI / NPCI / MeitY. Adoption abroad and India's G20 agenda. {{ FACT-CHECK: volumes }}",
  },
  {
    id: "intelligence",
    era: "2023→",
    title: "The intelligence era",
    dek: "IndiaAI Mission, Bhashini and Indic-language models, semiconductor and electronics missions. Sanskrit → zero → digital rails → LLMs.",
    evidence: "MeitY / IndiaAI. {{ FACT-CHECK }}",
  },
];

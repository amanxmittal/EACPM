// ⚠️ ILLUSTRATIVE DATA — MVP only. These numbers are placeholders for layout and are
// rendered with a visible "illustrative / pending verification" badge. No figure here is
// to be treated as an official statistic. Real values will carry source + period +
// last-updated and pass the FACTCHECK gate (PROMPT.md §7, §15).
export type Indicator = {
  key: string;
  label: string;
  value: string;
  unit?: string;
  deltaLabel?: string;
  direction?: "up" | "down" | "flat";
  period: string;
  source: string;
  spark: number[]; // illustrative shape only
};

export const indicators: Indicator[] = [
  {
    key: "gdp",
    label: "Real GDP growth",
    value: "6.5",
    unit: "%",
    deltaLabel: "annual",
    direction: "up",
    period: "FY (illustrative)",
    source: "MoSPI — pending verification",
    spark: [5.8, 6.1, 7.2, 8.7, 7.6, 6.9, 6.5],
  },
  {
    key: "cpi",
    label: "CPI inflation",
    value: "4.8",
    unit: "%",
    deltaLabel: "within band",
    direction: "down",
    period: "monthly (illustrative)",
    source: "MoSPI — pending verification",
    spark: [6.8, 6.1, 5.7, 5.5, 5.1, 4.9, 4.8],
  },
  {
    key: "upi",
    label: "UPI transactions",
    value: "18.4",
    unit: "bn/mo",
    deltaLabel: "record",
    direction: "up",
    period: "monthly (illustrative)",
    source: "NPCI — pending verification",
    spark: [8.7, 10.2, 11.4, 13.1, 14.9, 16.6, 18.4],
  },
  {
    key: "reserves",
    label: "Forex reserves",
    value: "690",
    unit: "$ bn",
    deltaLabel: "stable",
    direction: "flat",
    period: "weekly (illustrative)",
    source: "RBI — pending verification",
    spark: [575, 598, 616, 642, 655, 678, 690],
  },
];

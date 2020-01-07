export const BARCHARTFILTERS = [
  {
    id: "earnings",
    label: "Earnings",
    short: "Earnings",
    filters: [
      {
        id: "year",
        label: "Year",
        short: "Year",
        filters: [
          { id: "y1", label: "One Year After Discharge", short: "One" },
          { id: "y5", label: "Five Years After Discharge", short: "Five" },
          { id: "y10", label: "Ten Years After Discharge", short: "Ten" }
        ]
      },
      {
        id: "percentile",
        label: "Percentile",
        short: "Percentile",
        filters: [
          { id: "p25", label: "Twenty-Fifth Percentile", short: "25%" },
          { id: "p50", label: "Fiftieth Percentile  ", short: "50%" },
          { id: "p75", label: "Seventy-Fifth Percentile", short: "75%" }
        ]
      }
    ]
  },
  { id: "emp", label: "Employment Status Count", short: "Emp" },
  { id: "nonemp", label: "Nonemployment Status Count", short: "Nonemp" }
];

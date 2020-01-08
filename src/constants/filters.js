export const BARCHARTFILTERS = [
  {
    id: "earnings",
    label: "Earnings",
    short: "Earnings",
    filters: [
      {
        id: "percentile",
        label: "Percentile",
        short: "Percentile",
        filters: [
          {
            id: "p25",
            label: "Twenty-Fifth Percentile",
            short: "25%",
            default: false
          },
          {
            id: "p50",
            label: "Fiftieth Percentile  ",
            short: "50%",
            default: true
          },
          {
            id: "p75",
            label: "Seventy-Fifth Percentile",
            short: "75%",
            default: false
          }
        ],
        default: true
      },
      {
        id: "year",
        label: "Year",
        short: "Year",
        filters: [
          {
            id: "y1",
            label: "One Year After Discharge",
            short: "One",
            default: false
          },
          {
            id: "y5",
            label: "Five Years After Discharge",
            short: "Five",
            default: true
          },
          {
            id: "y10",
            label: "Ten Years After Discharge",
            short: "Ten",
            default: false
          }
        ],
        default: false
      }
    ],
    default: true
  },
  { id: "emp", label: "Employment Status Count", short: "Emp", default: false },
  {
    id: "nonemp",
    label: "Nonemployment Status Count",
    short: "Nonemp",
    default: false
  }
];

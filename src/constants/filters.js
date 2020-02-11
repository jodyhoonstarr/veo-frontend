export const BARCHARTFILTERS = {
  id: "type",
  label: "Data Type",
  filters: [
    {
      id: "earnings",
      label: "Earnings for Employed Veterans",
      short: "Earnings",
      filters: [
        {
          id: "percentile",
          label: "Earnings Percentiles",
          short: "Percentile",
          filters: [
            {
              id: "p25",
              label: "25th Percentile",
              short: "25%",
              default: false,
              color: "#bae4bc"
            },
            {
              id: "p50",
              label: "50th Percentile  ",
              short: "50%",
              default: true,
              color: "#7bccc4"
            },
            {
              id: "p75",
              label: "75th Percentile",
              short: "75%",
              default: false,
              color: "#2b8cbe"
            }
          ],
          default: true
        },
        {
          id: "year",
          label: "Years Post Discharge",
          short: "Year",
          filters: [
            {
              id: "y1",
              label: "1-Year After Discharge",
              short: "1",
              default: false,
              color: "#c2e699"
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5",
              default: true,
              color: "#78c679"
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10",
              default: false,
              color: "#238443"
            }
          ],
          default: false
        }
      ],
      default: true
    },
    {
      id: "counts",
      label: "Counts of Employed Veterans",
      short: "Counts",
      filters: [
        {
          id: "year",
          label: "Years Post Discharge",
          short: "Year",
          filters: [
            {
              id: "y1",
              label: "1-Year After Discharge",
              short: "1",
              default: false,
              color: "#c2e699"
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5",
              default: true,
              color: "#78c679"
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10",
              default: false,
              color: "#238443"
            }
          ],
          default: false
        }
      ],
      default: false
    }
  ]
};

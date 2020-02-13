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
              color: "#6baed6"
            },
            {
              id: "p50",
              label: "50th Percentile  ",
              short: "50%",
              default: true,
              color: "#4690C6"
            },
            {
              id: "p75",
              label: "75th Percentile",
              short: "75%",
              default: false,
              color: "#2171b5"
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
              color: "#67a9cf"
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5",
              default: true,
              color: "#3595AD"
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10",
              default: false,
              color: "#02818a"
            }
          ],
          default: false
        }
      ],
      default: true,
      color: "#195083"
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
      default: false,
      color: "#1A594A"
    }
  ]
};

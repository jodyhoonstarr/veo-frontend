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
              color: "#588eaf"
            },
            {
              id: "p50",
              label: "50th Percentile  ",
              short: "50%",
              default: true,
              color: "#39739c"
            },
            {
              id: "p75",
              label: "75th Percentile",
              short: "75%",
              default: false,
              color: "#1b619a"
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
              color: "#588db0"
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5",
              default: true,
              color: "#2c7a8f"
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10",
              default: false,
              color: "#026972"
            }
          ],
          default: false
        }
      ],
      default: true,
      color: "#195083"
    },
    {
      id: "countsemp",
      label: "Count of Employed Veterans",
      short: "Employed",
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
              color: "#85a067"
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5",
              default: true,
              color: "#558e56"
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10",
              default: false,
              color: "#155028"
            }
          ],
          default: false
        }
      ],
      default: false,
      color: "#1A594A"
    },
    {
      id: "countsnonemp",
      label: "Count of Non-employed or Marginally Employed Veterans",
      short: "N.M.E.",
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
              color: "#fd8d3c"
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5",
              default: true,
              color: "#e6550d"
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10",
              default: false,
              color: "#ae400a"
            }
          ],
          default: false
        }
      ],
      default: false,
      color: "#a63603"
    }
  ]
};

export const BARCHARTFILTERS = {
  label: "Data Type",
  filters: [
    {
      id: "earnings",
      label: "Earnings for Employed Veterans",
      short: "Earnings",
      icon: "mdi-currency-usd",
      filters: [
        {
          id: "percentile",
          label: "Earnings Percentile",
          short: "Percentile",
          icon: "mdi-percent",
          filters: [
            {
              id: "p25",
              label: "25th Percentile",
              short: "25%",
              default: false
            },
            {
              id: "p50",
              label: "50th Percentile  ",
              short: "50%",
              default: false
            },
            {
              id: "p75",
              label: "75th Percentile",
              short: "75%",
              default: false
            },
            {
              id: "pall",
              label: "All Percentiles",
              short: "All",
              default: true
            }
          ],
          default: true
        },
        {
          id: "year",
          label: "Years Post Discharge",
          short: "Year",
          icon: "mdi-av-timer",
          filters: [
            {
              id: "y1",
              label: "1-Year After Discharge",
              short: "1-Year",
              default: false
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5-Years",
              default: true
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10-Years",
              default: false
            },
            {
              id: "yall",
              label: "All Years After Discharge",
              short: "All Years",
              default: false
            }
          ],
          default: false
        }
      ],
      default: true
    },
    {
      id: "count",
      label: "Count of Employed Veterans",
      short: "Count",
      icon: "mdi-account-multiple",
      filters: [
        {
          id: "year",
          label: "Years Post Discharge",
          short: "Year",
          icon: "mdi-av-timer",
          filters: [
            {
              id: "y1",
              label: "1-Year After Discharge",
              short: "1-Year",
              default: false
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5-Years",
              default: false
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10-Years",
              default: false
            },
            {
              id: "yall",
              label: "All Years After Discharge",
              short: "All Years",
              default: true
            }
          ],
          default: false
        }
      ],
      default: false
    }
  ]
};

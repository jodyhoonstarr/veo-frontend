export const BARCHARTFILTERS = {
  label: "Data Type",
  filters: [
    {
      id: "earnings",
      label: "Earnings for Employed Veterans",
      short: "Earnings",
      filters: [
        {
          id: "percentile",
          label: "Earnings Percentile",
          short: "Percentile",
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
              default: true
            },
            {
              id: "p75",
              label: "75th Percentile",
              short: "75%",
              default: false
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
            }
          ],
          default: false
        }
      ],
      default: false
    }
  ]
};

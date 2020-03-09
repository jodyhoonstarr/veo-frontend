export const FILTERS = {
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
          label: "Percentiles",
          short: "Percentile",
          filters: [
            {
              id: "p25",
              label: "25th Percentile",
              short: "25%",
              default: false,
              color: "#588eaf",
              linestyle: "dotted"
            },
            {
              id: "p50",
              label: "50th Percentile  ",
              short: "50%",
              default: true,
              color: "#39739c",
              linestyle: "solid"
            },
            {
              id: "p75",
              label: "75th Percentile",
              short: "75%",
              default: false,
              color: "#1b619a",
              linestyle: "dashed"
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
              default: true,
              color: "#588db0",
              linestyle: "dotted"
            },
            {
              id: "y5",
              label: "5-Years After Discharge",
              short: "5",
              default: false,
              color: "#2c7a8f",
              linestyle: "solid"
            },
            {
              id: "y10",
              label: "10-Years After Discharge",
              short: "10",
              default: false,
              color: "#026972",
              linestyle: "dashed"
            }
          ],
          default: false
        }
      ],
      default: true,
      color: "#39739c",
      linestyle: "solid"
    },
    {
      id: "counts",
      label: "Counts of Veterans",
      short: "Counts",
      filters: [
        {
          id: "emp",
          label: "Employed Veterans",
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
                  default: true,
                  color: "#85a067",
                  linestyle: "dotted"
                },
                {
                  id: "y5",
                  label: "5-Years After Discharge",
                  short: "5",
                  default: false,
                  color: "#558e56",
                  linestyle: "solid"
                },
                {
                  id: "y10",
                  label: "10-Years After Discharge",
                  short: "10",
                  default: false,
                  color: "#155028",
                  linestyle: "dashed"
                }
              ],
              default: false
            }
          ],
          default: true,
          color: "#558e56",
          linestyle: "solid"
        },
        {
          id: "nonemp",
          label: "Nonemployed (or Marginally Employed) Veterans",

          short: "Nonemployed",
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
                  default: true,
                  color: "#fd8d3c",
                  linestyle: "dotted"
                },
                {
                  id: "y5",
                  label: "5-Years After Discharge",
                  short: "5",
                  default: false,
                  color: "#e6550d",
                  linestyle: "solid"
                },
                {
                  id: "y10",
                  label: "10-Years After Discharge",
                  short: "10",
                  default: false,
                  color: "#ae400a",
                  linestyle: "dashed"
                }
              ],
              default: false
            }
          ],
          default: false,
          color: "#e6550d",
          linestyle: "dashed"
        }
      ],
      default: false,
      color: "#ffca11",
      linestyle: "solid"
    }
  ]
};

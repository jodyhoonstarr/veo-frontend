<template>
  <div>
    <h1 class="text-center">This is the Race/Ethnicity page</h1>
  </div>
</template>

<script>
export default {
  name: "RaceEthnicity",
  data() {
    return {
      races: [
        { id: "A1", label: "White Alone" },
        { id: "A2", label: "Black or African American Alone" },
        { id: "A3", label: "American Indian or Alaska Native Alone" },
        { id: "A4", label: "Asian Alone" },
        { id: "A5", label: "Native Hawaiian or Other Pacific Islander Alone" },
        { id: "A6", label: "Some Other Race Alone (Not Used)" },
        { id: "A7", label: "Two or More Race Groups" }
      ],
      ethnicities: [
        { id: "A1", label: "Not Hispanic or Latino" },
        { id: "A2", label: "Hispanic or Latino" }
      ],
      cohorts: [
        { id: "2000", label: "2000-2001" },
        { id: "2002", label: "2002-2003" },
        { id: "2004", label: "2004-2005" },
        { id: "2006", label: "2006-2007" },
        { id: "2008", label: "2008-2009" },
        { id: "2010", label: "2010-2011" },
        { id: "2012", label: "2012-2013" },
        { id: "2014", label: "2014-2015" }
      ]
    };
  }
};
</script>

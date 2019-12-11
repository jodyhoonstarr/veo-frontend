<template>
  <div>
    <h1 class="text-center">This is the Education page</h1>
  </div>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      education: [
        { id: "F1", label: "General educational development (GED) test" },
        { id: "F2", label: "High school graduate" },
        { id: "F3", label: "Some college or higher" }
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

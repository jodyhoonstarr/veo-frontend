<template>
  <div class="text-center">
    <h1>AFQT</h1>
    <h3 class="font-weight-light">Armed Forces Qualification Test</h3>
    <select-bar>
      <v-col cols="12" xs="12" sm="9">
        <DropDown label="AFQT" :items="AFQTScores" v-model="selectedAFQTScores" multiple clearable></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown label="Cohort" :items="cohorts" v-model="selectedCohort"></DropDown>
      </v-col>
    </select-bar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";

export default {
  name: "AFQT",
  components: {
    SelectBar,
    DropDown
  },
  data() {
    return {
      selectedAFQTScores: [],
      selectedCohort: [],
      cohorts: [
        { id: "2000", label: "2000-2001" },
        { id: "2002", label: "2002-2003" },
        { id: "2004", label: "2004-2005" },
        { id: "2006", label: "2006-2007" },
        { id: "2008", label: "2008-2009" },
        { id: "2010", label: "2010-2011" },
        { id: "2012", label: "2012-2013" },
        { id: "2014", label: "2014-2015" }
      ],
      AFQTScores: [
        { id: "A1", label: "0-33" },
        { id: "A2", label: "34-66" },
        { id: "A3", label: "67-100" }
      ]
    };
  }
};
</script>

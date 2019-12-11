<template>
  <div class="text-center">
    <h1>AFQT</h1>
    <h3 class="font-weight-light">Armed Forces Qualification Test</h3>
    <select-bar>
      <v-col cols="12" xs="12" sm="9">
        <DropDown
          label="AFQT"
          hint="Score tercile"
          :items="AFQTScores"
          v-model="selectedAFQTScores"
          multiple
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown
          label="Cohort"
          hint="Year of discharge"
          :items="cohorts"
          v-model="selectedCohorts"
        ></DropDown>
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
      // todo data binding
      selectedAFQTScores: [],
      selectedCohorts: [],
      cohorts: ["2000-2001", "2002-2003", "2004-2005"],
      AFQTScores: [
        { id: "A1", label: "0-33" },
        { id: "A2", label: "34-66" },
        { id: "A3", label: "67-100" }
      ]
    };
  }
};
</script>

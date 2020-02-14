<template>
  <div>
    <h1 class="text-center">This is the Race/Ethnicity page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="5">
        <DropDown
          label="Race"
          :items="races"
          v-model="selectedRace"
          multiple
          close
          clearable
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <DropDown
          label="Ethnicity"
          :items="ethnicities"
          v-model="selectedEthnicity"
          multiple
          close
          clearable
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown
          label="Cohort"
          :items="cohorts"
          v-model="selectedCohort"
        ></DropDown>
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";

export default {
  name: "RaceEthnicity",
  components: {
    SelectBar,
    DropDown
  },
  data() {
    return {
      selectedRace: null,
      selectedEthnicity: null,
      selectedCohort: null,
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

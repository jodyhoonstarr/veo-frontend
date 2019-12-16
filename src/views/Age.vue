<template>
  <div>
    <h1 class="text-center">This is a the Age page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="9">
        <DropDown
          label="Age Groups"
          hint="Range"
          :items="ageGroups"
          v-model="selectedAgeGroup"
          multiple
          close
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown label="Cohort" hint="Year of discharge" :items="cohorts" v-model="selectedCohort"></DropDown>
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";

export default {
  name: "Age",
  components: {
    SelectBar,
    DropDown
  },
  data() {
    return {
      selectedAgeGroup: null,
      selectedCohort: null,
      ageGroups: [{ id: "E01", label: "<25" }, { id: "E02", label: "25+" }],
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

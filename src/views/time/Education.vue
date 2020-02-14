<template>
  <div>
    <h1 class="text-center">This is the Education page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="9">
        <DropDown
          label="Education"
          :items="educationLevel"
          v-model="selectedEducationLevel"
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
  name: "Education",
  components: {
    SelectBar,
    DropDown
  },
  data() {
    return {
      selectedEducationLevel: null,
      selectedCohort: null,
      educationLevel: [
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

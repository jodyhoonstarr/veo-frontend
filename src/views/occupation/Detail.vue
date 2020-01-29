<template>
  <div>
    <h1 class="text-center">This is the Detailed Occupation page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="9">
        <GetData url="/metadata/label_dod_occ_code_detailed.json">
          <DetailDropDown
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
            v-model="selectedOccupations"
            :clearable="true"
            :multiple="true"
            close
          ></DetailDropDown>
        </GetData>
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
import DetailDropDown from "@/components/DetailDropDown.vue";
import GetData from "@/components/GetData";

export default {
  name: "DetailedOccupation",
  components: {
    SelectBar,
    DropDown,
    DetailDropDown,
    GetData
  },
  data() {
    return {
      selectedOccupations: [],
      selectedCohort: [],
      cohorts: [
        { id: "2000", label: "2000-2007" },
        { id: "2008", label: "2008-2015" }
      ]
    };
  }
};
</script>

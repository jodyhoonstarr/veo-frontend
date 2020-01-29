<template>
  <div>
    <h1 class="text-center">This is the Detailed Occupation page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="6">
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
      <v-col cols="12" xs="12" sm="6">
        <GetData url="/metadata/label_8year_cohorts.json">
          <DropDown
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            :items="response"
            propname="labels"
            v-model="selectedCohort"
          ></DropDown>
        </GetData>
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
      selectedCohort: []
    };
  }
};
</script>

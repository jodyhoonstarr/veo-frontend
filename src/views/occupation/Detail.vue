<template>
  <div>
    <h1 class="text-center">This is the Detailed Occupation page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="6">
        <GetData url="/metadata/label_dod_occ_code_detailed.json">
          <DropDownwRadio
            :detailed="true"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
            id="occupation"
            :toggle="activeToggle === 'occupation'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <GetData url="/metadata/label_8year_cohorts.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            id="cohort"
            :items="response"
            propname="labels"
            :toggle="activeToggle === 'cohort'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";
import GetData from "@/components/GetData";
import DropDownwRadio from "@/components/DropDownwRadio";

export default {
  name: "DetailedOccupation",
  components: {
    SelectBar,
    DropDown,
    DropDownwRadio,
    GetData
  },
  data() {
    return {
      activeToggle: "occupation",
      occupation: null,
      selectedCohort: []
    };
  },
  methods: {
    handleDropDownToggle: function(data) {
      this[data.id] = data.selected;
      if (data.toggle) {
        this.activeToggle = data.id;
      }
    }
  }
};
</script>

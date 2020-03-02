<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="8" class="pb-0">
        <GetData url="/metadata/label_afqtgrp.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
            id="occupation"
            :toggle="activeToggle === 'afqt'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData url="/metadata/label_2year_cohorts.json">
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
import DropDownwRadio from "@/components/DropDownwRadio";
import GetData from "@/components/GetData";

export default {
  name: "AFQT",
  components: {
    SelectBar,
    DropDownwRadio,
    GetData
  },
  data() {
    return {
      activeToggle: "afqt"
    };
  },
  methods: {
    handleDropDownToggle: function(f) {
      console.log(f);
    }
  }
};
</script>

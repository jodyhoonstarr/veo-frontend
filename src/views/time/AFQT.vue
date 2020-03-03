<template>
  <SelectBar>
    <v-col cols="12" xs="12" sm="4" class="pb-0">
      <GetData url="/metadata/label_afqtgrp.json">
        <DropDownNoRadio
          slot-scope="{ response, loading }"
          :loading="loading"
          label="AFQT"
          :items="response"
          propname="labels"
          id="afqt"
        ></DropDownNoRadio>
      </GetData>
    </v-col>
    <v-col cols="12" xs="12" sm="8" class="pb-0">
      <GetData url="/metadata/label_2year_cohorts.json">
        <cohort-slider
          slot-scope="{ response, loading }"
          :loading="loading"
          :items="response"
          v-model="cohorts"
        ></cohort-slider>
      </GetData>
    </v-col>
  </SelectBar>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import GetData from "@/components/GetData";
import DropDownNoRadio from "@/components/DropDownNoRadio";
import CohortSlider from "@/components/CohortSlider";

export default {
  name: "AFQT",
  components: {
    DropDownNoRadio,
    SelectBar,
    GetData,
    CohortSlider
  },
  data() {
    return {
      selected: null,
      cohorts: null
    };
  }
};
</script>

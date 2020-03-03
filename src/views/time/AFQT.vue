<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="8" class="pb-0">
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
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <!--        <GetData url="/metadata/label_2year_cohorts.json">-->
        <!--          <DropDown-->
        <!--            slot-scope="{ response, loading }"-->
        <!--            :loading="loading"-->
        <!--            label="Cohort"-->
        <!--            id="cohort"-->
        <!--            :items="response"-->
        <!--            propname="labels"-->
        <!--            :toggle="activeToggle === 'cohort'"-->
        <!--            @change="handleDropDownToggle"-->
        <!--          ></DropDown>-->
        <!--        </GetData>-->
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import GetData from "@/components/GetData";
import DropDownNoRadio from "@/components/DropDownNoRadio";

export default {
  name: "AFQT",
  components: {
    DropDownNoRadio,
    SelectBar,
    GetData
  },
  data() {
    return {
      activeToggle: "afqt",
      selected: null
    };
  }
};
</script>

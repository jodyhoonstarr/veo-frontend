<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="6" class="pb-0">
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
      <v-col cols="12" xs="12" sm="6" class="pb-0">
        <v-range-slider
          :tick-labels="seasons"
          :value="[0, 1]"
          min="0"
          max="3"
          ticks="always"
          tick-size="4"
        >
          <template v-slot:thumb-label="props">
            <v-icon dark>
              {{ season(props.value) }}
            </v-icon>
          </template>
        </v-range-slider>
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
      selected: null,
      seasons: ["Winter", "Spring", "Summer", "Fall"],
      icons: ["mdi-snowflake", "mdi-leaf", "mdi-fire", "mdi-water"]
    };
  },
  methods: {
    season(val) {
      return this.icons[val];
    }
  }
};
</script>

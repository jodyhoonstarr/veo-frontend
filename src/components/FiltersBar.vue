<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" class="text-left text-no-wrap pa-0">
        <v-card-subtitle class="pa-0">
          Data:
          <ChartFilters @change="(f) => { dataTypeFilter = f }" :filters="filters"></ChartFilters>
        </v-card-subtitle>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="text-left text-no-wrap pa-0">
        <v-card-subtitle v-if="isEarnings" class="pa-0">
          View:
          <ChartFilters
            v-if="dataTypeFilter"
            @change="(f) => { dataTypeSubFilter = f }"
            :filters="dataTypeFilter.filters"
          ></ChartFilters>:
          <ChartFilters
            v-if="dataTypeSubFilter"
            @change="(f) => { dataCut = f }"
            :filters="dataTypeSubFilter.filters"
          ></ChartFilters>
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { BARCHARTFILTERS } from "@/constants/filters";
import ChartFilters from "@/components/ChartFilters.vue";

export default {
  name: "FiltersBar",
  components: { ChartFilters },
  data() {
    return {
      filters: BARCHARTFILTERS,
      dataTypeFilter: null,
      dataTypeSubFilter: null,
      dataCut: null
    };
  },
  computed: {
    isEarnings: function() {
      return this.dataTypeFilter && this.dataTypeFilter.id == "earnings";
    }
  }
};
</script>

<style>
</style>

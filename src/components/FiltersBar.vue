<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" class="text-left text-no-wrap py-0">
        <v-card-subtitle class="pa-0">
          Data:
          <ChartFilters @change="updateFilter" :filters="filters"></ChartFilters>
        </v-card-subtitle>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="text-left text-no-wrap py-0">
        <v-card-subtitle v-if="isEarnings" class="pa-0">
          View:
          <ChartFilters
            v-if="data.filter"
            @change="(f) => { data.subFilter = f; emit_event() }"
            :filters="data.filter.filters"
          ></ChartFilters>:
          <ChartFilters
            v-if="data.subFilter"
            @change="(f) => { data.cut = f; emit_event() }"
            :filters="data.subFilter.filters"
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
      data: {
        filter: null,
        subFilter: null,
        cut: null
      }
    };
  },
  computed: {
    isEarnings: function() {
      return this.data.filter && this.data.filter.id == "earnings";
    }
  },
  methods: {
    emit_event: function() {
      console.log("custom event");
      this.$emit("change", this.data);
    },
    updateFilter: function(filter) {
      this.data.filter = filter;
      this.data.subFilter = null;
      this.data.cut = null;
      this.emit_event();
    }
  }
};
</script>

<style>
</style>

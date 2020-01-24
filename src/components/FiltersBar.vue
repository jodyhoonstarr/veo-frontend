<template>
  <v-toolbar class="px-0 pt-0 pb-2">
    <v-container fluid class="px-0 text-xs-center text-sm-right">
      <ChartFilters
        @change="handleDataTypeFilter"
        :id="constantFilters.id"
        :filters="constantFilters.filters"
        :heading="constantFilters.label"
      ></ChartFilters>
      <template v-if="dataType && dataType.hasOwnProperty('filters')">
        <template v-for="(filter, idx) in dataType.filters">
          <ChartFilters
            v-if="
              allCategory === filter.id || (allCategory == null && idx === 0)
            "
            :id="filter.id"
            :value="filter.filters"
            :filters="filter.filters"
            :heading="filter.label"
            :select-all="true"
            @change="handleFilter"
          ></ChartFilters>
          <ChartFilters
            v-else
            :id="filter.id"
            :filters="filter.filters"
            :heading="filter.label"
            :select-all="true"
            @change="handleFilter"
          >
          </ChartFilters>
        </template>
      </template>
    </v-container>
  </v-toolbar>
</template>

<script>
import { BARCHARTFILTERS } from "@/constants/filters";
import ChartFilters from "@/components/ChartFilters.vue";

export default {
  name: "FiltersBar",
  components: { ChartFilters },
  data() {
    return {
      constantFilters: BARCHARTFILTERS,
      dataType: null,
      dataFilters: {
        year: null,
        percentile: null
      },
      allCategory: null
    };
  },
  methods: {
    emit_event: function() {
      this.$emit("change", { type: this.dataType, filters: this.dataFilters });
    },
    handleDataTypeFilter: function(f) {
      this.dataType = f.selected;
      this.dataFilters.percentile = null;
      this.dataFilters.year = null;
      this.allCategory = null;
    },
    handleFilter: function(f) {
      if (Array.isArray(f.selected)) {
        this.allCategory = f.id;
      }
      this.dataFilters[f.id] = f.selected;
      this.emit_event();
    }
  }
};
</script>

<style></style>

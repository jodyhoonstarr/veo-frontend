<template>
  <v-container class="py-0">
    <v-row>
      <v-col cols="12" xs="12" sm="4">
        <ChartFilters
          @change="handleDataTypeFilter"
          :id="constantFilters.id"
          :filters="constantFilters.filters"
          :label="constantFilters.label"
        ></ChartFilters>
      </v-col>

      <template v-if="dataType && dataType.hasOwnProperty('filters')">
        <template v-for="(filter, idx) in dataType.filters">
          <v-col cols="12" xs="12" sm="4">
            <ChartFilters
              :id="filter.id"
              :filters="filter.filters"
              :label="filter.label"
              :multiple="true"
              @change="handleFilter"
            >
            </ChartFilters>
          </v-col>
        </template>
      </template>
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

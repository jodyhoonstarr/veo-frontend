<template>
  <v-container class="py-0">
    <v-row>
      <v-col cols="12" xs="12" sm="4">
        <ChartFilters
          @change="handleDataTypeFilter"
          :id="constantFilters.id"
          :filters="constantFilters.filters"
          :label="constantFilters.label"
          :value="dataType"
        ></ChartFilters>
      </v-col>

      <template v-if="dataType && dataType.hasOwnProperty('filters')">
        <template v-for="filter in dataType.filters">
          <v-col cols="12" xs="12" sm="4">
            <ChartFilters
              :id="filter.id"
              :filters="filter.filters"
              :label="filter.label"
              :multiple="true"
              :value="dataFilters[filter.id]"
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
      testProp: null,
      allCategory: null
    };
  },
  methods: {
    emitEvent: function() {
      this.$emit("change", { type: this.dataType, filters: this.dataFilters });
    },
    handleDataTypeFilter: function(f) {
      this.dataType = f.selected;
      if (this.dataType.id === "earnings") {
        this.setAllPercentiles(); // toggle all percentiles
        this.dataFilters.year = null; // allow component to select default year
      } else {
        this.dataFilters.percentile = null;
        this.setAllYears();
      }
      this.allCategory = null;
    },
    setAllPercentiles: function() {
      this.dataFilters.percentile = this.constantFilters.filters[0].filters[0].filters;
    },
    setAllYears: function() {
      this.dataFilters.year = this.constantFilters.filters[0].filters[1].filters;
    },
    handleFilter: function(f) {
      if (Array.isArray(f.selected)) {
        this.allCategory = f.id;
      }
      this.dataFilters[f.id] = f.selected;

      // if this change is an array, null out the other filters
      // so that their default values can be chosen
      let changeFlag = false;
      Object.keys(this.dataFilters).forEach(key => {
        const prop = this.dataFilters[key];
        if (
          Array.isArray(prop) &&
          Array.isArray(f.selected) &&
          prop.length > 1 &&
          f.selected.length > 1 &&
          f.id !== key
        ) {
          this.dataFilters[key] = null;
        }
      });

      // if the other events weren't nulled then emit event
      // otherwise setting the null events above should trigger
      // an event that bubbles back to this function
      if (!changeFlag) {
        this.emitEvent();
      }
    }
  },
  mounted() {
    this.dataType = this.constantFilters.filters[0];
    this.setAllPercentiles();
  }
};
</script>

<style></style>

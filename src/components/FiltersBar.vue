<template>
  <v-container class="py-0">
    <v-row>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <ChartFilters
          @change="handleDataTypeFilter"
          :id="constantFilters.id"
          :showChips="constantFilters.id === colorCategory"
          :filters="constantFilters.filters"
          :label="constantFilters.label"
          :value="dataType"
          :multiple="true"
        ></ChartFilters>
      </v-col>

      <template
        v-if="
          dataType != null &&
            Array.isArray(dataType) &&
            dataType[0] != null &&
            dataType[0].hasOwnProperty('filters') &&
            dataType[0].filters != null
        "
      >
        <template v-for="filter in dataType[0].filters">
          <v-col cols="12" xs="12" sm="4" class="pb-0">
            <ChartFilters
              :id="filter.id"
              :showChips="filter.id === colorCategory"
              :filters="filter.filters"
              :label="filter.label"
              :multiple="!compareCounts"
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
      colorCategory: null
    };
  },
  methods: {
    emitEvent: function() {
      this.$emit("change", {
        type: this.dataType,
        filters: this.dataFilters,
        colors: this.colors
      });
    },
    handleDataTypeFilter: function(f) {
      this.dataType = f.selected;
      // first check is whether there are multiple datatype filters
      if (Array.isArray(this.dataType) && this.dataType.length > 1) {
        this.dataFilters.percentile = null;
        this.dataFilters.year = null;
      } else if (this.dataType[0].id === "earnings") {
        this.setAllPercentiles(); // toggle all percentiles
        this.dataFilters.year = null; // allow component to select default year
      } else if (
        this.dataType[0].id === "emp" ||
        this.dataType[0].id === "nonemp"
      ) {
        this.dataFilters.percentile = null;
        this.setAllYears();
      } else {
        this.dataFilters.percentile = null;
        this.dataFilters.year = null;
      }
      this.emitEvent();
    },
    setAllPercentiles: function() {
      if (this.dataType[0] != null && this.dataType[0].filters != null) {
        const percentileFilters = this.dataType[0].filters.find(
          o => o.id === "percentile"
        ).filters;
        this.dataFilters.percentile = percentileFilters;
      }
    },
    setAllYears: function() {
      if (this.dataType[0] != null && this.dataType[0].filters != null) {
        const yearFilters = this.dataType[0].filters.find(o => o.id === "year")
          .filters;
        this.dataFilters.year = yearFilters;
      }
    },
    handleFilter: function(f) {
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
          changeFlag = true;
        }
      });

      // if the other events weren't nulled then emit event
      // otherwise setting the null events above should trigger
      // an event that bubbles back to this function
      if (!changeFlag) {
        this.emitEvent();
      }
    },
    isArraywMultiple: function(o) {
      return o != null && Array.isArray(o) && o.length > 1;
    }
  },
  mounted() {
    this.dataType = this.constantFilters.filters[0];
    this.setAllPercentiles();
  },
  computed: {
    colors: function() {
      if (this.dataType == null) {
        return null;
      } else {
        if (this.isArraywMultiple(this.dataType)) {
          // if the datatype count/nme option is primary and displaying chips
          let returnObject = {};
          this.dataType.map(f => (returnObject[f.id] = f.color));
          this.colorCategory = "type";
          return returnObject;
        } else if (this.isArraywMultiple(this.dataFilters.percentile)) {
          // if the percentile selection is primary and displaying chips
          let returnObject = {};
          this.dataFilters.percentile.map(f => (returnObject[f.id] = f.color));
          this.colorCategory = "percentile";
          return returnObject;
        } else if (this.isArraywMultiple(this.dataFilters.year)) {
          // if the years selection is primary and displaying chips
          let returnObject = {};
          this.dataFilters.year.map(f => (returnObject[f.id] = f.color));
          this.colorCategory = "year";
          return returnObject;
        } else if (this.dataType[0] != null) {
          // otherwise
          let returnObject = {};
          const firstEntry = this.dataType[0];
          returnObject[firstEntry.id] = firstEntry.color;
          this.colorCategory = "type";
          return returnObject;
        }
      }
    },
    compareCounts: function() {
      if (
        this.colorCategory === "type" &&
        Array.isArray(this.dataType) &&
        this.dataType.length > 1
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    colors: function() {
      this.emitEvent();
    }
  }
};
</script>

<style></style>

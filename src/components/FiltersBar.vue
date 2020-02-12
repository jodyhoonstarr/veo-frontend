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
        ></ChartFilters>
      </v-col>

      <template v-if="dataType && dataType.hasOwnProperty('filters')">
        <template v-for="filter in dataType.filters">
          <v-col cols="12" xs="12" sm="4" class="pb-0">
            <ChartFilters
              :id="filter.id"
              :showChips="filter.id === colorCategory"
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
      allCategory: null,
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
      if (this.isArraywMultiple(this.dataFilters.percentile)) {
        let returnObject = {};
        this.dataFilters.percentile.map(f => (returnObject[f.id] = f.color));
        this.colorCategory = "percentile";
        return returnObject;
      } else if (this.isArraywMultiple(this.dataFilters.year)) {
        let returnObject = {};
        this.dataFilters.year.map(f => (returnObject[f.id] = f.color));
        this.colorCategory = "year";
        return returnObject;
      } else {
        let returnObject = {};
        returnObject[this.dataType.id] = "primary";
        this.colorCategory = "type";
        return returnObject;
      }
    }
  }
};
</script>

<style></style>

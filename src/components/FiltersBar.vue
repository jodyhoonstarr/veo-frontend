<template>
  <v-container class="py-0">
    <v-row>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <ChartFilters
          v-if="primaryFilters"
          :id="primaryFilters.id"
          :label="primaryFilters.label"
          :chart-type="chartType"
          :filters="primaryFilters.filters"
          :showChips="primaryFilters.id === colorCategory"
          @change="handlePrimaryFilter"
        ></ChartFilters>
      </v-col>

      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <ChartFilters
          v-if="secondaryFilters"
          :id="secondaryFilters.id"
          :label="secondaryFilters.label"
          :chart-type="chartType"
          :filters="secondaryFilters.filters"
          :showChips="secondaryFilters.id === colorCategory"
          @change="handleSecondaryFilter"
        ></ChartFilters>
      </v-col>

      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <ChartFilters
          v-if="tertiaryFilters"
          :id="tertiaryFilters.id"
          :label="tertiaryFilters.label"
          :chart-type="chartType"
          :filters="tertiaryFilters.filters"
          :showChips="tertiaryFilters.id === colorCategory"
          @change="handleTertiaryFilter"
        ></ChartFilters>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FILTERS } from "@/constants/filters";
import ChartFilters from "@/components/ChartFilters.vue";

export default {
  name: "FiltersBar",
  components: { ChartFilters },
  props: {
    chartType: {
      type: String,
      required: true,
      validator: val => ["bar", "line"].includes(val)
    }
  },
  data() {
    return {
      primaryFilters: FILTERS,
      secondaryFilters: null,
      tertiaryFilters: null,
      colorCategory: null
    };
  },
  methods: {
    validateSelected(o) {
      if (
        !o ||
        !o.hasOwnProperty("selected") ||
        !Array.isArray(o.selected) ||
        !o.selected.length >= 1
      ) {
        return;
      }
      return o.selected[0];
    },
    handlePrimaryFilter: function(o) {
      const selected = this.validateSelected(o);
      if (
        selected &&
        selected.id === "earnings" &&
        Array.isArray(selected.filters) &&
        selected.filters.length === 2
      ) {
        // if the primary filter is earnings
        // set the primary and secondary filters
        this.secondaryFilters = selected.filters[0];
        this.tertiaryFilters = selected.filters[1];
      } else if (
        selected &&
        selected.id === "counts" &&
        Array.isArray(selected.filters)
      ) {
        // if the primary filter is counts
        // set secondary and hand off tertiary to handleSecondaryFilter
        this.secondaryFilters = selected;
        this.tertiaryFilters = null;
      }
    },
    handleSecondaryFilter: function(o) {
      // handle the secondary filter if counts is selected
      // else it's handled by the primary
      if (o.id === "counts") {
        const selected = this.validateSelected(o);
        if (selected && Array.isArray(selected.filters)) {
          this.tertiaryFilters = selected.filters[0];
        }
      }
    },
    handleTertiaryFilter: function() {}
  }

  // computed: {
  //   colors: function() {
  //     if (this.dataType == null) {
  //       return null;
  //     } else {
  //       if (this.isArraywMultiple(this.dataFilters.percentile)) {
  //         // if the percentile selection is primary and displaying chips
  //         let returnObject = {};
  //         this.dataFilters.percentile.map(f => (returnObject[f.id] = f.color));
  //         this.colorCategory = "percentile";
  //         return returnObject;
  //       } else if (this.isArraywMultiple(this.dataFilters.year)) {
  //         // if the years selection is primary and displaying chips
  //         let returnObject = {};
  //         this.dataFilters.year.map(f => (returnObject[f.id] = f.color));
  //         this.colorCategory = "year";
  //         return returnObject;
  //       }
  //     }
  //   }
  // },
  // watch: {
  //   colors: function() {
  //     this.emitEvent();
  //   }
  // }
};
</script>

<style></style>

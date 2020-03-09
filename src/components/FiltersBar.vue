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
          :value="primaryValue"
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
          :multiple="true"
          :value="secondaryValue"
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
          :multiple="true"
          :value="tertiaryValue"
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
      primaryValue: null,
      secondaryFilters: null,
      secondaryValue: null,
      tertiaryFilters: null,
      tertiaryValue: null,
      colorCategory: null
    };
  },
  methods: {
    emitEvent: function() {
      if (
        this.primaryValue != null &&
        this.secondaryValue != null &&
        this.tertiaryValue != null &&
        this.colors != null
      ) {
        this.$emit("change", {
          filters: [this.primaryValue, this.secondaryValue, this.tertiaryValue],
          color: this.colors
        });
      }
    },
    validateSelected: function(o) {
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
      if (selected != null) {
        // since the property is validated, keep the full return
        this.primaryValue = o.selected;
        this.secondaryValue = null;
        this.tertiaryValue = null;
      }

      // take the selection object and pass it down to the secondary filter
      if (
        selected &&
        selected.id === "earnings" &&
        Array.isArray(selected.filters) &&
        selected.filters.length === 2
      ) {
        // if the primary filter is earnings
        // set the primary and secondary filters
        this.secondaryFilters = selected.filters.find(
          o => o.id === "percentile"
        );
        this.tertiaryFilters = selected.filters.find(o => o.id === "year");
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

      // set the secondary default selections
      this.setSecondaryDefaults();
    },
    handleSecondaryFilter: function(o) {
      const selected = this.validateSelected(o);
      if (selected != null) {
        this.secondaryValue = o.selected;
        if (this.secondaryValue === this.secondaryFilters.filters) {
          this.colorCategory = this.secondaryFilters.id;
          this.tertiaryValue = null;
        }
      }
      // set the tertiary filter if counts data
      // else it's set by the primary
      if (o.id === "counts") {
        if (selected && Array.isArray(selected.filters)) {
          this.tertiaryFilters = selected.filters.find(o => o.id === "year");
        }
      }
    },
    handleTertiaryFilter: function(o) {
      const selected = this.validateSelected(o);
      if (selected != null) {
        this.tertiaryValue = o.selected;
        if (this.tertiaryValue === this.tertiaryFilters.filters) {
          this.colorCategory = this.tertiaryFilters.id;
          this.secondaryValue = null;
        }
      }
    },
    setDefaultColorCategory: function() {
      if (
        Array.isArray(this.secondaryValue) &&
        this.secondaryValue.length === 1 &&
        Array.isArray(this.tertiaryValue) &&
        this.tertiaryValue.length === 1
      ) {
        // earnings can be colored but all else must default to secondary group
        if (
          Array.isArray(this.primaryValue) &&
          this.primaryValue.length >= 1 &&
          this.primaryValue[0].id === "earnings"
        ) {
          this.colorCategory = this.primaryFilters.id;
        } else if (this.secondaryFilters != null) {
          this.colorCategory = this.secondaryFilters.id;
        } else {
          this.colorCategory = null;
        }
      }
    },
    setSecondaryDefaults: function() {
      if (
        this.secondaryFilters != null &&
        Array.isArray(this.secondaryFilters.filters) &&
        this.secondaryFilters.filters.length > 0
      ) {
        this.secondaryValue = this.secondaryFilters.filters;
        this.colorCategory = this.secondaryFilters.id;
      } else {
        this.secondaryValue = null;
      }
    }
  },
  watch: {
    secondaryValue: function() {
      this.setDefaultColorCategory();

      // if no tertiary filter is set for the counts data, set the first one
      if (
        this.tertiaryFilters == null &&
        this.secondaryFilters != null &&
        this.secondaryValue != null &&
        this.secondaryFilters.id === "counts" &&
        Array.isArray(this.secondaryValue) &&
        this.secondaryValue.length > 1
      ) {
        this.tertiaryFilters = this.secondaryValue[0].filters.find(
          o => o.id === "year"
        );
      }

      // if the type is a count and only one secondary is selected
      // set the color grouping to be all tertiary
      if (
        this.secondaryFilters &&
        this.secondaryFilters.id === "counts" &&
        Array.isArray(this.secondaryValue) &&
        this.secondaryValue.length === 1
      ) {
        this.tertiaryValue = this.tertiaryFilters.filters;
        this.colorCategory = this.tertiaryFilters.id;
      }
      this.emitEvent();
    },
    tertiaryValue: function() {
      this.setDefaultColorCategory();
      this.emitEvent();
    }
  },
  computed: {
    colors: function() {
      if (this.colorCategory == null) {
        return null;
      }
      let results;
      if (this.colorCategory === "type") {
        results = this.primaryValue;
      } else if (
        this.colorCategory === "percentile" ||
        this.colorCategory === "counts"
      ) {
        results = this.secondaryValue;
      } else if (this.colorCategory === "year") {
        results = this.tertiaryValue;
      }

      let returnObj = {};
      results.map(o => (returnObj[o.id] = o.color));
      return returnObj;
    }
  }
};
</script>

<style></style>

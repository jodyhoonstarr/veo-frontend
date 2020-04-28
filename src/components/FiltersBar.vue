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
          :show-chips="primaryFilters.id === colorCategory"
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
          :show-chips="secondaryFilters.id === colorCategory"
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
          :show-chips="tertiaryFilters.id === colorCategory"
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
    },
    initialValues: {
      type: Object,
      default: function() {
        return { primary: null, secondary: null, tertiary: null };
      },
      validator: function(obj) {
        return (
          obj.hasOwnProperty("primary") &&
          obj.hasOwnProperty("secondary") &&
          obj.hasOwnProperty("tertiary")
        );
      }
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
        this.colors != null &&
        this.linestyles != null
      ) {
        this.$emit("change", {
          primary: this.primaryValue,
          secondary: this.secondaryValue,
          tertiary: this.tertiaryValue,
          colors: this.colors,
          linestyles: this.linestyles
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

          // if the 3rd dropdown is now set to the "all" category, aka > 1
          // and the 2nd dropdown was previously the all, aka > 1
          // reset the secondary group and let it default
          if (
            Array.isArray(this.tertiaryValue) &&
            this.tertiaryValue.length > 1 &&
            Array.isArray(this.secondaryValue) &&
            this.secondaryValue.length > 1
          ) {
            this.secondaryValue = null;
          }
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
      // if a bar chart is used,
      // and the data type is earnings
      // set the secondary default to show "all"
      // otherwise default to what's defined in the properties
      if (
        this.chartType === "bar" &&
        this.primaryValue[0].id !== "counts" &&
        this.secondaryFilters != null &&
        Array.isArray(this.secondaryFilters.filters) &&
        this.secondaryFilters.filters.length > 0
      ) {
        this.secondaryValue = this.secondaryFilters.filters;
        this.colorCategory = this.secondaryFilters.id;
      } else {
        this.secondaryValue = null;
      }
    },
    setTertiaryDefaults: function() {
      // for a bar chart
      // if the type is a count and only one secondary is selected
      // set the color grouping to be all tertiary
      if (
        this.chartType === "bar" &&
        this.secondaryFilters != null &&
        this.secondaryFilters.id === "counts" &&
        Array.isArray(this.secondaryValue) &&
        this.secondaryValue.length === 1
      ) {
        this.tertiaryValue = this.tertiaryFilters.filters;
        this.colorCategory = this.tertiaryFilters.id;
      }
    },
    getActive: function(prop) {
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
      results.map(o => (returnObj[o.id] = o[prop]));
      return returnObj;
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

      this.setTertiaryDefaults();
      this.emitEvent();
    },
    tertiaryValue: function() {
      this.setDefaultColorCategory();
      this.emitEvent();
    }
  },
  computed: {
    colors: function() {
      return this.getActive("color");
    },
    linestyles: function() {
      return this.getActive("linestyle");
    }
  },
  mounted() {
    // if there are initial values set, assign and reset all filters
    if (
      this.initialValues.primary != null ||
      this.initialValues.secondary != null ||
      this.initialValues.tertiary != null
    ) {
      // this is an annoying workaround because of how the filter decisions are linked
      const vm = this;
      vm.$nextTick(() => {
        vm.primaryValue = vm.initialValues.primary;

        vm.$nextTick(() => {
          vm.secondaryValue = vm.initialValues.secondary;

          vm.$nextTick(() => {
            vm.tertiaryValue = vm.initialValues.tertiary;
          });
        });
      });
    }
  }
};
</script>

<style></style>

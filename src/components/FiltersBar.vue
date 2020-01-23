<template>
  <v-toolbar class="px-0 pt-0 pb-2">
    <v-container fluid class="px-0 text-xs-center text-sm-right">
      <ChartFilters
        @change="handleDataTypeFilter"
        :id="filters.id"
        :filters="filters.filters"
        :heading="filters.label"
      ></ChartFilters>
      <template v-if="data.type && data.type.hasOwnProperty('filters')">
        <template v-for="(filter, idx) in data.type.filters">
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
      filters: BARCHARTFILTERS,
      data: {
        type: null,
        filters: {}
      },
      allCategory: null
    };
  },
  methods: {
    emit_event: function() {
      this.$emit("change", this.data);
    },
    handleDataTypeFilter: function(f) {
      this.data.type = f.selected;
      this.data.filters = {};
      this.allCategory = null;
      this.emit_event();
    },
    handleFilter: function(f) {
      if (Array.isArray(f.selected)) {
        this.allCategory = f.id;
      }
      this.data.filters[f.id] = f.selected;
    }
  }
};
</script>

<style></style>

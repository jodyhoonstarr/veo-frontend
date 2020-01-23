<template>
  <v-toolbar class="px-0 pt-0 pb-2">
    <v-container fluid class="px-0 text-xs-center text-sm-right">
      <ChartFilters
        @change="updateFilter"
        :id="filters.id"
        :filters="filters.filters"
        :heading="filters.label"
      ></ChartFilters>
      <template v-if="data.type && data.type.hasOwnProperty('filters')">
        <ChartFilters
          v-for="filter in data.type.filters"
          :id="filter.id"
          :filters="filter.filters"
          :heading="filter.label"
          :select-all="true"
          @change="handleFilter"
        >
        </ChartFilters>
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
        view: null,
        group: null,
        cut: null
      }
    };
  },
  methods: {
    emit_event: function() {
      this.$emit("change", this.data);
    },
    updateFilter: function(f) {
      this.data.type = f.selected;
      this.data.view = null;
      this.data.group = null;
      this.data.cut = null;
      this.emit_event();
    },
    handleFilter: function(filter) {}
  }
};
</script>

<style></style>

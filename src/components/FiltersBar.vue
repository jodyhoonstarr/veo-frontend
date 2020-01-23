<template>
  <v-toolbar class="px-0 pt-0 pb-2">
    <v-container fluid class="px-0 text-xs-center text-sm-right">
      <ChartFilters
        @change="updateFilter"
        :filters="filters.filters"
        :heading="filters.label"
      ></ChartFilters>
      <template v-if="data.type && data.type.hasOwnProperty('filters')">
        <ChartFilters
          v-for="filter in data.type.filters"
          :filters="filter.filters"
          :heading="filter.label"
          :select-all="true"
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
  computed: {
    isEarnings: function() {
      return this.data.type && this.data.type.id == "earnings";
    }
  },
  methods: {
    emit_event: function() {
      this.$emit("change", this.data);
    },
    updateFilter: function(filter) {
      this.data.type = filter;
      this.data.view = null;
      this.data.group = null;
      this.data.cut = null;
      this.emit_event();
    },
    updateSubFilter: function(filter) {
      this.data.view = filter;
      // save the inactive filter to the group for later lookup
      this.data.group = this.data.type.filters.filter(obj => obj !== filter)[0];
      this.emit_event();
    },
    updateCut: function(filter) {
      this.data.cut = filter;
      this.emit_event();
    }
  }
};
</script>

<style></style>

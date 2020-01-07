<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" class="text-left text-no-wrap py-0">
        <v-card-subtitle class="pa-0">
          Data:
          <ChartFilters @change="updateFilter" :filters="filters"></ChartFilters>
        </v-card-subtitle>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="text-left text-no-wrap py-0">
        <v-card-subtitle v-if="isEarnings" class="pa-0">
          View:
          <ChartFilters
            v-if="data.type"
            @change="(f) => { data.view = f; emit_event() }"
            :filters="data.type.filters"
          ></ChartFilters>:
          <ChartFilters
            v-if="data.view"
            @change="(f) => { data.cut = f; emit_event() }"
            :filters="data.view.filters"
          ></ChartFilters>
        </v-card-subtitle>
      </v-col>
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
      filters: BARCHARTFILTERS,
      data: {
        type: null,
        view: null,
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
      console.log("custom event");
      this.$emit("change", this.data);
    },
    updateFilter: function(filter) {
      this.data.type = filter;
      this.data.view = null;
      this.data.cut = null;
      this.emit_event();
    }
  }
};
</script>

<style>
</style>

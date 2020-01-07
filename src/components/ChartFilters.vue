<template>
  <v-btn-toggle @change="inputChange" mandatory tile group dense>
    <template v-for="filter in filters">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" :value="filter">{{filter.short}}</v-btn>
        </template>
        <span>{{filter.label}}</span>
      </v-tooltip>
    </template>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "ChartFilters",
  props: ["filters"],
  methods: {
    inputChange(event) {
      this.$emit("change", event);
    }
  }
};
</script>

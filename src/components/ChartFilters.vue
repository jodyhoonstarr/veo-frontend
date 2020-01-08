<template>
  <v-btn-toggle @change="inputChange" v-model="selected" mandatory tile group dense>
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
  data() {
    return {
      selected: null
    };
  },
  methods: {
    inputChange(event) {
      this.$emit("change", event);
    }
  },
  watch: {
    filters: function() {
      this.selected = this.filters.find(obj => obj.default === true);
    },
    selected: function() {
      this.$emit("change", this.selected);
    }
  },
  mounted() {
    this.selected = this.filters.find(obj => obj.default === true);
  }
};
</script>

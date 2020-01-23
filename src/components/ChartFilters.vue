<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" class="mr-1">
        <v-icon v-if="selected && selected.hasOwnProperty('icon')">{{
          selected.icon
        }}</v-icon>
        <template v-else-if="selected && selected.hasOwnProperty('short')">
          {{ selected.short }}
        </template>
        <template v-else>
          Select...
        </template>
      </v-btn>
    </template>
    <v-list>
      <v-subheader> {{ heading }}</v-subheader>
      <v-divider></v-divider>
      <v-list-item v-for="filter in filters" @click="selectItem(filter)">
        <v-list-item-title>{{ filter.label }}</v-list-item-title>
      </v-list-item>
      <v-divider v-if="selectAll"></v-divider>
      <div v-if="selectAll" class="text-center mt-2">
        <v-btn color="primary" class="text--white">Select All</v-btn>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ChartFilters",
  props: ["filters", "heading", "selectAll"],
  data() {
    return {
      selected: null
    };
  },
  methods: {
    selectItem(f) {
      this.selected = f;
    }
  },
  watch: {
    filters: function() {
      if (this.filters) {
        this.selected = this.filters.find(obj => obj.default === true);
      } else {
        this.selected = null;
      }
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

<style lang="scss" scoped></style>

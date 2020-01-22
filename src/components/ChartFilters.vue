<template>
  <v-menu v-if="selected" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" class="mr-1">
        <v-icon v-if="selected.hasOwnProperty('icon')">{{
          selected.icon
        }}</v-icon>
        <template v-else>
          {{ selected.short }}
        </template>
      </v-btn>
    </template>
    <v-list>
      <v-subheader> {{ heading }}</v-subheader>
      <v-list-item v-for="filter in filters" @click="selectItem(filter)">
        <v-list-item-title>{{ filter.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ChartFilters",
  props: ["filters", "heading"],
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

<style lang="scss" scoped>
.max-width {
  width: 100% !important;
}
</style>

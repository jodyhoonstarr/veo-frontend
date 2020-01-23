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
        <template v-else-if="selectAll && selected === filters">
          All
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
      <div v-if="selectAll" class="text-center mt-3 mb-1">
        <v-btn color="primary" class="text--white" @click="selectItem(filters)"
          >Select All</v-btn
        >
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ChartFilters",
  props: ["value", "filters", "heading", "selectAll", "id"],
  data() {
    return {
      selected: null
    };
  },
  methods: {
    selectItem(f) {
      this.selected = f;
    },
    selectDefault(value, filters) {
      if (value) {
        this.selected = value;
      } else if (filters) {
        this.selected = filters.find(obj => obj.default === true);
      } else {
        this.selected = null;
      }
    }
  },
  watch: {
    filters: function() {
      this.selectDefault(this.value, this.filters);
    },
    selected: function() {
      this.$emit("change", { id: this.id, selected: this.selected });
    },
    value: function() {
      this.selectDefault(this.value, this.filters);
    }
  },
  mounted() {
    this.selectDefault(this.value, this.filters);
  }
};
</script>

<style lang="scss" scoped></style>

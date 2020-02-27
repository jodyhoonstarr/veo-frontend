<template>
  <v-select
    :id="id"
    :items="allFilters"
    :label="label"
    item-text="label"
    return-object
    outlined
    dense
    :value="selected"
    @change="e => (this.selected = e)"
    class="newSelect otherClass"
  >
    <template v-slot:selection="{ item, index }">
      <div v-if="item.short === 'All' && showChips === true" class="selection">
        <template v-for="filter in filters">
          <v-icon :color="filter.color">mdi-checkbox-blank</v-icon>
          <span> {{ filter.short }} </span>
        </template>
      </div>
      <div
        v-else-if="item.color != null && showChips === true"
        class="selection"
      >
        <v-icon :color="item.color">mdi-checkbox-blank</v-icon>
        <span> {{ item.short }} </span>
      </div>
      <div v-else class="selection">
        <span> {{ item.short }}</span>
      </div>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "ChartFilters",
  props: ["value", "filters", "label", "multiple", "id", "showChips"],
  data() {
    return {
      selected: null,
      all: { id: "all", short: "All", label: `All ${this.label}` }
    };
  },
  methods: {
    toArray: function(obj) {
      return !Array.isArray(obj) ? [obj] : obj;
    },
    sortIfArray: function(obj) {
      if (Array.isArray(obj) && obj.length > 1) {
        // if first string begins with a number, sort by the starting int in the string
        const firstChar = obj[0].short.charAt(0);
        if (firstChar >= "0" && firstChar <= "9") {
          return Array.prototype.slice.call(obj).sort((a, b) => {
            const aInt = parseInt(a.short.replace(/(^\d+)(.+$)/i, "$1"));
            const bInt = parseInt(b.short.replace(/(^\d+)(.+$)/i, "$1"));
            return aInt > bInt ? 1 : -1;
          });
        } else {
          // otherwise sort by the whole string
          return Array.prototype.slice
            .call(obj)
            .sort((a, b) => a.short.localeCompare(b.short));
        }
      } else {
        return Array.prototype.slice.call(obj);
      }
    },
    validateIdProps: function(a, b) {
      // check if all the id props match across the two arrays
      // vue objs don't compare so we have to validate the id field
      const matches = a.map(aele => {
        const found = b.find(bele => {
          return aele.id === bele.id;
        });
        return found != null;
      });

      // [false true true] should return false since the ids dont match
      return !matches.includes(false);
    },
    selectDefault(value, filters) {
      if (value) {
        if (this.multiple && Array.isArray(value)) {
          if (value.length === 1) {
            // if an array is passed in with one value
            this.selected = value[0];
          } else if (this.validateIdProps(value, filters)) {
            // an array is passed in with all values, select the all category
            this.selected = this.all;
          } else {
            console.log("WARN: Unexpected array passed to ChartFilters");
            console.log(value);
          }
        } else {
          this.selected = value;
        }
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
      let emitted;
      if (this.selected.id === "all") {
        // if all category, emit all filters as array
        emitted = this.filters;
      } else if (this.multiple) {
        // emit only the selected filter as array
        emitted = this.toArray(this.selected);
      } else {
        // emit the object
        emitted = this.selected;
      }
      this.$emit("change", {
        id: this.id,
        selected: emitted
      });
    },
    value: function() {
      this.selectDefault(this.value, this.filters);
    },
    label: function() {
      this.all.label = `All ${this.label}`;
    }
  },
  mounted() {
    this.selectDefault(this.value, this.filters);
  },
  computed: {
    allFilters: function() {
      if (this.multiple === true) {
        return [...this.filters, this.all];
      } else {
        return this.filters;
      }
    }
  }
};
</script>

<style lang="scss">
.selection {
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}
</style>

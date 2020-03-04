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
    @change="handleChange"
    class="newSelect otherClass"
  >
    <template v-slot:selection="{ item, index }">
      <div
        v-if="
          (item.id === 'all' || item.id === 'allcounts') && showChips === true
        "
        class="selection"
      >
        <template v-for="val in value">
          <v-icon :color="val.color">mdi-checkbox-blank</v-icon>
          <span> {{ val.short }} </span>
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
      all: { id: "all", short: "All", label: `All ${this.label}` },
      allcounts: {
        id: "allcounts",
        short: "All Counts",
        label: `All Counts ${this.label}`
      }
    };
  },
  methods: {
    toArray: function(obj) {
      return !Array.isArray(obj) ? [obj] : obj;
    },
    validateIdProps: function(a, b) {
      // order matters here! make sure a is the larger array
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
    selectDefault: function(value, filters) {
      if (value) {
        if (this.multiple && Array.isArray(value)) {
          if (value.length === 1) {
            // if an array is passed in with one value
            this.selected = value[0];
          } else if (this.validateIdProps(filters, value)) {
            // an array is passed in with all values, select the all category
            this.selected = this.all;
          } else if (
            this.value.filter(o => o.id.includes("count").length === 2)
          ) {
            // an array is passed with both count filters
            this.selected = this.allcounts;
          } else {
            console.log("WARN: Unexpected array passed to ChartFilters");
            console.log(value);
          }
        } else if (Array.isArray(value)) {
          // select default when 'all' values are passed in as props
          // but unavailable in the filters
          this.selected = filters.find(obj => obj.default === true);
        } else {
          this.selected = value;
        }
      } else if (filters != null) {
        this.selected = filters.find(obj => obj.default === true);
      } else {
        this.selected = null;
      }
    },
    handleChange: function(e) {
      this.selected = e;
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
      } else if (this.selected.id === "allcounts") {
        // if only the counts category is selected, tag emp and nonemp
        emitted = this.filters.filter(o => o.id.includes("emp"));
      } else if (this.multiple) {
        // emit only the selected filter as array
        emitted = this.toArray(this.selected);
      } else {
        // emit the object
        emitted = this.selected;
      }
      this.$emit("change", {
        id: this.id,
        selected: this.toArray(emitted) //make sure array is returned, even if multiple is false
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
      if (this.id === "type" && this.multiple === true) {
        // if it's a data type filter
        return [...this.filters, this.allcounts];
      } else if (this.multiple === true) {
        // if it's a year or earnings filter
        return [...this.filters, this.all];
      } else {
        // otherwise default
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

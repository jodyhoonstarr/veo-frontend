<template>
  <v-select
    v-if="allFilters"
    :id="id"
    v-model="selected"
    :items="allFilters"
    :label="label"
    item-text="label"
    return-object
    outlined
    dense
    class="newSelect otherClass"
  >
    <template v-slot:selection="{ item }">
      <div v-if="item.id === 'all' && showChips === true" class="selection">
        <template v-for="val in filters">
          <v-icon v-if="chartType === 'bar'" :key="val.id" :color="val.color"
            >mdi-checkbox-blank
          </v-icon>
          <template v-else-if="chartType === 'line'">
            <v-icon v-if="val.linestyle === 'solid'" :key="val.id"
              >$vuetify.icons.solidline
            </v-icon>
            <v-icon v-if="val.linestyle === 'dashed'" :key="val.id"
              >$vuetify.icons.dashedline
            </v-icon>
            <v-icon v-if="val.linestyle === 'dotted'" :key="val.id"
              >$vuetify.icons.dottedline
            </v-icon>
          </template>
          <span :key="val.short"> {{ val.short }} </span>
        </template>
      </div>
      <div v-else-if="showChips === true" class="selection">
        <v-icon v-if="chartType === 'bar'" :color="item.color"
          >mdi-checkbox-blank
        </v-icon>
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
  props: {
    value: {
      type: Array,
      default: null
    },
    filters: {
      type: Array,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    },
    showChips: {
      type: Boolean,
      default: false
    },
    chartType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: null,
      all: { id: "all", short: "All", label: `All ${this.label}` }
    };
  },
  computed: {
    allFilters: function() {
      if (this.filters == null) {
        return null;
      }
      if (this.multiple === true) {
        // if it's a year or earnings filter
        return [...this.filters, this.all];
      } else {
        // otherwise default
        return this.filters;
      }
    }
  },
  watch: {
    filters: function() {
      this.selectDefault(this.value, this.filters);
      this.emitChange(); // keep - input 'all' filters can change while this.value statys static
    },
    selected: function() {
      this.emitChange();
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
    selectDefaultFilters: function() {
      // select the default values using the filter json
      this.selected = this.filters.find(obj => obj.default === true);
      this.emitChange(); // notify the parent that the value is set
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
          } else {
            console.log("WARN: Unexpected array passed to ChartFilters");
            console.log(value);
          }
        } else if (Array.isArray(value)) {
          if (value.length === 1) {
            // if an array is passed in with one value
            this.selected = value[0];
          } else {
            // select default when 'all' values are passed in as props
            // but unavailable in the filters
            this.selected = filters.find(obj => obj.default === true);
          }
        } else {
          this.selected = value;
        }
      } else if (filters != null) {
        this.selectDefaultFilters(filters);
      } else {
        this.selected = null;
      }
    },
    emitChange: function() {
      let emitted;
      if (this.selected && this.selected.id === "all") {
        // if all category, emit all filters as array
        emitted = this.filters;
      } else if (this.multiple) {
        // emit only the selected filter as array
        emitted = this.toArray(this.selected);
      } else {
        // emit the object
        emitted = this.toArray(this.selected);
      }
      this.$emit("change", {
        id: this.id,
        selected: this.toArray(emitted) //make sure array is returned, even if multiple is false
      });
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

/*.v-icon.outlined {*/
/*  border: 1px solid;*/
/*  border-radius: 3px;*/
/*}*/
</style>

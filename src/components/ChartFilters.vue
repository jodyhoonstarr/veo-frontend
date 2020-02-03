<template>
  <v-select
    :id="id"
    :items="filters"
    :label="label"
    :multiple="multiple"
    item-text="label"
    return-object
    outlined
    dense
    :value="selected"
    @change="sortIfArray"
    class="newSelect otherClass"
  >
    <template v-slot:selection="{ item, index }">
      <div class="selection" v-if="index === 0">
        {{ labels }}
      </div>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "ChartFilters",
  props: ["value", "filters", "label", "multiple", "id"],
  data() {
    return {
      selected: null
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
          this.selected = obj.sort((a, b) => {
            const aInt = parseInt(a.short.replace(/(^\d+)(.+$)/i, "$1"));
            const bInt = parseInt(b.short.replace(/(^\d+)(.+$)/i, "$1"));
            return aInt > bInt ? 1 : -1;
          });
        } else {
          // otherwise sort by the whole string
          this.selected = obj.sort((a, b) => a.short.localeCompare(b.short));
        }
      } else {
        this.selected = obj;
      }
    },
    selectDefault(value, filters) {
      if (value) {
        this.selected = this.multiple
          ? this.toArray(value)
          : (this.selected = value);
      } else if (filters) {
        this.selected = this.multiple
          ? this.toArray(filters.find(obj => obj.default === true))
          : filters.find(obj => obj.default === true);
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
  },
  computed: {
    labels: function() {
      if (Array.isArray(this.selected)) {
        return this.selected.map(e => e.short).join(", ");
      } else {
        return this.selected.short;
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

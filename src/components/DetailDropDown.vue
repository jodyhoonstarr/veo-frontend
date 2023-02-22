<template>
  <v-autocomplete
    ref="dropdown"
    v-model="selected"
    :loading="loading"
    :disabled="loading"
    item-text="label"
    return-object
    :items="items || []"
    :label="label"
    :multiple="multiple"
    dense
    :filter="filterFullObject"
    :hint="hintText"
    :persistent-hint="persistentHint"
    :search-input.sync="search"
    :class="{ 'my-1 py-3': !$vuetify.breakpoint.xs }"
  >
    <template v-slot:prepend-item>
      <v-col class="pa-0 ma-0">
        <v-row class="text-center pa-0 ma-0 one-line">
          <v-btn
            v-if="selectallable"
            color="primary"
            text
            small
            :disabled="allSelected"
            @click="selectAllProps"
          >
            <v-icon left>
              mdi-checkbox-multiple-marked-outline
            </v-icon>Select
            All
          </v-btn>
          <v-btn
            v-if="selectallable"
            color="primary"
            text
            small
            :disabled="noneSelected"
            @click="selectNoneProps"
          >
            <v-icon left>
              mdi-checkbox-multiple-blank-outline
            </v-icon>Clear
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            text
            small
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-divider class="pb-1" />
    </template>

    <template v-slot:selection="{ item, index }">
      <div
        v-if="index === 0 && itemCount === 1"
        class="selection"
      >
        {{ item.label }}
      </div>
      <div
        v-else-if="index === 1"
        class="selection"
      >
        {{ pluralLabels }} Selected
      </div>
    </template>

    <template
      v-slot:item="{ parent, item }"
      three-line
    >
      <v-list-item-content class="py-0">
        <v-list-item-title
          v-if="
            search &&
              item.label
                .toLocaleLowerCase()
                .indexOf(search.toLocaleLowerCase()) > -1
          "
          v-sane-html="parent.genFilteredText(item.label)"
          class="pt-1"
        />
        <v-list-item-title
          v-else
          v-sane-html="item.label"
          class="pt-1"
        />
        <p
          v-if="
            search &&
              item.details
                .toLocaleLowerCase()
                .indexOf(search.toLocaleLowerCase()) > -1
          "
          v-sane-html="parent.genFilteredText(item.details)"
          class="grey--text caption mb-0 pb-1"
          wrap
        />
        <v-list-item-subtitle
          v-else
          v-sane-html="item.details"
          class="grey--text caption mb-0 pb-1"
        />
        <v-divider />
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import Pluralize from "pluralize";

export default {
  name: "DetailDropDown",
  props: {
    value: {
      type: [Object, Array],
      default: () => {}
    },
    items: {
      type: [Object, Array],
      default: () => {}
    },
    label: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: null
    },
    loading: {
      type: Boolean,
      default: null
    },
    persistentHint: {
      type: Boolean,
      default: null
    },
    propname: {
      type: String,
      default: null
    },
    selectallable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: null,
      selected: this.value
    };
  },
  computed: {
    itemsAreEmpty: function() {
      return Array.isArray(this.items) && this.items.length === 0;
    },
    itemCount: function() {
      if (Array.isArray(this.selected)) {
        return this.selected.length;
      } else {
        if (this.selected != null) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    itemIsObject: function() {
      return (
        Array.isArray(this.items) &&
        this.items.length > 0 &&
        typeof this.items[0] === "object"
      );
    },
    hintText: function() {
      if (!this.loading && this.persistentHint) {
        return "Select Multiple Characteristics";
      }

      return "";
    },
    pluralLabels: function() {
      return Pluralize(this.label, this.itemCount, true);
    },

    allSelected: function() {
      return this.selected === this.items;
    },
    noneSelected: function() {
      return this.selected == null;
    }
  },
  watch: {
    value(input) {
      this.selected = input;
    },
    selected(newSelected) {
      this.$emit("input", newSelected);
    }
  },
  methods: {
    filterFullObject(item, queryText) {
      return (
        item.label.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item.details
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    selectAllProps: function() {
      this.selected = this.items;
      this.blur();
    },
    selectNoneProps: function() {
      this.selected = null;
      this.blur();
    },
    close: function() {
      this.blur();
    },
    blur: function() {
      this.$refs.dropdown.blur();
    }
  }
};
</script>

<style lang="scss" scoped>
.selection {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  max-width: 90%;
  padding: 4px 4px 2px 0px;
}
</style>

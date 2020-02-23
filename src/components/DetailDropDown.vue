<template>
  <v-autocomplete
    :loading="loading"
    :disabled="loading"
    item-text="label"
    return-object
    :items="items"
    :label="label"
    :multiple="multiple"
    dense
    :filter="filterFullObject"
    :hint="hintText"
    :persistentHint="persistentHint"
    v-model="selected"
    :search-input.sync="search"
    :class="{ 'my-1 py-3': !$vuetify.breakpoint.xs }"
  >
    <template v-slot:selection="{ item, index }">
      <div class="selection" v-if="index === 0 && itemCount === 1">
        {{ item.label }}
      </div>
      <div class="selection" v-else-if="index === 1">
        {{ pluralLabels }}
      </div>
    </template>

    <template three-line v-slot:item="{ parent, item }">
      <v-list-item-content class="py-0">
        <v-list-item-title
          v-if="
            search &&
              item.label
                .toLocaleLowerCase()
                .indexOf(search.toLocaleLowerCase()) > -1
          "
          class="pt-1"
          v-html="parent.genFilteredText(item.label)"
        ></v-list-item-title>
        <v-list-item-title
          v-else
          class="pt-1"
          v-html="item.label"
        ></v-list-item-title>
        <p
          v-if="
            search &&
              item.details
                .toLocaleLowerCase()
                .indexOf(search.toLocaleLowerCase()) > -1
          "
          class="grey--text caption mb-0 pb-1"
          v-html="parent.genFilteredText(item.details)"
          wrap
        ></p>
        <v-list-item-subtitle
          v-else
          class="grey--text caption mb-0 pb-1"
          v-html="item.details"
        ></v-list-item-subtitle>
        <v-divider></v-divider>
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
      type: Object | Array,
      default: null
    },
    items: {
      type: Object | Array,
      default: null
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
    }
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
    },
    pluralLabels: function() {
      return Pluralize(this.label, this.itemCount, true);
    }
  },
  data() {
    return {
      search: null,
      selected: this.value
    };
  },
  watch: {
    value(input) {
      this.selected = input;
    },
    selected(newSelected, oldSelected) {
      // hacky way to block deselection of the last item in a list
      if (Array.isArray(newSelected) && newSelected.length === 0) {
        this.selected = newSelected;
        // allow the children to update but then revert the state
        this.$nextTick(() => {
          this.selected = oldSelected;
        });
        // never alert the parent about the empty state change
        this.$emit("input", oldSelected);
      } else {
        this.$emit("input", newSelected);
      }
    }
  },
  methods: {
    filterFullObject(item, queryText, itemText) {
      return (
        item.label.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item.details
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    }
  }
};
</script>

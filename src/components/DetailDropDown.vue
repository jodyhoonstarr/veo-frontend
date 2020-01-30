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
    :clearable="clearable"
    @input="dropDownSelect"
    :search-input.sync="search"
    :class="{ 'my-1 py-3': !$vuetify.breakpoint.xs }"
  >
    <template v-slot:selection="{ item, index }">
      <div class="selection" v-if="index === 0 && itemCount === 1">
        {{ item.label }}
      </div>
      <div class="selection" v-else-if="index === 1">
        {{ itemCount }} {{ label }}s
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
    clearable: {
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
    }
  },
  methods: {
    dropDownSelect(event) {
      this.$emit("input", event);
    },
    chipRemove(item) {
      this.selected.splice(this.selected.indexOf(item), 1);
      this.selected = [...this.selected];
      this.$emit("change", this.selected);
    },
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

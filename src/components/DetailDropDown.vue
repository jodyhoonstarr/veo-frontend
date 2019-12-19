<template>
  <v-autocomplete
    v-if="this.itemsAreEmpty"
    :label="label"
    disabled
    hint="No valid selection available"
    persistent-hint
    class="my-1 py-3"
  ></v-autocomplete>
  <v-autocomplete
    v-else
    item-text="label"
    return-object
    :items="items"
    :label="label"
    :multiple="multiple"
    chips
    :clearable="clearable"
    :hint="hint"
    persistent-hint
    :filter="filterFullObject"
    @input="dropDownSelect"
    :search-input.sync="search"
    class="my-1 py-3"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip close @click:close="chipRemove(item)" v-if="index <= 2">
        <span v-if="item.label.length > 33">{{ item.label.substring(0,30) }}...</span>
        <span v-else>{{ item.label }}</span>
      </v-chip>
      <span v-if="index === 3" class="grey--text caption">(+{{ value.length - 3 }} others)</span>
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
        <v-list-item-title v-else class="pt-1" v-html="item.label"></v-list-item-title>
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
        <v-list-item-subtitle v-else class="grey--text caption mb-0 pb-1" v-html="item.details"></v-list-item-subtitle>
        <v-divider></v-divider>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "DetailDropDown",
  props: ["value", "items", "label", "multiple", "hint", "clearable"],
  computed: {
    itemsAreEmpty: function() {
      return Array.isArray(this.items) && this.items.length === 0;
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

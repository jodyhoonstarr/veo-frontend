<template>
  <v-autocomplete
    item-text="label"
    return-object
    :items="items"
    :label="label"
    :multiple="multiple"
    chips
    :hint="hint"
    persistent-hint
    :filter="filterFullObject"
    @input="dropDownSelect"
    :search-input.sync="search"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index <= 2">
        <span>{{ item.label }}</span>
      </v-chip>
      <span v-if="index === 3" class="grey--text caption">(+{{ value.length - 3 }} others)</span>
    </template>
    <template three-line v-slot:item="{ parent, item, toggle }">
      <v-list-item-content class="py-0">
        <v-list-item-title
          v-if="search && item.label.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1"
          class="pt-1"
          v-html="parent.genFilteredText(item.label)"
        ></v-list-item-title>
        <v-list-item-title v-else class="pt-1" v-html="item.label"></v-list-item-title>
        <p
          v-if="search && item.mos.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1"
          class="grey--text caption mb-0 pb-1"
          v-html="parent.genFilteredText(item.mos)"
          wrap
        ></p>
        <p v-else class="grey--text caption mb-0 pb-1" v-html="item.mos" wrap></p>
        <v-divider></v-divider>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ["value", "items", "label", "multiple", "hint"],
  data() {
    return {
      search: null
    };
  },
  methods: {
    dropDownSelect(event) {
      this.$emit("input", event);
    },
    filterFullObject(item, queryText, itemText) {
      return (
        item.label.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item.mos.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
      );
    }
  }
};
</script>


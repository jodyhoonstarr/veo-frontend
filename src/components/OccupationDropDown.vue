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
    <!-- <template v-slot:selection="{ item }">
      <v-chip close @click:close>{{item.label}}</v-chip>
    </template>-->
    <!-- <template v-slot:selection="item">
      <v-chip
        v-bind="item.attrs"
        :input-value="item.selected"
        close
        @click="item.select"
        @click:close="remove(item.item)"
      >{{ item.label }}</v-chip>
    </template>-->
    <template v-slot:item="{ parent, item }">
      <v-list-item-content>
        <p
          v-if="search && item.label.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1"
          class="occ"
          v-html="parent.genFilteredText(item.label)"
        ></p>
        <p v-else class="occ" v-html="item.label"></p>
        <p
          v-if="search && item.mos.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1"
          class="mos grey--text caption mb-0"
          v-html="parent.genFilteredText(item.mos)"
        ></p>
        <p v-else class="mos grey--text caption mb-0" v-html="item.mos"></p>
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


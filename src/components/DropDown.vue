<template>
  <v-autocomplete
    v-if="this.itemsAreEmpty"
    :label="label"
    disabled
    hint="No valid selection available"
    persistent-hint
  ></v-autocomplete>
  <v-autocomplete
    v-else-if="this.itemIsObject"
    item-text="label"
    return-object
    :items="items"
    :label="label"
    :multiple="multiple"
    chips
    :hint="hint"
    persistent-hint
    @input="dropDownSelect"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip close @click:close="chipRemove(item)" v-if="index <= 2">
        <span v-if="item.label.length > 33">{{ item.label.substring(0,30) }}...</span>
        <span v-else>{{ item.label }}</span>
      </v-chip>
      <span v-if="index === 3" class="grey--text caption">(+{{ value.length - 3 }} others)</span>
    </template>

    <template three-line v-slot:item="{ item }">
      <v-list-item-content class="py-0">
        <v-list-item-title class="pt-1" v-html="item.label"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
  <v-autocomplete
    v-else
    :items="items"
    :label="label"
    :multiple="multiple"
    chips
    :hint="hint"
    persistent-hint
    @input="dropDownSelect"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip close @click:close="chipRemove(item)" v-if="index <= 2">
        <span v-if="item.length > 33">{{ item.substring(0,30) }}...</span>
        <span v-else>{{ item }}</span>
      </v-chip>
      <span v-if="index === 3" class="grey--text caption">(+{{ value.length - 3 }} others)</span>
    </template>

    <template three-line v-slot:item="{ item }">
      <v-list-item-content class="py-0">
        <v-list-item-title class="pt-1" v-html="item"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ["value", "items", "label", "multiple", "hint"],
  computed: {
    itemsAreEmpty: function() {
      return (
        this.items == null ||
        (Array.isArray(this.items) && this.items.length === 0)
      );
    },
    itemIsObject: function() {
      return (
        Array.isArray(this.items) &&
        this.items.length > 0 &&
        typeof this.items[0] === "object"
      );
    }
  },
  data() {
    return {
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
    }
  }
};
</script>

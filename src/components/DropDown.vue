<template>
  <v-autocomplete
    v-if="this.itemsAreEmpty"
    :label="label"
    disabled
    hint="No valid selection available"
    persistent-hint
    :class="{'my-1 py-3': !$vuetify.breakpoint.xs}"
  ></v-autocomplete>
  <v-autocomplete
    v-else-if="this.itemIsObject"
    item-text="label"
    return-object
    :items="items"
    :label="label"
    :multiple="multiple"
    chips
    :clearable="clearable"
    :hint="hint"
    persistent-hint
    @input="dropDownSelect"
    :class="{'my-1 py-3': !$vuetify.breakpoint.xs}"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip close label @click:close="chipRemove(item)" v-if="index <= 2">
        <template v-if="item.label.length > 33">{{ item.label.substring(0,30) }}...</template>
        <template v-else>{{ item.label }}</template>
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
    :clearable="clearable"
    :hint="hint"
    persistent-hint
    @input="dropDownSelect"
    :class="{'my-1 py-3': !$vuetify.breakpoint.xs}"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip close label @click:close="chipRemove(item)" v-if="index <= 2">
        <template v-if="item.length > 33">{{ item.substring(0,30) }}...</template>
        <template v-else>{{ item }}</template>
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
  props: ["value", "items", "label", "multiple", "hint", "clearable"],
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

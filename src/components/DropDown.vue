<template>
  <v-autocomplete
    v-if="typeof items[0] === 'object' && items[0] !== null"
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
      <v-chip v-if="index <= 2">
        <span>{{ item.label }}</span>
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
      <v-chip v-if="index <= 2">
        <span>{{ item }}</span>
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

  methods: {
    dropDownSelect(event) {
      this.$emit("input", event);
    }
  }
};
</script>

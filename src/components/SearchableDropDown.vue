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
  ></v-autocomplete>
  <v-autocomplete
    v-else
    :items="items"
    :label="label"
    :multiple="multiple"
    chips
    :hint="hint"
    persistent-hint
    @input="dropDownSelect"
  ></v-autocomplete>
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


<template>
  <v-select
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
  ></v-select>
  <v-select
    v-else
    :items="items"
    :label="label"
    :multiple="multiple"
    chips
    :hint="hint"
    persistent-hint
    @input="dropDownSelect"
  ></v-select>
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


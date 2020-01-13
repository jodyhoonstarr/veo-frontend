<template>
  <v-autocomplete
    v-if="this.itemsAreEmpty"
    :label="label"
    disabled
    dense
    :class="{'my-1 py-3': !$vuetify.breakpoint.xs}"
  ></v-autocomplete>
  <v-autocomplete
    v-else-if="this.itemIsObject"
    item-text="label"
    return-object
    :items="items"
    :label="label"
    :multiple="multiple"
    dense
    :hint="hintText"
    :persistentHint="persistentHint"
    :clearable="clearable"
    @input="dropDownSelect"
    v-model="selected"
    :class="{'my-1 py-3': !$vuetify.breakpoint.xs}"
  >
    <template v-slot:selection="{ item, index }">
      <div class="selection" v-if="index === 0 && itemCount === 1">{{ item.label }}</div>
      <div class="selection" v-else-if="index === 1">{{ itemCount }} {{ label }}s</div>
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
    dense
    :hint="hintText"
    :persistentHint="persistentHint"
    :clearable="clearable"
    @input="dropDownSelect"
    v-model="selected"
    :class="{'my-1 py-3': !$vuetify.breakpoint.xs}"
  >
    <template v-slot:selection="{ item, index }">
      <div class="selection" v-if="index === 0 && itemCount === 1">{{ item }}</div>
      <div class="selection" v-else-if="index === 1">{{ itemCount }} {{ label }}s</div>
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
  props: [
    "value",
    "items",
    "label",
    "multiple",
    "clearable",
    "persistentHint",
    "color"
  ],
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
    hintText: function() {
      if (this.persistentHint) {
        return "Active Group";
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.selection {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  max-width: 95%;
}
</style>

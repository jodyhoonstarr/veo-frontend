<template>
  <v-autocomplete
    v-if="itemIsObject"
    :loading="loading"
    :disabled="loading"
    item-text="label"
    return-object
    :items="items"
    :label="label"
    :multiple="multiple"
    dense
    :outlined="outlined"
    :hint="hintText"
    :persistentHint="persistentHint"
    :clearable="clearable"
    @input="dropDownSelect"
    v-model="selected"
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

    <template three-line v-slot:item="{ item }">
      <v-list-item-content class="py-0">
        <v-list-item-title class="pt-1" v-html="item.label"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
  <v-autocomplete
    v-else
    :loading="loading"
    :disabled="loading"
    :items="items"
    :label="label"
    :multiple="multiple"
    dense
    :outlined="outlined"
    :hint="hintText"
    :persistentHint="persistentHint"
    :clearable="clearable"
    @input="dropDownSelect"
    v-model="selected"
    :class="{ 'my-1 py-3': !$vuetify.breakpoint.xs }"
  >
    <template v-slot:selection="{ item, index }">
      <div class="selection" v-if="index === 0 && itemCount === 1">
        {{ item }}
      </div>
      <div class="selection" v-else-if="index === 1">
        {{ itemCount }} {{ label }}s
      </div>
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
  props: {
    value: {
      type: Object | Array,
      default: null
    },
    items: {
      type: Array,
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
    persistentHint: {
      type: Boolean,
      default: null
    },
    loading: {
      type: Boolean,
      default: null
    },
    outlined: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
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
      if (!this.loading && this.persistentHint) {
        return "Select Multiple Characteristics";
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
  max-width: 80%;
}
</style>

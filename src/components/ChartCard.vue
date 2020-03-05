<template>
  <v-card :loading="loading">
    <v-system-bar color="primary">
      <span v-if="loading" class="white--text">Loading...</span>
      <span
        v-else-if="
          filters && activeToggle && filters.type && filters.type.length === 1
        "
        class="white--text"
        >{{ filters.type[0].label }} by {{ byString }}</span
      >
      <span
        v-else-if="
          filters && activeToggle && filters.type && filters.type.length === 2
        "
        class="white--text"
        >Count of {{ filters.type[0].short }} vs
        {{ filters.type[1].short }} Veterans by {{ byString }}</span
      >
      <v-spacer></v-spacer>
    </v-system-bar>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "ChartCard",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Object,
      default: null
    },
    activeToggle: {
      type: String,
      default: null
    },
    additionalString: {
      type: String,
      default: null,
      required: false
    }
  },
  computed: {
    byString: function() {
      const byStr =
        this.activeToggle.charAt(0).toUpperCase() + this.activeToggle.slice(1);
      if (this.additionalString != null) {
        return `${byStr} ${this.additionalString}`;
      } else {
        return byStr;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

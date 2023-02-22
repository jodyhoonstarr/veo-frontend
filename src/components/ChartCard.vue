<template>
  <v-card :loading="loading">
    <v-system-bar color="primary">
      <span
        v-if="loading"
        class="white--text"
      >Loading...</span>
      <span
        v-else-if="
          filters &&
            activeToggle &&
            Array.isArray(filters.primary) &&
            filters.primary.length === 1
        "
        class="white--text"
      >{{ filters.primary[0].label }} by {{ byString }}</span>
      <v-spacer />
    </v-system-bar>
    <slot />
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
    }
  },
  computed: {
    byString: function() {
      let textLabel =
        this.activeToggle.charAt(0).toUpperCase() + this.activeToggle.slice(1);

      if (textLabel === "State") {
        return "State of Employment";
      } else {
        return textLabel;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

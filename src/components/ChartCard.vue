<template>
  <v-card :loading="loading">
    <v-system-bar color="primary">
      <slot name="header"></slot>
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
    }
  }
};
</script>

<style lang="scss" scoped></style>

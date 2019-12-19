<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <slot></slot>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ChartCard"
};
</script>

<style lang="scss" scoped>
</style>

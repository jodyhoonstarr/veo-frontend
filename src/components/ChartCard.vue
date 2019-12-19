<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>{{ value.id }}</v-card-title>
        <v-card-subtitle>{{ value.label }}</v-card-subtitle>
        <v-card-text>Chart area here</v-card-text>
        <BarChart :id="value.id"></BarChart>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: "ChartCard",
  components: { BarChart },
  props: ["value"]
};
</script>

<style lang="scss" scoped>
</style>

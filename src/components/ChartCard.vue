<template>
  <v-row>
    <v-col cols="12">
      <v-card :ref="value.id" outlined>
        <v-row align="baseline">
          <v-col cols="12" xs="12" sm="6">
            <v-card-title>{{ value.label }}</v-card-title>
          </v-col>
        </v-row>
        <BarChartGrouped v-if="width" :id="value.id" :svg-width="width" :chart-data="chartData"></BarChartGrouped>
        <!-- <BarChart v-else :id="value.id" :svg-width="width" :svg-data="svgData"></BarChart> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import BarChartGrouped from "@/components/BarChartGrouped.vue";

export default {
  name: "ChartCard",
  components: { BarChart, BarChartGrouped },
  props: ["value", "chartData"],
  data() {
    return {
      width: null
    };
  },
  methods: {
    handleResize: function() {
      this.width = Math.floor(this.$refs[this.value.id].$el.clientWidth);
    }
  },
  mounted() {
    this.$nextTick(this.handleResize());
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style lang="scss" scoped>
</style>

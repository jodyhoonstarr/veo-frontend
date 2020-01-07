<template>
  <div>
    <svg :id="id" :width="svgWidth" :height="svgHeight" :max-height="svgMaxHeight">
      <!-- wrapper group with margins -->
      <g :transform="chartTransform">
        <!-- temporary placeholder -->
        <rect :width="chartWidth" :height="chartHeight" fill="LightGray" />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleBand, scaleLinear, scaleOrdinal, max } from "d3";

export default {
  name: "BarChartGrouped",
  props: ["id", "svgWidth", "svgData"],
  data() {
    return {
      svgRatio: 1.9,
      svgMaxHeight: 400,
      margin: { top: 10, right: 10, bottom: 30, left: 40 }
    };
  },
  computed: {
    svgHeight: function() {
      return Math.floor(this.svgWidth / this.svgRatio);
    },
    chartTransform: function() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    },
    chartWidth: function() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    chartHeight: function() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>>

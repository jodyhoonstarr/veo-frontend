<template>
  <div>
    <svg :id="id" :width="svgWidth" :height="svgHeight" :max-height="svgMaxHeight">
      <!-- wrapper group with margins -->
      <g :transform="chartTransform">
        <!-- temporary placeholder -->
        <rect :width="chartWidth" :height="chartHeight" fill="LightGray" :data="d3Data" />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleBand, scaleLinear, scaleOrdinal, max } from "d3";

export default {
  name: "BarChartGrouped",
  props: ["id", "svgWidth", "chartData"],
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
    },
    d3Data: function() {
      // convert everything but the label to numeric
      let newArr = [];
      this.chartData.map(obj => {
        let newObj = {};
        for (const key of Object.keys(obj)) {
          if (key === "label") {
            newObj[key] = obj[key];
          } else {
            newObj[key] = +obj[key];
          }
        }
        newArr.push(newObj);
      });
      return newArr;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>>

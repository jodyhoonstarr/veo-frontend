<template>
  <div>
    <svg :id="id" :style="svgStyle">
      <rect width="100%" height="100%" fill="LightGray" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "BarChartGrouped",
  props: [
    "id",
    "svgWidth",
    "svgData",
    "dataGroup",
    "dataCut",
    "dataCutSelection"
  ],
  data() {
    return {
      svgRatio: 1.9
    };
  },
  computed: {
    svgStyle: function() {
      return `width: ${this.svgWidth}px; height: ${Math.floor(
        this.svgWidth / this.svgRatio
      )}px; max-height: 400px;`;
    },
    group: function() {
      if (this.dataGroup && this.dataCut && this.dataCutSelection) {
        return this.dataGroup;
      }
    },
    cut: function() {
      if (this.dataGroup && this.dataCut ** this.dataCutSelection) {
        return this.dataCut;
      }
    },
    cutSelection: function() {
      if (this.dataGroup && this.dataCut ** this.dataCutSelection) {
        return this.dataCutSelection;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>>

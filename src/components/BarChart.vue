<template>
  <div>
    <svg :id="id" :style="svgStyle">
      <rect width="100%" height="100%" fill="LightGray" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "BarChart",
  props: ["id", "svgWidth", "svgData"],
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>>

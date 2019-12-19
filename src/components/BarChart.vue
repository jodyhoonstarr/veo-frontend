<template>
  <div>
    <svg :id="id" :style="svgStyle" />
  </div>
</template>

<script>
export default {
  name: "BarChart",
  props: ["id", "svgwidth"],
  data() {
    return {
      svgratio: 1.9
    };
  },
  computed: {
    svgStyle: function() {
      return `width: ${this.svgwidth}px; height: ${Math.floor(
        this.svgwidth / this.svgratio
      )}px; max-height: 400px`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>>

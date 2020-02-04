<template>
  <svg :width="width" :height="height" :max-height="maxHeight"></svg>
</template>

<script>
export default {
  name: "D3SVG",
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 0
    },
    chartData: {
      type: Array,
      default: null
    }
  }
};
</script>

<style scoped></style>

<template>
  <v-card ref="chartcard" flat>
    <D3SVG
      v-if="width"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :chartData="chartData"
      :chartColors="chartColors"
    ></D3SVG>
  </v-card>
</template>

<script>
import D3SVG from "@/components/D3SVG";

export default {
  name: "Chart",
  components: { D3SVG },
  props: {
    chartData: {
      type: Array,
      default: null
    },
    chartColors: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      width: null,
      ratio: 1.9,
      maxHeight: 400
    };
  },
  computed: {
    height: function() {
      if (this.width == null) {
        return null;
      }
      const calculatedHeight = Math.floor(this.width / this.ratio);
      return calculatedHeight < this.maxHeight
        ? calculatedHeight
        : this.maxHeight;
    }
  },
  methods: {
    handleResize: function() {
      this.width = Math.floor(this.$refs.chartcard.$el.clientWidth);
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

<style scoped></style>

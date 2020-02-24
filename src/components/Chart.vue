<template>
  <v-card ref="chartcard" flat>
    <BarChart
      v-if="width"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :chartData="chartData"
      :chartColors="chartColors"
      :chartDataType="chartDataType"
    ></BarChart>
  </v-card>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: "Chart",
  components: { BarChart },
  props: {
    chartData: {
      type: Array,
      default: null
    },
    chartColors: {
      type: Object,
      default: null
    },
    chartDataType: {
      type: String,
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

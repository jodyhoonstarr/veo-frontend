<template>
  <v-card ref="chartcard" flat>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        v-if="width"
        :size="height"
        :width="30"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <v-card-text class="py-0">
        <p class="py-0 display-1 text--secondary">Loading...</p>
      </v-card-text>
    </div>
    <BarChart
      v-else-if="chartType === 'bar' && chartData != null && width"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :chartData="chartData"
      :chartColors="chartColors"
      :chartDataType="chartDataType"
    ></BarChart>
    <div v-else class="text-center">
      <v-icon :size="height" color="text--secondary">mdi-alert-outline</v-icon>
      <v-card-text class="py-0">
        <p class="py-0 display-1 text--secondary">Error: No Data</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: "Chart",
  components: { BarChart },
  props: {
    chartType: {
      type: String,
      required: true,
      validator: val => ["bar", "line"].includes(val)
    },
    loading: { type: Boolean, default: false },
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

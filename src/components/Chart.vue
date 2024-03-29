<template>
  <v-card
    ref="chartcard"
    flat
  >
    <notification-card
      v-if="loading && width"
      :height="height"
    >
      <v-progress-circular
        :size="height / 2"
        indeterminate
        color="primary"
      />
      <v-card-text class="py-5">
        <p class="py-0 display-1 text--secondary">
          Loading...
        </p>
      </v-card-text>
    </notification-card>

    <template v-else-if="chartType === 'bar' && chartData != null && width">
      <button-container>
        <chart-button-download
          v-if="chartDataZip"
          :url="chartDataZip"
          icon="mdi-download"
          tooltip="Download Source Data"
        />
      </button-container>

      <BarChart
        :width="width"
        :height="height"
        :max-height="maxHeight"
        :chart-data="chartData"
        :chart-colors="chartColors"
        :chart-data-type="chartDataType"
        :chart-label="formattedChartLabel"
      />
    </template>

    <template v-else-if="chartType === 'line' && chartData != null && width">
      <button-container>
        <chart-button-toggle
          v-model="magnifyYAxis"
          tooltip="Toggle Y-Axis Zoom"
          icon="mdi-magnify-plus"
          off-icon="mdi-magnify-minus"
          :nudge-tooltip="0"
        />

        <chart-button-download
          v-if="chartDataZip"
          :url="chartDataZip"
          icon="mdi-download"
          tooltip="Download Source Data"
          :nudge-tooltip="40"
        />
      </button-container>

      <line-chart
        :width="width"
        :height="height"
        :max-height="maxHeight"
        :chart-data="chartData"
        :chart-colors="chartColors"
        :chart-line-styles="chartLineStyles"
        :chart-data-type="chartDataType"
        :chart-label="formattedChartLabel"
        :magnify-y-axis="magnifyYAxis"
      />
    </template>

    <notification-card
      v-else-if="width"
      :height="height"
    >
      <v-icon
        :size="height / 2"
        color="text--secondary"
      >
        mdi-alert-outline
      </v-icon>
      <v-card-text class="py-5">
        <p class="py-0 display-1 text--secondary">
          No Data Available
        </p>
      </v-card-text>
    </notification-card>
  </v-card>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart";
import NotificationCard from "@/components/NotificationCard";
import ChartButtonToggle from "@/components/ChartButtonToggle";
import ChartButtonDownload from "@/components/ChartButtonDownload";
import ButtonContainer from "@/components/ButtonContainer";

export default {
  name: "Chart",
  components: {
    ButtonContainer,
    ChartButtonToggle,
    ChartButtonDownload,
    BarChart,
    LineChart,
    NotificationCard
  },
  props: {
    chartType: {
      type: String,
      required: true,
      validator: val => ["bar", "line"].includes(val)
    },
    loading: { type: Boolean, default: null, required: true },
    chartData: {
      type: Array,
      default: null
    },
    chartDataZip: {
      type: String,
      default: null,
      required: false
    },
    chartColors: {
      type: Object,
      default: null
    },
    chartLineStyles: {
      type: Object,
      default: null
    },
    chartDataType: {
      type: String,
      default: null
    },
    chartLabel: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      width: null,
      ratio: 1.9,
      maxHeight: 400,
      magnifyYAxis: false,
      showMargins: false
    };
  },
  computed: {
    formattedChartLabel: function() {
      if (this.chartLabel === "state") {
        return "State of Employment";
      } else if (this.chartLabel === "occupation") {
        return "Military Occupation";
      }
      return this.chartLabel;
    },
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
  mounted() {
    this.$nextTick(this.handleResize());
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize: function() {
      this.width = Math.floor(this.$refs.chartcard.$el.clientWidth);
    }
  }
};
</script>

<style scoped></style>

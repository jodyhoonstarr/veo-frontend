<template>
  <v-card ref="chartcard" flat>
    <NotificationCard v-if="loading && width" :height="height">
      <v-progress-circular
        :size="height / 2"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <v-card-text class="py-5">
        <p class="py-0 display-1 text--secondary">Loading...</p>
      </v-card-text>
    </NotificationCard>

    <template v-else-if="chartType === 'bar' && chartData != null && width">
      <BarChart
        :width="width"
        :height="height"
        :max-height="maxHeight"
        :chart-data="processedChartData"
        :chart-colors="chartColors"
        :chart-data-type="chartDataType"
        :chart-label="chartLabel"
      ></BarChart>
    </template>

    <template v-else-if="chartType === 'line' && chartData != null && width">
      <ButtonContainer>
        <ChartButton
          v-model="startAxisAtZero"
          tooltip="Start Y-Axis Origin at Zero"
          icon="mdi-chart-line"
        ></ChartButton>
        <ChartButton
          v-model="normalize"
          tooltip="Display as Share of Total"
          icon="mdi-percent"
        ></ChartButton>
      </ButtonContainer>

      <LineChart
        :width="width"
        :height="height"
        :max-height="maxHeight"
        :chart-data="processedChartData"
        :chart-colors="chartColors"
        :chart-line-styles="chartLineStyles"
        :chart-data-type="chartDataType"
        :chart-label="chartLabel"
        :normalized="normalize"
      ></LineChart>
    </template>

    <NotificationCard v-else-if="width" :height="height">
      <v-icon :size="height / 2" color="text--secondary"
        >mdi-alert-outline</v-icon
      >
      <v-card-text class="py-5">
        <p class="py-0 display-1 text--secondary">Error: No Data</p>
      </v-card-text>
    </NotificationCard>
  </v-card>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart";
import NotificationCard from "@/components/NotificationCard";
import ChartButton from "@/components/ChartButton";
import ButtonContainer from "@/components/ButtonContainer";

export default {
  name: "Chart",
  components: {
    ButtonContainer,
    ChartButton,
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
      normalize: false,
      startAxisAtZero: false
    };
  },
  computed: {
    processedChartData: function() {
      if (this.normalize) {
        // create an accumulator lookup (e.g. {alabama: {p25:xx, p50:xx, p75:xx},...}
        const lookup = {};
        this.chartData.forEach(d => {
          // find the high level lookup if it exists, otherwise create a new one
          const subLookup = lookup.hasOwnProperty(d.label)
            ? lookup[d.label]
            : {};
          // keep a running total of each key by label
          Object.keys(d).map(k => {
            if (k !== "label" && k !== "cohort") {
              if (subLookup.hasOwnProperty(k)) {
                // don't use empty strings
                if (d[k] !== "") {
                  subLookup[k] += parseInt(d[k]);
                }
              } else {
                if (d[k] !== "") {
                  subLookup[k] = parseInt(d[k]);
                }
              }
            }
          });

          lookup[d.label] = subLookup;
        });

        // update the existing data using the accumulator
        const newArr = [];
        this.chartData.forEach(d => {
          const newObj = {};
          Object.keys(d).map(k => {
            if (k !== "label" && k !== "cohort") {
              if (d[k] === "") {
                newObj[k] = "";
              } else {
                // val = currentval / {alabama:{p75:xx} where xx is the accumulated total
                newObj[k] = `${d[k] / lookup[d.label][k]}`;
              }
            } else {
              newObj[k] = d[k];
            }
          });
          newArr.push(newObj);
        });
        return newArr;
      } else {
        return this.chartData;
      }
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

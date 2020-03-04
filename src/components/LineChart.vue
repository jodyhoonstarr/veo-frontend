<template>
  <svg :width="width" :height="height" :max-height="maxHeight">
    <g :transform="chartTransform">
      <g ref="xaxis"></g>
      <g v-if="d3Max > 0" ref="yaxisgrid" class="ygrid"></g>
      <g v-if="d3Max > 0" ref="yaxis"></g>
      <g ref="chart"></g>
    </g>
  </svg>
</template>

<script>
import { format } from "d3-format";
import { min, max } from "d3-array";
import { transition } from "d3-transition";
import { axisBottom, axisLeft } from "d3-axis";
import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { arrayIsNullorEmpty } from "@/components/utils";
import { wrapLabels } from "@/components/utils";

export default {
  name: "LineChart",
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
      margin: { top: 26, right: 30, bottom: 48, left: 60 },
      transitionDuration: 400
    };
  },
  computed: {
    chartTransform: function() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    },
    chartWidth: function() {
      return this.width - this.margin.left - this.margin.right;
    },
    chartHeight: function() {
      return this.height - this.margin.top - this.margin.bottom;
    },
    d3Keys: function() {
      if (arrayIsNullorEmpty(this.chartData)) {
        return null;
      }
      let keys = [];
      for (const key of Object.keys(this.chartData[0])) {
        if (key !== "label" && key !== "cohort") {
          keys.push(key);
        }
      }
      return keys;
    },
    d3Labels: function() {
      return [...new Set(this.d3Data.map(o => o.label))];
    },
    d3Data: function() {
      if (arrayIsNullorEmpty(this.chartData)) {
        return null;
      }
      // convert everything but the label to numeric
      let newArr = [];
      this.chartData.map(obj => {
        let newObj = {};

        Object.keys(obj).map(key => {
          return this.d3Keys.includes(key)
            ? (newObj[key] = +obj[key])
            : (newObj[key] = obj[key]);
        });

        newArr.push(newObj);
      });
      return newArr;
    },
    d3LineChartData: function() {
      // initialize a lookup object e.g. {label = [data1, data2...]}
      let dataObject = {};
      this.d3Labels.map(l => (dataObject[l] = []));
      this.d3Data.map(o => {
        // TODO strip label from pushed object
        dataObject[o.label].push(o);
      });
      return dataObject;
    },
    d3Max: function() {
      if (arrayIsNullorEmpty(this.d3Data) || arrayIsNullorEmpty(this.d3Keys)) {
        return null;
      }
      const vm = this;
      return max(vm.d3Data, function(d) {
        return max(vm.d3Keys, function(key) {
          return d[key];
        });
      });
    },
    d3Min: function() {
      if (arrayIsNullorEmpty(this.d3Data) || arrayIsNullorEmpty(this.d3Keys)) {
        return null;
      }
      const vm = this;
      return min(vm.d3Data, function(d) {
        return min(vm.d3Keys, function(key) {
          return d[key];
        });
      });
    },
    labelPrefix: function() {
      if (this.chartDataType === "earnings") {
        return "$";
      } else {
        return "";
      }
    }
  },
  watch: {
    d3Data: function() {
      this.$nextTick(() => {
        // this.bindXAxis();
        // this.bindYAxis();
      });
    },
    width: function() {
      this.$nextTick(() => {
        // this.bindXAxis();
        // this.bindYAxis();
      });
    }
  },
  methods: {
    notNullandHasProp: function(obj, propname) {
      return obj != null && obj.hasOwnProperty(propname);
    },
    chartYBottom: function() {
      if (this.y) {
        return this.y(this.chartHeight);
      }
    },
    bindXAxis: function() {
      const xaxis = select(this.$refs.xaxis);
      xaxis
        .attr("transform", `translate(0,${this.chartHeight})`)
        .call(axisBottom(this.x0))
        .transition()
        .duration(this.transitionDuration)
        .selectAll(".tick text")
        .style("font-size", "12px")
        .call(wrapLabels, this.x0.bandwidth());
    },
    bindYAxis: function() {
      const tickCount = 7;
      const yaxis = select(this.$refs.yaxis);
      yaxis
        .transition()
        .duration(this.transitionDuration)
        .call(
          axisLeft(this.y)
            .ticks(tickCount)
            .tickFormat(d => {
              const dInt = parseInt(d);
              if (dInt < 1000) {
                return d;
              } else if (dInt < 10000) {
                return `${this.labelPrefix}${format(".1s")(d)}`;
              } else {
                return `${this.labelPrefix}${format(".2s")(d)}`;
              }
            })
        )
        .style("font-size", "12px");

      const yaxisgrid = select(this.$refs.yaxisgrid);
      yaxisgrid
        .transition()
        .duration(this.transitionDuration)
        .call(
          axisLeft(this.y)
            .ticks(tickCount)
            .tickFormat("")
            .tickSize(-this.chartWidth)
        );
      // remove the domain outline
      yaxisgrid.select(".domain").remove();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.bindXAxis();
      // this.bindYAxis();
    });
  }
};
</script>

<style>
.ygrid line {
  stroke: lightgrey;
  stroke-opacity: 0.7;
  shape-rendering: crispEdges;
}
</style>

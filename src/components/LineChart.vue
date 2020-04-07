<template>
  <svg :width="width" :height="height" :max-height="maxHeight">
    <g :transform="chartTransform">
      <g ref="xaxis"></g>
      <g v-if="d3Max > 0" ref="yaxisgrid" class="ygrid"></g>
      <g v-if="d3Max > 0" ref="yaxis"></g>
      <g ref="chart"></g>
    </g>
    <g ref="xaxislabel"></g>
    <g ref="yaxislabel"></g>
  </svg>
</template>

<script>
import { format } from "d3-format";
import { min, max } from "d3-array";
import { transition } from "d3-transition";
import { axisBottom, axisLeft } from "d3-axis";
import { select, selectAll } from "d3-selection";
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { arrayIsNullorEmpty, toTitleCase, wrapLabels } from "@/lib/utils";
import { labelSpacer } from "@/lib/labelspacer";

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
    },
    normalized: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      margin: { top: 26, right: 110, bottom: 48, left: 60 },
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
          return this.d3Keys.includes(key) && obj[key] !== ""
            ? (newObj[key] = +obj[key])
            : (newObj[key] = obj[key]);
        });

        newArr.push(newObj);
      });
      return newArr;
    },
    d3LineChartData: function() {
      // initialize a lookup object e.g. {label = {key1 = []}, {key2 = []} ...}
      let lookupObject = {};
      this.d3Labels.map(
        l =>
          (lookupObject[l] = (() => {
            let keysObject = {};
            this.d3Keys.map(k => (keysObject[k] = []));
            return keysObject;
          })())
      );

      // the data rows
      this.d3Data.map(d => {
        const cohort = d.cohort;
        const label = d.label;
        // the data keys
        this.d3Keys.map(k => {
          if (d[k] !== "") {
            let dataObject = {};
            dataObject.value = d[k];
            dataObject.cohort = cohort;

            // append to the lookup object
            lookupObject[label][k].push(dataObject);
          }
        });
      });

      return lookupObject;
    },
    d3Lines: function() {
      let result = [];
      this.d3Labels.map(label => {
        this.d3Keys.map(key => {
          let obj = {};
          obj.key = key;
          obj.label = label;
          obj.data = this.d3LineChartData[label][key];
          result.push(obj);
        });
      });
      return result;
    },
    d3Max: function() {
      const vm = this;
      return max(vm.d3Data, function(d) {
        return max(vm.d3Keys, function(key) {
          return d[key];
        });
      });
    },
    d3Min: function() {
      const vm = this;
      return min(vm.d3Data, function(d) {
        return min(vm.d3Keys, function(key) {
          if (d[key] !== "") {
            return d[key];
          }
        });
      });
    },
    labelPrefix: function() {
      if (this.chartDataType === "earnings" && !this.normalized) {
        return "$";
      } else {
        return "";
      }
    },
    cohortRange: function() {
      return [...new Set(this.d3Data.map(d => parseInt(d.cohort)))];
    },
    cohortMax: function() {
      return max(this.cohortRange);
    },
    cohortMin: function() {
      return min(this.cohortRange);
    },
    x: function() {
      return scaleLinear()
        .domain([this.cohortMin, this.cohortMax])
        .range([0, this.chartWidth]);
    },
    y: function() {
      // space the max if novalue to chart
      const yMax = this.d3Max === 0 ? 1 : this.d3Max;
      // add some bottom padding to the ymin used in the chart
      const newYMin = this.d3Min - (this.d3Max - this.d3Min) / 10;
      const yMin = this.d3Min === 0 || newYMin <= 0 ? 0 : newYMin;
      return scaleLinear()
        .rangeRound([this.chartHeight, 0])
        .domain([yMin, yMax])
        .nice();
    },
    line: function() {
      return line()
        .defined(d => !isNaN(d.value))
        .x(d => this.x(d.cohort))
        .y(d => this.y(d.value));
    }
  },
  watch: {
    d3Data: function() {
      this.bindChartNextTick();
    },
    width: function() {
      this.bindChartNextTick();
    }
  },
  methods: {
    bindChartNextTick: function() {
      this.$nextTick(() => {
        this.bindYAxis();
        this.bindXAxis();
        this.bindLines();
        this.bindPoints();
        this.bindLabels();
        this.bindAxisLabels();
      });
    },
    notNullandHasProp: function(obj, propname) {
      return obj != null && obj.hasOwnProperty(propname);
    },
    chartYBottom: function() {
      if (this.y) {
        return this.y(this.chartHeight);
      }
    },
    xAxisFormat: function(d) {
      const dInt = parseInt(d);
      return `${dInt}-${dInt + 1}`;
    },
    bindXAxis: function() {
      const xaxis = select(this.$refs.xaxis);
      xaxis
        .attr("transform", `translate(0,${this.chartHeight})`)
        .transition()
        .duration(this.transitionDuration)
        .attr("class", "axis")
        .call(axisBottom(this.x).tickFormat(this.xAxisFormat))
        .selectAll(".tick text")
        .style("font-size", "12px");

      // only label the ticks that are even [2000, 2004, ...]
      const tickText = select(this.$refs.xaxis).selectAll(".tick text");
      tickText.each(function(val) {
        if (val % 2 !== 0) {
          select(this).remove();
        }
      });
      const tickLine = select(this.$refs.xaxis).selectAll(".tick line");
      tickLine.each(function(val) {
        if (val % 2 !== 0) select(this).remove();
      });
    },
    processTickFormat: function(d) {
      if (this.normalized) {
        return format(".0%")(d);
      } else {
        return `${this.labelPrefix}${format("~s")(d)}`;
      }
    },
    bindYAxis: function() {
      const tickCount = 7;
      const yaxis = select(this.$refs.yaxis);
      yaxis
        .transition()
        .duration(this.transitionDuration)
        .attr("class", "axis")
        .call(
          axisLeft(this.y)
            .ticks(tickCount)
            .tickFormat(d => this.processTickFormat(d))
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
    },
    lineType: function(d) {
      const lineType = this.chartLineStyles[d.key];
      if (lineType === "dashed") {
        return "5";
      } else if (lineType === "dotted") {
        return "2, 2";
      } else {
        return "";
      }
    },
    bindLines: function() {
      const bound = select(this.$refs.chart)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .selectAll("path")
        .data(this.d3Lines);

      bound.join(
        enter =>
          enter
            .append("path")
            .attr("opacity", 0)
            .style("mix-blend-mode", "multiply")
            .attr("stroke-dasharray", d => this.lineType(d))
            .call(enter =>
              enter
                .transition()
                .duration(this.transitionDuration)
                .attr("opacity", 1)
                .attr("stroke", d => this.chartColors[d.label])
                .attr("d", d => this.line(d.data))
            ),

        update =>
          update.call(update =>
            update
              .transition()
              .duration(this.transitionDuration)
              .attr("stroke-dasharray", d => this.lineType(d))
              .attr("stroke", d => this.chartColors[d.label])
              .attr("d", d => this.line(d.data))
          ),

        exit =>
          exit.call(exit =>
            exit
              .transition()
              .duration(this.transitionDuration)
              .attr("opacity", 0)
              .remove()
          )
      );
    },
    addLabel: function(d) {
      return d.data.map(a => {
        return { cohort: a.cohort, value: a.value, label: d.label };
      });
    },
    bindPoints: function() {
      const pointTransitionDuration = this.transitionDuration * 2;

      // remove and redraw the whole point series every time
      select(this.$refs.chart)
        .selectAll("g.point-series")
        .remove();

      // bind the sets of line data
      select(this.$refs.chart)
        .selectAll("g.point-series")
        .data(this.d3Lines, d => d.label)
        .enter()
        .append("g")
        .attr("class", "point-series")
        .attr("id", d => `${d.label} (${d.key})`)
        .selectAll("circle")
        .data(d => this.addLabel(d))
        .join(enter =>
          enter
            .append("circle")
            .attr("cx", d => this.x(d.cohort))
            .attr("cy", d => this.y(d.value))
            .attr("r", 2)
            .attr("opacity", 0)
            .style("fill", "white")
            .style("stroke", d => this.chartColors[d.label])
            .call(enter =>
              enter
                .transition()
                .duration(pointTransitionDuration)
                .attr("opacity", 1)
            )
        );
    },
    bindLabels: function() {
      const labelTransitionDuration = this.transitionDuration * 2;

      select(this.$refs.chart)
        .selectAll("text")
        .remove();

      let labelKey;
      if (this.d3Keys.length === 3) {
        if (this.d3Keys[1] === "y5") {
          labelKey = this.d3Keys[0];
        } else {
          labelKey = this.d3Keys[1];
        }
      } else {
        labelKey = this.d3Keys[0];
      }

      // get only one label per set of lines
      const linesFiltered = this.d3Lines.filter(l => l.key === labelKey);
      let yValues = {};
      linesFiltered.map(d => {
        yValues[d.label] = this.y(d.data[d.data.length - 1].value);
      });

      // space out overlapping y labels
      const spacedYValues = labelSpacer(yValues);
      // .attr("y", d => spacedYValues[d.label]) // new call
      // .attr("y", d => this.y(d.data[d.data.length - 1].value)) // original call

      const labelData = select(this.$refs.chart)
        .selectAll("text")
        .data(linesFiltered, d => d.label);

      labelData.join(enter =>
        enter
          .append("text")
          .attr("opacity", 0)
          .attr("text-anchor", "start")
          .attr("x", this.chartWidth)
          .attr("y", d => (spacedYValues ? spacedYValues[d.label] : null))
          .attr("stroke-width", 0)
          .attr("fill", d => this.chartColors[d.label])
          .attr("dy", ".30em")
          .attr("dx", ".35em")
          .style("font-size", "10px")
          .text(d => {
            const labelMaxLength = 24;
            if (d.label.length < labelMaxLength) {
              return d.label;
            } else {
              // ,... is ugly, if a comma is the last character remove it
              let charOffset = 3;
              if (d.label[d.label.length - 1] === ",")
                charOffset = charOffset + 1;
              return `${d.label.substring(0, labelMaxLength - charOffset)}...`;
            }
          })
          .call(enter =>
            enter
              .transition()
              .duration(labelTransitionDuration)
              .attr("opacity", 1)
          )
      );
    },
    bindAxisLabels: function() {
      const xAxisLabel = select(this.$refs.xaxislabel);
      xAxisLabel.selectAll("text").remove();
      xAxisLabel
        .append("text")
        .attr("transform", `translate(${this.width / 2},${this.height - 6})`)
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#555555")
        .text(toTitleCase(this.chartLabel));

      const yAxisLabel = select(this.$refs.yaxislabel);
      yAxisLabel.selectAll("text").remove();

      let yLabelText;
      if (this.chartDataType === "earnings") {
        yLabelText = "Annual Earnings";
      } else {
        yLabelText = "Count of Veterans";
      }

      if (this.normalized) {
        yLabelText += " - Share of Total";
      }

      yAxisLabel
        .append("text")
        .attr(
          "transform",
          `rotate(-90) translate(-${Math.floor(this.chartHeight / 2)},${this
            .margin.left - 46})`
        )
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#555555")
        .text(yLabelText);
    }
  },
  mounted() {
    this.bindChartNextTick();
  }
};
</script>

<style>
.ygrid line {
  stroke: lightgrey;
  stroke-opacity: 0.7;
  shape-rendering: crispEdges;
}
.axis line {
  stroke: #555555;
}

.axis path {
  stroke: #555555;
}

.axis text {
  fill: #555555;
}
</style>

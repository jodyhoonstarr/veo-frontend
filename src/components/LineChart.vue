<template>
  <svg :width="width" :height="height" :max-height="maxHeight">
    <g :transform="chartTransform">
      <g ref="xaxis"></g>
      <g v-if="d3Max > 0" ref="yaxisgrid" class="ygrid"></g>
      <g v-if="d3Max > 0" ref="yaxis"></g>
      <g ref="chart"></g>
    </g>
    <text
      ref="shoutout"
      :x="(width - margin.right - margin.left) / 2 + margin.left"
      :y="margin.top - 6"
      font-size="16"
      text-anchor="middle"
    ></text>
    <g ref="xaxislabel"></g>
    <g ref="yaxislabel"></g>
  </svg>
</template>

<script>
import { format } from "d3-format";
import { max, min } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { arrayIsNullorEmpty, toTitleCase } from "@/lib/utils";
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
    magnifyYAxis: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      margin: { top: 26, right: 120, bottom: 48, left: 60 },
      transitionDuration: 400,
      circleRadius: 3
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
      if (this.chartDataType === "earnings") {
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
      // if the axis prop says to magnify, use the new y Min
      let yMin;
      if (this.magnifyYAxis) {
        // add some bottom padding to the ymin used in the chart
        const newYMin = this.d3Min - (this.d3Max - this.d3Min) / 10;
        yMin = this.d3Min === 0 || newYMin <= 0 ? 0 : newYMin;
      } else {
        yMin = 0;
      }
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
    },
    spacedLabels: function() {
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
        if (
          d.data &&
          d.data.length > 0 &&
          d.data[d.data.length - 1].hasOwnProperty("value")
        ) {
          yValues[d.label] = this.y(d.data[d.data.length - 1].value);
        }
      });

      // space out overlapping y labels
      // maxheight gets an extra 1/2 of the expected font height
      return labelSpacer(yValues, 10, 1, this.y(this.chartHeight));
    },
    breakPoint: function() {
      return this.$vuetify.breakpoint.name;
    }
  },
  watch: {
    d3Data: function() {
      this.bindChartNextTick();
    },
    width: function() {
      this.bindChartNextTick();
    },
    magnifyYAxis: function() {
      this.bindChartNextTick();
    },
    breakPoint: function() {
      this.bindChartNextTick();
    }
  },
  mounted() {
    this.bindChartNextTick();
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
      if (this.breakPoint === "xs") {
        return `${dInt}`;
      } else {
        return `${dInt}-${dInt + 1}`;
      }
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
      return `${this.labelPrefix}${format("~s")(d)}`;
    },
    labelText: function(d) {
      if (d.value != null && d.value !== 0) {
        return `${this.labelPrefix}${format(",.0f")(d.value)}`;
      } else {
        return "";
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
        return "6";
      } else if (lineType === "dotted") {
        return "1, 4";
      } else {
        return "";
      }
    },
    bindLineTransitions: function(d3This, vm) {
      select(d3This)
        .on("click", function(d) {
          vm.lineClick(this, vm, d);
        })
        .on("mouseover", function(d) {
          vm.lineHoverOver(this, vm, d);
        })
        .on("mouseout", function(d) {
          vm.lineHoverOut(this, vm, d);
        });
    },
    bindLines: function() {
      const vm = this; // for use with click event in d3

      const bound = select(this.$refs.chart)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
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
                .transition("lineenter")
                .duration(this.transitionDuration)
                .attr("opacity", 1)
                .attr("stroke", d => this.chartColors[d.label])
                .attr("d", d => this.line(d.data))
                .on("end", function() {
                  vm.bindLineTransitions(this, vm);
                })
            ),

        update =>
          update.call(update =>
            update
              .on("click", null)
              .on("mouseover", null)
              .on("mouseout", null)
              .transition("lineupdate")
              .duration(this.transitionDuration)
              .attr("stroke-dasharray", d => this.lineType(d))
              .attr("stroke", d => this.chartColors[d.label])
              .attr("d", d => this.line(d.data))
              .on("end", function() {
                vm.bindLineTransitions(this, vm);
              })
          ),

        exit =>
          exit.call(exit =>
            exit
              .on("click", null)
              .on("mouseover", null)
              .on("mouseout", null)
              .transition("lineexit")
              .duration(this.transitionDuration)
              .attr("opacity", 0)
              .remove()
          )
      );
    },
    bindLabelTransitions: function(d3This, vm) {
      select(d3This)
        .on("click", function(d) {
          vm.labelClick(this, vm, d);
        })
        .on("mouseover", function(d) {
          vm.labelHoverOver(this, vm, d);
        })
        .on("mouseout", function(d) {
          vm.labelHoverOut(this, vm, d);
        });
    },
    addLabel: function(d) {
      return d.data.map(a => {
        return { cohort: a.cohort, value: a.value, label: d.label };
      });
    },
    bindPointTransitions: function(d3this, vm) {
      select(d3this)
        .on("click", function(d) {
          vm.circleClick(this, vm, d);
        })
        .on("mouseover", function(d) {
          vm.circleHoverOver(this, vm, d);
        })
        .on("mouseout", function(d) {
          vm.circleHoverOut(this, vm, d);
        });
    },
    bindPoints: function() {
      // remove and redraw the whole point series every time so it renders on top

      const vm = this; // for use with click event in d3
      const pointTransitionDuration = this.transitionDuration * 2;

      // remove any existing point events and remove circles
      select(this.$refs.chart)
        .selectAll("g.point-series")
        .selectAll("circle")
        .on("click", null)
        .on("mouseover", null)
        .on("mouseout", null)
        .remove();

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
            .attr("r", this.circleRadius)
            .attr("opacity", 0)
            .style("fill", "white")
            .style("stroke", d => this.chartColors[d.label])
            .call(enter =>
              enter
                .transition("point")
                .duration(pointTransitionDuration)
                .attr("opacity", 1)
                .on("end", function() {
                  vm.bindPointTransitions(this, vm);
                })
            )
        );
    },
    bindLabels: function() {
      const labelTransitionDuration = this.transitionDuration * 2;
      const vm = this;

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

      // .attr("y", d => spacedYValues[d.label]) // new call
      // .attr("y", d => this.y(d.data[d.data.length - 1].value)) // original call

      const labelData = select(this.$refs.chart)
        .selectAll("text")
        .data(linesFiltered, d => d.label);

      labelData.join(enter =>
        enter
          .filter(d => this.spacedLabels.hasOwnProperty(d.label))
          .append("text")
          .attr("opacity", 0)
          .attr("text-anchor", "start")
          .attr("x", this.chartWidth)
          .attr("y", d =>
            this.spacedLabels ? this.spacedLabels[d.label] : null
          )
          .attr("stroke-width", 0)
          .attr("fill", d => this.chartColors[d.label])
          .attr("dy", "3px")
          .attr("dx", "6px")
          .style("font-size", "10px")
          .text(d => {
            const labelMaxLength = 22;
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
              .transition("label")
              .duration(labelTransitionDuration)
              .attr("opacity", 1)
              .on("end", function() {
                vm.bindLabelTransitions(this, vm);
              })
          )
      );
    },
    bindAxisLabels: function() {
      const xAxisLabel = select(this.$refs.xaxislabel);
      xAxisLabel.selectAll("text").remove();
      xAxisLabel
        .append("text")
        .attr(
          "transform",
          `translate(${(this.width - this.margin.right - this.margin.left) / 2 +
            this.margin.left},${this.height - 4})`
        )
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-style", "italic")
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

      yAxisLabel
        .append("text")
        .attr(
          "transform",
          `rotate(-90) translate(-${Math.floor(
            (this.chartHeight - this.margin.top) / 2 + this.margin.top
          )},${this.margin.left - 46})`
        )
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-style", "italic")
        .attr("fill", "#555555")
        .text(yLabelText);
    },
    lineHoverOver: function(d3This, vm, d) {
      const lines = select(vm.$refs.chart).selectAll("path");

      const text = select(this.$refs.chart).selectAll("text");

      // fatten the current line
      lines
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label === d.label;
        })
        .transition("linewidth")
        .attr("stroke-width", 4);

      // fade every other line
      lines
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label !== d.label;
        })
        .transition("lineopacity")
        .attr("opacity", 0.2);

      // fade every other label
      text
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label !== d.label;
        })
        .transition("labelopacity")
        .attr("opacity", 0.2);

      // fade every other circle
      select(this.$refs.chart)
        .selectAll("g.point-series > circle")
        .attr("opacity", 1)
        .attr("r", this.circleRadius)
        .filter(function(o) {
          return o.label !== d.label;
        })
        .transition("circlesizeopacity")
        .attr("opacity", 0.2);

      // move the location of the matched label
      text
        .filter(function(o) {
          return o.label === d.label;
        })
        .transition("labelposition")
        .attr("opacity", 1)
        .attr("y", () => vm.y(d.data[d.data.length - 1].value));
    },
    lineHoverOut: function(d3This, vm, d) {
      // line - to default
      select(vm.$refs.chart)
        .selectAll("path")
        .transition("lineopacity")
        .attr("opacity", 1)
        .attr("stroke-width", 2);

      // return every text to its default
      select(this.$refs.chart)
        .selectAll("text")
        .transition("labelopacity")
        .attr("opacity", 1);

      // return every other circle to its default
      select(this.$refs.chart)
        .selectAll("g.point-series > circle")
        .transition("circlesizeopacity")
        .attr("r", this.circleRadius)
        .attr("opacity", 1);

      // label - to default
      select(this.$refs.chart)
        .selectAll("text")
        .filter(function(o) {
          return o.label === d.label;
        })
        .transition("labelposition")
        .attr("y", () =>
          this.spacedLabels ? this.spacedLabels[d.label] : null
        );
    },
    lineClick: function(d3This, vm, d) {
      const delayFactor = 12;

      // briefly make the line fat
      select(vm.$refs.chart)
        .selectAll("path")
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label === d.label;
        })
        .transition("linewidth")
        .attr("stroke-width", 4)
        .transition()
        .duration(vm.transitionDuration * delayFactor)
        .attr("stroke-width", 2);
    },
    circleHoverOver: function(d3This, vm, d) {
      const highlightColor = "#555555";

      // fill the value in the shoutout box
      select(vm.$refs.shoutout)
        .text("")
        .transition("shoutouttext")
        .text(vm.labelText(d))
        .attr("fill", highlightColor)
        .attr("opacity", 1);

      // shrink every other circle
      select(vm.$refs.chart)
        .selectAll("g.point-series > circle")
        .filter(function(o) {
          return o !== d;
        })
        .transition("circlesizeopacity")
        .attr("opacity", 1)
        .attr("r", this.circleRadius);

      // make the dot large
      select(d3This)
        .transition("thiscirclesize")
        .attr("r", 8);
    },
    circleHoverOut: function(d3This, vm, d) {
      // fade the shoutout value
      select(vm.$refs.shoutout)
        .transition("shoutouttext")
        .attr("opacity", 0);

      // shrink the dot back
      select(d3This)
        .transition("thiscirclesize")
        .attr("r", this.circleRadius);
    },
    circleClick: function(d3This, vm, d) {
      const delayFactor = 12;
      const highlightColor = "#555555";

      // shrink every other circle
      select(vm.$refs.chart)
        .selectAll("g.point-series > circle")
        .transition("circlesizeopacity")
        .attr("opacity", 1)
        .attr("r", this.circleRadius);

      // briefly show the clicked text value
      select(vm.$refs.shoutout)
        .text("")
        .transition("shoutouttext")
        .text(vm.labelText(d))
        .attr("fill", highlightColor)
        .attr("opacity", 1)
        .transition()
        .duration(vm.transitionDuration * delayFactor)
        .attr("opacity", 0);

      // briefly make the dot large
      select(d3This)
        .transition("thiscirclesize")
        .attr("r", 8)
        .transition()
        .duration(vm.transitionDuration * delayFactor)
        .attr("r", this.circleRadius);
    },
    labelHoverOver: function(d3This, vm, d) {
      const lines = select(vm.$refs.chart).selectAll("path");

      const text = select(this.$refs.chart).selectAll("text");

      // fatten the current line
      lines
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label === d.label;
        })
        .transition("linewidth")
        .attr("stroke-width", 4);

      // fade every other line
      lines
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label !== d.label;
        })
        .transition("lineopacity")
        .attr("opacity", 0.2);

      // fade every other label
      text
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label !== d.label;
        })
        .transition("labelopacity")
        .attr("opacity", 0.2);

      // fade every other circle
      select(this.$refs.chart)
        .selectAll("g.point-series > circle")
        .attr("opacity", 1)
        .attr("r", this.circleRadius)
        .filter(function(o) {
          return o.label !== d.label;
        })
        .transition("circlesizeopacity")
        .attr("opacity", 0.2);
    },
    labelHoverOut: function(d3This, vm, d) {
      // line - to default
      select(vm.$refs.chart)
        .selectAll("path")
        .transition("lineopacity")
        .attr("opacity", 1)
        .attr("stroke-width", 2);

      // return every text to its default
      select(this.$refs.chart)
        .selectAll("text")
        .transition("labelopacity")
        .attr("opacity", 1);

      // return every other circle to its default
      select(this.$refs.chart)
        .selectAll("g.point-series > circle")
        .transition("circlesizeopacity")
        .attr("r", this.circleRadius)
        .attr("opacity", 1);
    },
    labelClick: function(d3This, vm, d) {
      const delayFactor = 12;

      // briefly make the line fat
      select(vm.$refs.chart)
        .selectAll("path")
        .attr("opacity", 1)
        .filter(function(o) {
          return o.label === d.label;
        })
        .transition("linewidth")
        .attr("stroke-width", 4)
        .transition()
        .duration(vm.transitionDuration * delayFactor)
        .attr("stroke-width", 2);
    }
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

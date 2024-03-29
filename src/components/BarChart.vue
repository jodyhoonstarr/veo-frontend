<template>
  <svg
    :width="width"
    :height="height"
    :max-height="maxHeight"
  >
    <g :transform="chartTransform">
      <g ref="xaxis" />
      <g
        v-if="d3Max > 0"
        ref="yaxisgrid"
        class="ygrid"
      />
      <g
        v-if="d3Max > 0"
        ref="yaxis"
      />
      <g ref="chart" />
    </g>
    <text
      ref="shoutout"
      x="50%"
      :y="margin.top - 6"
      font-size="16"
      text-anchor="middle"
    />
    <g ref="xaxislabel" />
    <g ref="yaxislabel" />
  </svg>
</template>

<script>
import { format } from "d3-format";
import { min, max } from "d3-array";
// eslint-disable-next-line no-unused-vars
import { transition } from "d3-transition";
import { axisBottom, axisLeft } from "d3-axis";
import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { arrayIsNullorEmpty, toTitleCase } from "@/lib/utils";
import { wrapLabels } from "@/lib/utils";
import { KEYTEXT } from "@/constants/lookups";

export default {
  name: "BarChart",
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
    },
    chartLabel: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      margin: { top: 26, right: 30, bottom: 48, left: 60 },
      transitionDuration: 400,
      labelPxShift: 4,
      labelWidthThreshold: 70
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
        if (key !== "label") {
          keys.push(key);
        }
      }
      return keys;
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
    d3Groups: function() {
      if (arrayIsNullorEmpty(this.d3Data)) {
        return null;
      }
      return this.d3Data.map(function(d) {
        return d.label;
      });
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
    x0: function() {
      if (arrayIsNullorEmpty(this.d3Groups)) {
        return null;
      }
      return scaleBand()
        .rangeRound([0, this.chartWidth])
        .paddingInner(0.1)
        .domain(this.d3Groups);
    },
    x1: function() {
      if (arrayIsNullorEmpty(this.d3Keys)) {
        return null;
      }
      return scaleBand()
        .padding(0.04)
        .domain(this.d3Keys)
        .rangeRound([0, this.x0.bandwidth()]);
    },
    y: function() {
      if (this.d3Max == null || this.d3Min == null) {
        return null;
      }
      return scaleLinear()
        .rangeRound([this.chartHeight, 0])
        .domain([
          this.d3Min > 0 ? 0 : this.d3Min,
          this.d3Max === 0 ? 1 : this.d3Max
        ])
        .nice();
    },
    z: function() {
      const domain = Object.keys(this.chartColors);
      const range = domain.map(k => this.chartColors[k]);
      if (Object.keys(this.chartColors).length > 1) {
        return scaleOrdinal()
          .domain(domain)
          .range(range);
      } else {
        return scaleOrdinal().range(range);
      }
    },
    scale: function() {
      return { x: this.x0, y: this.y };
    },
    textAnchor: function() {
      return "middle";
    },
    labelFontSizePx: function() {
      if (this.x1 == null) {
        return 16; // default font size if not bandwidth
      }
      // estimated "good" ratio 28px font, 108px bandwidth
      const fontSize = Math.floor((24 / 108) * this.x1.bandwidth());
      // minimum font size to display
      const minFontSize = 12;
      const maxFontSize = 32;
      if (fontSize < minFontSize) {
        // if too small, don't show any font
        return 0;
      } else if (fontSize > maxFontSize) {
        // if too large, set to max pix size
        return maxFontSize;
      } else {
        // otherwise just show the font
        return fontSize;
      }
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
      this.bindChartNextTick();
    },
    width: function() {
      this.bindChartNextTick();
    }
  },
  mounted() {
    this.bindChartNextTick();
  },
  methods: {
    bindChartNextTick: function() {
      this.$nextTick(() => {
        this.bindXAxis();
        this.bindYAxis();
        this.bindRects();
        this.bindLabels();
        this.bindAxisLabels();
      });
    },
    // TODO the function labeling here is a bit messy, clean up
    // label groups and bar groups are mixed in terminology
    // sometimes the label means the text label, other times the label prop
    notNullandHasProp: function(obj, propname) {
      return obj != null && Object.prototype.hasOwnProperty.call(obj, propname);
    },
    chartYBottom: function() {
      if (this.chartHeight) {
        return this.chartHeight;
      } else {
        return 0;
      }
    },
    labelGroupXOffset: function(d) {
      if (this.x0 && this.notNullandHasProp(d, "label")) {
        return this.x0(d.label);
      }
    },
    labelXPosition: function(d) {
      return (
        this.labelGroupXOffset(d) + this.barXPosition(d) + this.barWidth() / 2
      );
    },
    barXFullPosition: function(d) {
      return this.labelGroupXOffset(d) + this.barXPosition(d);
    },
    labelTransformInit: function(d) {
      // an initial y position transform for transition
      return `translate(${this.labelXPosition(d) || 0},${this.chartYBottom()})`;
    },
    barTransformInit: function(d) {
      // an initial y position transform for transition
      return `translate(${this.barXFullPosition(d) ||
        0},${this.chartYBottom()})`;
    },
    labelTransform: function(d) {
      const rotate = 0;
      return `translate(${this.labelXPosition(d)},${this.barYPosition(d) +
        this.validateLabelHeight(d).fontOffset}) rotate(${rotate})`;
    },
    barTransform: function(d) {
      return `translate(${this.barXFullPosition(d)},${this.barYPosition(d)})`;
    },
    barXPosition: function(d) {
      if (this.x1 && this.notNullandHasProp(d, "key")) {
        return this.x1(d.key);
      }
    },
    barYPosition: function(d) {
      if (this.y && this.notNullandHasProp(d, "value")) {
        return this.y(d.value);
      }
    },
    barHeight: function(d) {
      if (this.y && this.notNullandHasProp(d, "value")) {
        return this.chartHeight - this.y(d.value);
      }
    },
    barWidth: function() {
      if (this.x1 != null) {
        return this.x1.bandwidth();
      }
    },
    barFill: function(d) {
      if (this.z && this.notNullandHasProp(d, "key")) {
        return this.z(d.key);
      }
    },
    barData: function(d) {
      return this.d3Keys.map(function(key) {
        return { key: key, value: d[key] || 0, label: d.label };
      });
    },
    labelText: function(d) {
      if (d.value != null && d.value !== 0) {
        return `${this.labelPrefix}${format(",.0f")(d.value)}`;
      } else {
        return "";
      }
    },
    labelFontColor: function(d) {
      // if the label is above the bar, label it with the bar color, else white
      return this.barHeight(d) > this.labelFontSizePx + this.labelPxShift
        ? "white"
        : this.barFill(d);
    },
    validateLabelHeight: function(d) {
      let returnObj = {
        fontSize: 0,
        fontOffset: 0
      };
      // horizontal labels
      // this handles cases where the label font is larger than the rect
      const barHeight = this.barHeight(d);
      if (barHeight > this.labelFontSizePx + this.labelPxShift) {
        returnObj.fontSize = this.labelFontSizePx;
        returnObj.fontOffset = this.labelFontSizePx + this.labelPxShift;
      } else {
        // if the label is very tiny, move the label above the bar
        returnObj.fontSize = this.labelFontSizePx;
        returnObj.fontOffset = -this.labelPxShift;
      }
      return returnObj;
    },
    labelFontSize: function(d) {
      // handle the negative value
      return `${Math.abs(this.validateLabelHeight(d).fontSize)}px`;
    },
    bindLabels: function() {
      const bound = select(this.$refs.chart)
        .selectAll("g.labelgroup")
        .data(this.d3Data);

      // exit the text
      bound
        .exit()
        .selectAll("text")
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 0)
        .style("font-size", 0)
        .attr("height", 0)
        .attr("transform", this.labelTransformInit)
        .remove();
      // exit the g.labelgroup
      bound
        .exit()
        .transition()
        .delay(this.transitionDuration)
        .remove();

      // enter
      bound
        .enter()
        .append("g")
        .attr("class", "labelgroup")
        .selectAll("text")
        .data(this.barData)
        .enter()
        .append("text")
        .text(this.labelText)
        .style("opacity", 0)
        .style("font-size", 0)
        .attr("height", 0)
        .attr("text-anchor", this.textAnchor)
        .attr("fill", this.labelFontColor)
        .attr("transform", this.labelTransformInit)
        .transition()
        .delay(this.transitionDuration / 2)
        .style("opacity", 1)
        .style("font-size", this.labelFontSize)
        .attr("transform", this.labelTransform);

      // update
      const boundText = bound.selectAll("text").data(this.barData);

      //if there are less texts than the previous
      boundText
        .exit()
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 0)
        .style("font-size", 0)
        .attr("height", 0)
        .attr("transform", this.labelTransformInit)
        .remove();

      // if there are more texts than previous
      boundText
        .enter()
        .append("text")
        .attr("text-anchor", this.textAnchor)
        .attr("transform", this.labelTransformInit)
        .style("opacity", 0)
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 1)
        .text(this.labelText)
        .style("font-size", this.labelFontSize)
        .attr("fill", this.labelFontColor)
        .attr("transform", this.labelTransform);

      // if there are the same number of bars as previous
      boundText
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 1)
        .text(this.labelText)
        .style("font-size", this.labelFontSize)
        .attr("fill", this.labelFontColor)
        .attr("transform", this.labelTransform);
    },
    shortenString: function(str, maxLen) {
      // shorten a string using whole words up to a space or comma
      const separators = [" ", ","];
      if (str.length <= maxLen) {
        return str;
      } else if (str.split(" ").length === 1) {
        return str;
      }

      let strippedString = str
        .substr(0, maxLen)
        .replace(/,+$/, "")
        .replace(/\s+$/, "");
      let minSeparator = Math.min(
        ...separators.map(s => {
          const idx = strippedString.lastIndexOf(s, maxLen);
          if (idx === -1) {
            return maxLen;
          } else {
            return idx;
          }
        })
      );

      // remove trailing and/or
      const trimmedWord = str.substr(0, minSeparator);
      const trimmedArray = trimmedWord.split(" ");
      if (["and", "or"].includes(trimmedArray[trimmedArray.length - 1])) {
        let lastIndex = trimmedWord.lastIndexOf(" ");
        return trimmedWord.substring(0, lastIndex);
      } else {
        return trimmedWord;
      }
    },
    formatShoutoutText: function(d) {
      // format the shout text

      // if the labels are hidden, add them to the shoutout
      if (this.xLabelOpacity() === 0) {
        const charMax = 20;

        let label;
        if (d.label.length > charMax) {
          label = `${this.shortenString(d.label, charMax)}`;
        } else {
          label = d.label;
        }
        return `${label} (${KEYTEXT[d.key]}): ${this.labelText(d)}`;
      } else {
        // if not hidde, show the number
        return `${this.labelText(d)}`;
      }
    },
    barHoverOver: function(d3This, vm, d) {
      const strokeWidth = 4;
      const highlightColor = "#555555";

      // de-highlight every other rect
      selectAll("g.bargroup > rect")
        .transition()
        .attr("stroke-width", 0);

      // show the clicked text value
      select(vm.$refs.shoutout)
        .text("")
        .transition()
        .text(vm.formatShoutoutText(d))
        .attr("fill", highlightColor)
        .attr("opacity", 1);

      // outline the bar
      select(d3This)
        .transition()
        .attr("stroke", highlightColor)
        .attr("stroke-width", strokeWidth);
    },
    barHoverOut: function(d3This, vm) {
      // fade the shoutout
      select(vm.$refs.shoutout)
        .transition()
        .duration(vm.transitionDuration)
        .attr("opacity", 0);

      // fade the bar outline
      select(d3This)
        .transition()
        .duration(vm.transitionDuration)
        .attr("stroke-width", 0);
    },
    barClick: function(d3This, vm, d) {
      const delayFactor = 12;
      const strokeWidth = 4;
      const highlightColor = "#555555";

      // de-highlight every other rect
      selectAll("g.bargroup > rect")
        .transition()
        .attr("stroke-width", 0);

      // briefly show the clicked text value
      select(vm.$refs.shoutout)
        .text("")
        .transition()
        .text(vm.formatShoutoutText(d))
        .attr("fill", highlightColor)
        .attr("opacity", 1)
        .transition()
        .duration(vm.transitionDuration * delayFactor)
        .attr("opacity", 0);

      // briefly outline the bar
      select(d3This)
        .transition()
        .attr("stroke", highlightColor)
        .attr("stroke-width", strokeWidth)
        .transition()
        .duration(vm.transitionDuration * delayFactor)
        .attr("stroke-width", 0);
    },
    bindBarTransitions: function() {
      const vm = this; // for use with click event in d3
      select(this.$refs.chart)
        .selectAll("g.bargroup")
        .selectAll("rect")
        .on("click", function(d) {
          vm.barClick(this, vm, d);
        })
        .on("mouseover", function(d) {
          vm.barHoverOver(this, vm, d);
        })
        .on("mouseout", function(d) {
          vm.barHoverOut(this, vm, d);
        });
    },
    bindRects: function() {
      const bound = select(this.$refs.chart)
        .selectAll("g.bargroup")
        .data(this.d3Data);

      // exit the rects
      bound
        .exit()
        .selectAll("rect")
        .on("click", null)
        .on("mouseover", null)
        .on("mouseout", null)
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 0)
        .attr("height", 0)
        .remove();
      // exit the g.bargroup
      bound
        .exit()
        .transition()
        .delay(this.transitionDuration)
        .remove();

      bound
        .enter()
        .append("g")
        .attr("class", "bargroup")
        .selectAll("rect")
        .data(this.barData)
        .enter()
        .append("rect")
        .style("opacity", 0)
        .attr("height", 0)
        .attr("transform", this.barTransformInit)
        .attr("width", this.barWidth)
        .transition()
        .attr("fill", this.barFill)
        .delay(this.transitionDuration / 2)
        .style("opacity", 1)
        .attr("transform", this.barTransform)
        .attr("height", this.barHeight)
        .on("end", this.bindBarTransitions);

      // update
      const boundBars = bound.selectAll("rect").data(this.barData);

      //if there are less bars than the previous
      boundBars
        .exit()
        .on("click", null)
        .on("mouseover", null)
        .on("mouseout", null)
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 0)
        .attr("height", 0)
        .attr("transform", this.barTransformInit)
        .remove();

      // if there are more bars than previous
      boundBars
        .enter()
        .append("rect")
        .attr("transform", this.barTransformInit)
        .attr("width", this.barWidth)
        .attr("height", 0)
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 1)
        .attr("height", this.barHeight)
        .attr("fill", this.barFill)
        .attr("transform", this.barTransform)
        .on("end", this.bindBarTransitions);

      // if there are the same number of bars as previous
      boundBars
        .on("click", null)
        .on("mouseover", null)
        .on("mouseout", null)
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 1)
        .attr("height", this.barHeight)
        .attr("width", this.barWidth)
        .attr("fill", this.barFill)
        .attr("transform", this.barTransform)
        .on("end", this.bindBarTransitions);
    },
    xLabelOpacity: function() {
      if (this.x0) {
        return this.x0.bandwidth() < this.labelWidthThreshold ? 0 : 1;
      } else {
        return 1;
      }
    },
    bindXAxis: function() {
      const xaxis = select(this.$refs.xaxis);
      xaxis
        .attr("transform", `translate(0,${this.chartHeight})`)
        .attr("class", "axis")
        .call(axisBottom(this.x0))
        .transition()
        .duration(this.transitionDuration)
        .selectAll(".tick text")
        .style("font-size", "12px")
        .attr("opacity", this.xLabelOpacity())
        .call(wrapLabels, this.x0.bandwidth())
        .selectAll("text");
    },
    processTickFormat: function(d) {
      return `${this.labelPrefix}${format("~s")(d)}`;
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
    bindAxisLabels: function() {
      const xAxisLabel = select(this.$refs.xaxislabel);
      xAxisLabel.selectAll("text").remove();

      let xLabelText;
      const clab = toTitleCase(this.chartLabel);
      if (this.x0) {
        xLabelText =
          this.x0.bandwidth() < this.labelWidthThreshold
            ? `${clab} (Click on Bar to Show)`
            : clab;
      } else {
        xLabelText = clab;
      }

      xAxisLabel
        .append("text")
        .attr(
          "transform",
          `translate(${this.width / 2 + 14},${this.height - 4})`
        )
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-style", "italic")
        .attr("fill", "#555555")
        .text(xLabelText);

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

<template>
  <svg :width="width" :height="height" :max-height="maxHeight">
    <g :transform="chartTransform">
      <g ref="chart"></g>
      <g
        v-if="scale.x != null && d3Data"
        v-axis:x="scale"
        :transform="`translate(0,${chartHeight})`"
      />
      <g v-if="scale.y != null && d3Data" v-axis:y="scale" />
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
    }
  },
  data() {
    return {
      margin: { top: 10, right: 30, bottom: 30, left: 60 },
      transitionDuration: 400,
      rotateLabels: false
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
        .domain([this.d3Min > 0 ? 0 : this.d3Min, this.d3Max])
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
    }
  },
  directives: {
    axis: function(el, binding, vnode) {
      if (binding.value != null) {
        const axis = binding.arg;
        const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
        const methodArg = binding.value[axis];

        // ? calling [axisMethod] causes error, hardcoded works, namespace issue possible
        if (axisMethod === "axisBottom") {
          select(el)
            .call(axisBottom(methodArg))
            .selectAll(".tick text")
            .transition()
            .duration(vnode.context.transitionDuration)
            .attr("font-family", "Helvetica, Arial, sans-serif;")
            .call(wrapLabels, vnode.context.x0.bandwidth());
        } else if (axisMethod === "axisLeft") {
          select(el).call(axisLeft(methodArg));
        }
      }
    }
  },
  watch: {
    d3Data: function() {
      this.$nextTick(() => {
        this.bindRects();
        this.bindLabels();
      });
    },
    width: function() {
      this.$nextTick(() => {
        this.bindRects();
        this.bindLabels();
      });
    }
  },
  methods: {
    // TODO the function labeling here is a bit messy, clean up
    // label groups and bar groups are mixed in terminology
    // sometimes the label means the text label, other times the label prop
    notNullandHasProp: function(obj, propname) {
      return obj != null && obj.hasOwnProperty(propname);
    },
    chartYBottom: function() {
      if (this.y) {
        return this.y(this.chartHeight);
      }
    },
    labelGroupXOffset: function(d) {
      if (this.x0 && this.notNullandHasProp(d, "label")) {
        return this.x0(d.label);
      }
    },
    labelXPosition: function(d) {
      return this.labelGroupXOffset(d) + this.barXPosition(d);
    },
    labelTransformInit: function(d) {
      // an initial y position transform for transition
      const rotate = this.rotateLabels ? -90 : 0;
      return `translate(${this.labelXPosition(d) ||
        0},${this.chartYBottom()}) rotate(${rotate})`;
    },
    barTransformInit: function(d) {
      // an initial y position transform for transition
      return `translate(${this.labelXPosition(d) || 0},${this.chartYBottom()})`;
    },
    labelTransform: function(d) {
      const rotate = this.rotateLabels ? -90 : 0;
      return `translate(${this.labelXPosition(d)},${this.barYPosition(
        d
      )}) rotate(${rotate})`;
    },
    barTransform: function(d) {
      return `translate(${this.labelXPosition(d)},${this.barYPosition(d)})`;
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
      if (d.value !== 0) {
        return `${format(",.0f")(d.value)}`;
      }
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
        .attr("fill", "black")
        .attr("transform", this.labelTransform);

      // update
      const boundText = bound.selectAll("text").data(this.barData);

      //if there are less texts than the previous
      boundText
        .exit()
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 0)
        .attr("height", 0)
        .attr("transform", this.labelTransformInit)
        .remove();

      // if there are more texts than previous
      boundText
        .enter()
        .append("text")
        .attr("transform", this.labelTransformInit)
        .style("opacity", 0)
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 1)
        .text(this.labelText)
        .attr("fill", "black")
        .attr("transform", this.labelTransform);

      // if there are the same number of bars as previous
      boundText
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 1)
        .text(this.labelText)
        .attr("fill", "black")
        .attr("transform", this.labelTransform);
    },
    bindRects: function() {
      const bound = select(this.$refs.chart)
        .selectAll("g.bargroup")
        .data(this.d3Data);

      // exit the rects
      bound
        .exit()
        .selectAll("rect")
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 0)
        .attr("height", 0)
        .attr("transform", this.barTransformInit)
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
        .attr("transform", this.barTransform)
        .attr("width", this.barWidth)
        .attr("height", this.barHeight)
        .attr("fill", this.barFill);

      // update
      const boundBars = bound.selectAll("rect").data(this.barData);

      //if there are less bars than the previous
      boundBars
        .exit()
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
        .attr("transform", this.barTransform);

      // if there are the same number of bars as previous
      boundBars
        .transition()
        .duration(this.transitionDuration)
        .style("opacity", 1)
        .attr("height", this.barHeight)
        .attr("width", this.barWidth)
        .attr("fill", this.barFill)
        .attr("transform", this.barTransform);
    }
  }
};
</script>

<style scoped></style>

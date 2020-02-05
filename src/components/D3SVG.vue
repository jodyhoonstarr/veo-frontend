<template>
  <svg :width="width" :height="height" :max-height="maxHeight">
    <g :transform="chartTransform" ref="container">
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
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { min, max } from "d3-array";
import { select, selectAll } from "d3-selection";
import { arrayIsNullorEmpty } from "@/components/utils";

export default {
  name: "D3SVG",
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
    }
  },
  data() {
    return {
      margin: { top: 10, right: 30, bottom: 30, left: 60 }
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
      return scaleOrdinal().range([
        "#98abc5",
        "#8a89a6",
        "#7b6888",
        "#6b486b",
        "#a05d56",
        "#d0743c",
        "#ff8c00"
      ]);
    },
    scale: function() {
      return { x: this.x0, y: this.y };
    }
  },
  directives: {
    axis: function(el, binding) {
      if (binding.value != null) {
        const axis = binding.arg;
        const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
        const methodArg = binding.value[axis];

        // ? calling [axisMethod] causes error, hardcoded works, namespace issue possible
        if (axisMethod === "axisBottom") {
          select(el).call(axisBottom(methodArg));
        } else if (axisMethod === "axisLeft") {
          select(el).call(axisLeft(methodArg));
        }
      }
    }
  }
};
</script>

<style scoped></style>

<template>
  <div>
    <svg :id="id" :width="svgWidth" :height="svgHeight" :max-height="svgMaxHeight">
      <!-- wrapper group with margins -->
      <g :transform="chartTransform">
        <!-- bar groups -->
        <g
          v-for="barGroup in d3Data"
          class="bargroup"
          :transform="getBarGroupTransform(barGroup.label)"
        >
          <template v-for="(value, key) in barGroup" v-if="!isNaN(value) || key !== 'label'">
            <!-- individual bars -->
            <rect
              class="bar"
              :id="`${barGroup.label}-${key}`"
              :width="x1.bandwidth()"
              :x="x1(key)"
              :y="y(value)"
              :height="chartHeight - y(value)"
              :fill="z(key)"
            />

            <!-- individual labels -->
            <text
              class="barlabel hidden-xs-only"
              text-anchor="middle"
              fill="white"
              :id="`${barGroup.label}-${key}`"
              :x="x1(key) + x1.bandwidth()/2"
              :y="y(value)+ 20"
              :height="chartHeight - y(value)"
            >{{ value }}</text>
          </template>
        </g>

        <g v-axis:x="scale" :transform="`translate(0,${chartHeight})`" />
        <g v-axis:y="scale" />
      </g>
    </svg>
  </div>
</template>

<script>
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  max,
  min,
  select,
  selectAll,
  axisBottom,
  axisLeft
} from "d3";

export default {
  name: "BarChartGrouped",
  props: ["id", "svgWidth", "chartData"],
  data() {
    return {
      svgRatio: 1.9,
      svgMaxHeight: 400,
      margin: { top: 10, right: 30, bottom: 30, left: 60 }
    };
  },
  computed: {
    svgHeight: function() {
      const calculatedHeight = Math.floor(this.svgWidth / this.svgRatio);
      if (calculatedHeight < this.svgMaxHeight) {
        return calculatedHeight;
      } else {
        return this.svgMaxHeight;
      }
    },
    chartTransform: function() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    },
    chartWidth: function() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    chartHeight: function() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    d3DataKeys: function() {
      let keys = [];
      for (const key of Object.keys(this.chartData[0])) {
        if (key !== "label") {
          keys.push(key);
        }
      }
      return keys;
    },
    d3Data: function() {
      // convert everything but the label to numeric
      let newArr = [];
      this.chartData.map(obj => {
        let newObj = {};
        for (const key of Object.keys(obj)) {
          if (this.d3DataKeys.includes(key)) {
            newObj[key] = +obj[key];
          } else {
            newObj[key] = obj[key];
          }
        }
        newArr.push(newObj);
      });
      return newArr;
    },
    d3DataGroups: function() {
      return this.d3Data.map(function(d) {
        return d.label;
      });
    },
    d3DataMax: function() {
      const vm = this;
      return max(vm.d3Data, function(d) {
        return max(vm.d3DataKeys, function(key) {
          return d[key];
        });
      });
    },
    d3DataMin: function() {
      const vm = this;
      return min(vm.d3Data, function(d) {
        return min(vm.d3DataKeys, function(key) {
          return d[key];
        });
      });
    },
    x0: function() {
      return scaleBand()
        .rangeRound([0, this.chartWidth])
        .paddingInner(0.1)
        .domain(this.d3DataGroups);
    },
    x1: function() {
      return scaleBand()
        .padding(0.04)
        .domain(this.d3DataKeys)
        .rangeRound([0, this.x0.bandwidth()]);
    },
    y: function() {
      return scaleLinear()
        .rangeRound([this.chartHeight, 0])
        .domain([this.d3DataMin > 0 ? 0 : this.d3DataMin, this.d3DataMax])
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
      const x = this.x0;
      const y = this.y;
      return { x, y };
    }
  },
  methods: {
    getBarGroupTransform: function(key) {
      return `translate(${this.x0(key)},0)`;
    }
  },
  directives: {
    axis(el, binding) {
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
};
</script>

<style lang="scss" scoped>
</style>>

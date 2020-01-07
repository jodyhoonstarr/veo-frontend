<template>
  <div>
    <svg :id="id" :style="svgStyle">
      <!-- wrapper group with margins -->
      <g :transform="transform">
        <!-- bar groups -->
        <g
          v-for="barGroup in tempData"
          class="bargroup"
          :transform="getBarTransform(barGroup.State)"
        >
          <!-- individual bars -->
          <rect
            v-for="(value, key) in barGroup"
            v-if="!isNaN(value)"
            class="bar"
            :id="`${barGroup.State}-${key}`"
            :width="x1.bandwidth()"
            :x="x1(key)"
            :y="y(value)"
            :height="height - y(value)"
            :fill="z(key)"
          />
        </g>

        <!-- temporary placeholder -->
        <!-- <rect :width="width" :height="height" fill="LightGray" /> -->
      </g>
    </svg>
  </div>
</template>

<script>
import { csv } from "d3"; //TODO remove when done testing
import { scaleBand, scaleLinear, scaleOrdinal, max } from "d3";

export default {
  name: "BarChartGrouped_test",
  props: ["id", "svgWidth", "svgData"],
  data() {
    return {
      svgRatio: 1.9,
      tempData: null,
      tempKeys: null,
      maxHeight: 400,
      margin: { top: 10, right: 10, bottom: 30, left: 40 }
    };
  },
  computed: {
    svgHeight: function() {
      const calculatedHeight = Math.floor(this.svgWidth / this.svgRatio);
      return calculatedHeight > this.maxHeight
        ? this.maxHeight
        : calculatedHeight;
    },
    svgStyle: function() {
      return `width: ${this.svgWidth}px; height: ${this.svgHeight}px; max-height: ${this.maxHeight}px;`;
    },
    transform: function() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    },
    width: function() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height: function() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    group: function() {
      if (this.dataGroup && this.dataCut && this.dataCutSelection) {
        return this.dataGroup;
      }
    },
    cut: function() {
      if (this.dataGroup && this.dataCut ** this.dataCutSelection) {
        return this.dataCut;
      }
    },
    cutSelection: function() {
      if (this.dataGroup && this.dataCut && this.dataCutSelection) {
        return this.dataCutSelection;
      }
    },
    x0: function() {
      if (this.tempData[0].State) {
        return scaleBand()
          .rangeRound([0, this.width])
          .paddingInner(0.1)
          .domain(
            this.tempData.map(function(d) {
              return d.State;
            })
          );
      } else {
        return scaleBand()
          .rangeRound([0, this.width])
          .paddingInner(0.1);
      }
    },
    x1: function() {
      return scaleBand().padding(0.05);
    },
    y: function() {
      const that = this;
      if (this.tempData) {
        return scaleLinear()
          .rangeRound([that.height, 0])
          .domain([
            0,
            max(that.tempData, function(d) {
              return max(that.tempKeys, function(key) {
                return +d[key];
              });
            })
          ])
          .nice();
      } else {
        return scaleLinear().rangeRound([this.height, 0]);
      }
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
    }
  },
  methods: {
    getBarTransform: function(state) {
      return `translate(${this.x0(state)},0)`;
    },
    log: function(height, value) {
      console.log(`log : ${height} : ${value}`);
      console.log(`calc : ${this.y(value)} : ${height + this.y(value)}`);
    }
  },
  mounted() {
    //TODO remove tempdata when done testing
    csv("/data.csv").then(data => {
      this.tempData = data;
      const keys = data.columns.slice(1);
      this.tempKeys = keys;

      //FIXME make domain settings watchers?
      this.x0.domain(
        this.tempData.map(function(d) {
          return d.State;
        })
      );
      this.x1.domain(keys).rangeRound([0, this.x0.bandwidth()]);
      this.y
        .domain([
          0,
          max(data, function(d) {
            return max(keys, function(key) {
              return +d[key];
            });
          })
        ])
        .nice();

      console.log("max");

      console.log(
        max(data, function(d) {
          return max(keys, function(key) {
            return +d[key];
          });
        })
      );
    });
  }
};
</script>

<style lang="scss" scoped>
</style>>

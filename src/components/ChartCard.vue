<template>
  <v-row>
    <v-col cols="12">
      <v-card :ref="value.id" outlined>
        <v-row align="baseline">
          <v-col xs="12" sm="6">
            <v-card-title>{{ value.label }}</v-card-title>
          </v-col>
          <v-col xs="12" sm="6" class="text-right">
            <v-card-subtitle>
              Data:
              <ChartFilters @change="updateFilter" :value="filters"></ChartFilters>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <BarChart :id="value.id" :svgwidth="width" :svgdata="svgData"></BarChart>
        <!-- <v-card-text>width: {{ width }}</v-card-text> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import ChartFilters from "@/components/ChartFilters.vue";

export default {
  name: "ChartCard",
  components: { BarChart, ChartFilters },
  props: ["value", "chartData", "filters"],
  data() {
    return {
      width: 0,
      filter: null
    };
  },
  computed: {
    svgData: function() {
      if (this.filter && this.chartData) {
        let objKeys = Object.keys(this.chartData[0]);
        let keepKeys = objKeys.filter(k => {
          return (
            k
              .toLocaleLowerCase()
              .indexOf(`_${this.filter.id.toLocaleLowerCase()}`) > -1 &&
            k.toLocaleLowerCase().indexOf("status") === -1
          );
        });

        keepKeys.unshift("dod_occ_code");
        //TODO get occ_code label instead of numeric in data files
        // keep only the selected keys from the original data
        return this.chartData.map(function(o) {
          return Object.assign(
            {},
            ...keepKeys.map(prop => ({ [prop]: o[prop] }))
          );
        });
      }
    }
  },
  methods: {
    handleResize: function() {
      this.width = Math.floor(this.$refs[this.value.id].$el.clientWidth);
    },
    updateFilter(filter) {
      this.filter = filter;
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

<style lang="scss" scoped>
</style>

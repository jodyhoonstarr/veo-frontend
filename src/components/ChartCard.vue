<template>
  <v-row>
    <v-col cols="12">
      <v-card :ref="value.id" outlined>
        <v-row>
          <v-col xs="12" sm="6">
            <v-card-title>{{ value.label }}</v-card-title>
          </v-col>
          <v-col xs="12" sm="6" class="text-right">
            <v-btn-toggle v-model="activeFilter" mandatory tile group dense>
              <template v-for="filter in filters" :value="filter">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on">{{filter.short}}</v-btn>
                  </template>
                  <span>{{filter.label}}</span>
                </v-tooltip>
              </template>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <BarChart :id="value.id" :svgwidth="width"></BarChart>
        <!-- <v-card-text>width: {{ width }}</v-card-text> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: "ChartCard",
  components: { BarChart },
  props: ["value", "chartData", "filters"],
  data() {
    return {
      width: 0,
      activeFilter: null
    };
  },
  methods: {
    handleResize: function() {
      this.width = Math.floor(this.$refs[this.value.id].$el.clientWidth);
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

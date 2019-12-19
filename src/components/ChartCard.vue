<template>
  <v-row>
    <v-col cols="12">
      <v-card :ref="value.id" outlined>
        <v-card-title>{{ value.id }}</v-card-title>
        <v-card-subtitle>{{ value.label }}</v-card-subtitle>
        <v-card-text>Chart area here</v-card-text>
        <BarChart :id="value.id" :svgwidth="width"></BarChart>
        <v-card-text>width: {{ width }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: "ChartCard",
  components: { BarChart },
  props: ["value"],
  data() {
    return {
      width: 0
    };
  },
  methods: {
    handleResize: function() {
      this.width = this.$refs[this.value.id].$el.clientWidth;
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

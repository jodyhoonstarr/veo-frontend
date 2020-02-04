<template>
  <v-card ref="chartcard" flat>
    <v-card-title>Card Title</v-card-title>
    <v-card-text>Chart goes here</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      width: null,
      ratio: 1.9,
      maxHeight: 400
    };
  },
  computed: {
    height: function() {
      if (this.width == null) {
        return null;
      }
      const calculatedHeight = Math.floor(this.width / this.ratio);
      return calculatedHeight < this.maxHeight
        ? calculatedHeight
        : this.maxHeight;
    }
  },
  methods: {
    handleResize: function() {
      this.width = Math.floor(this.$refs.chartcard.$el.clientWidth);
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

<style scoped></style>

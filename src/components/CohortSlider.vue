<template>
  <v-row class="pt-5">
    <v-col class="pt-5">
      <v-range-slider
        v-if="textLabels"
        v-model="range"
        :tick-labels="textLabels"
        min="0"
        :max="labelCountZeroIdx"
        ticks="always"
        tick-size="4"
        thumb-label="always"
        color="primary"
        thumb-color="primary"
        track-color="grey"
        track-fill-color="primary"
        :loading="loading"
      >
        <template v-slot:thumb-label="{ value }">
          <v-icon dark>
            {{ icon(value) }}
          </v-icon>
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CohortSlider",
  props: {
    items: {
      type: Object, // object with a single labels property
      default: null
    },
    loading: {
      type: Boolean,
      required: true
    },
    value: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      range: null
    };
  },
  methods: {
    icon(value) {
      const iconLeft = "mdi-ray-start-arrow";
      const iconRight = "mdi-ray-end-arrow";
      const iconWarn = "mdi-alert-circle-outline";
      if (this.rangeMax === this.rangeMin) {
        return iconWarn;
      } else if (value === this.rangeMax) {
        return iconRight;
      } else {
        return iconLeft;
      }
    }
  },
  computed: {
    textLabels: function() {
      if (this.fullLabels != null) {
        return this.fullLabels.map(val => {
          return val.id; // label with the short for now
        });
      }
    },
    fullLabels: function() {
      if (this.items != null && this.items.hasOwnProperty("labels")) {
        return this.items.labels;
      }
    },
    labelCountZeroIdx: function() {
      if (this.fullLabels != null && this.fullLabels.length > 1) {
        return this.fullLabels.length - 1;
      } else {
        return 0;
      }
    },
    rangeMax: function() {
      return Math.max(...this.range);
    },
    rangeMin: function() {
      return Math.min(...this.range);
    }
  },
  watch: {
    items: function() {
      // only set the range using the label set if the value is undefined
      if (
        this.value == null &&
        this.fullLabels != null &&
        Array.isArray(this.fullLabels)
      ) {
        this.range = [0, this.fullLabels.length - 1];
      }
    },
    range: function() {
      this.$emit(
        "change",
        this.fullLabels.slice(this.rangeMin, this.rangeMax + 1)
      );
    },
    value: function() {
      if (Array.isArray(this.value) && this.value.length === 2) {
        this.range = this.value;
      }
    }
  }
};
</script>

<style scoped></style>

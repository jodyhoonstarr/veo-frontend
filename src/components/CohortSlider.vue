<template>
  <v-row class="pt-3">
    <v-col class="pt-3">
      <v-container>
        <v-range-slider
          v-if="textLabels"
          :value="range"
          @input="handleRange"
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
      </v-container>
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
      rangeMin: null,
      rangeMax: null
    };
  },
  methods: {
    icon: function(value) {
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
    },
    handleRange: function(r) {
      this.rangeMin = Math.min(...r);
      this.rangeMax = Math.max(...r);
    }
  },
  computed: {
    range: function() {
      return [this.rangeMin, this.rangeMax];
    },
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
    }
  },
  watch: {
    items: function() {
      // only set the range using the label set if the value is undefined
      if (
        this.rangeMin == null &&
        this.rangeMax == null &&
        this.fullLabels != null &&
        Array.isArray(this.fullLabels)
      ) {
        this.rangeMin = 0;
        this.rangeMax = this.fullLabels.length - 1;
      }
    },
    range: function() {
      this.$emit(
        "input",
        this.fullLabels.slice(this.rangeMin, this.rangeMax + 1)
      );
    },
    value: function() {
      if (Array.isArray(this.value)) {
        this.rangeMin = this.fullLabels.findIndex(
          e => e.id === this.value[0].id
        );
        this.rangeMax = this.fullLabels.findIndex(
          e => e.id === this.value[this.value.length - 1].id
        );
      }
    }
  }
};
</script>

<style>
.v-slider--horizontal .v-slider__tick:last-child .v-slider__tick-label {
  transform: translate(-50%) !important;
}
.v-slider--horizontal .v-slider__tick:first-child .v-slider__tick-label {
  transform: translate(-50%) !important;
}
</style>

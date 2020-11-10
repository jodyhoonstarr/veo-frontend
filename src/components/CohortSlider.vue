<template>
  <v-container>
    <!-- A slider bar and tick box when there's an aggregate over time -->
    <v-range-slider
      v-if="textLabels && returnMargins"
      :value="range"
      :tick-labels="textLabels"
      :min="labelCountZeroIdxMarginStart"
      :max="labelCountZeroIdx"
      ticks="always"
      tick-size="4"
      color="primary"
      thumb-color="primary"
      track-color="grey"
      track-fill-color="primary"
      thumb-label="always"
      persistent-hint
      hint="Exit cohort, two-year range"
      @input="handleRange"
    >
      <template v-slot:thumb-label="{ value: iconname }">
        <v-icon dark>
          {{ icon(iconname) }}
        </v-icon>
      </template>
    </v-range-slider>
    <!-- A slider bar when there are individual time units, no aggregates -->
    <v-range-slider
      v-else-if="textLabels"
      :value="range"
      :tick-labels="textLabels"
      min="0"
      :max="labelCountZeroIdx"
      ticks="always"
      tick-size="4"
      color="primary"
      thumb-color="primary"
      track-color="grey"
      track-fill-color="primary"
      thumb-label="always"
      persistent-hint
      hint="Exit cohort, two-year range"
      @input="handleRange"
    >
      <template v-slot:thumb-label="{ value: iconname }">
        <v-icon dark>
          {{ icon(iconname) }}
        </v-icon>
      </template>
    </v-range-slider>
    <!-- A loading indicator -->
    <v-slider v-else-if="loading" :disabled="true" value="30"></v-slider>
    <!-- A visual cue if data fails to load -->
    <v-slider
      v-else-if="items === null"
      label="Error"
      :disabled="true"
      value="30"
    ></v-slider>
    <!-- A visual placeholder for any other case -->
    <v-slider v-else :disabled="true" value="30"></v-slider>
  </v-container>
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
    },
    // indicates whether the cohort data contains a margin entry and whether it should be returned
    // this flag hides the margin entry (id = 0) from the UI but returns it's data
    returnMargins: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rangeMin: null,
      rangeMax: null
    };
  },
  computed: {
    range: function() {
      return [this.rangeMin, this.rangeMax];
    },
    textLabels: function() {
      if (this.fullLabels != null) {
        let labels = this.fullLabels.map(val => {
          return val.id; // label with the short for now
        });

        if (this.returnMargins) {
          labels = labels.filter(x => x !== "0");
        }
        return labels;
      }
      return null;
    },
    fullLabels: function() {
      if (
        this.items != null &&
        Object.prototype.hasOwnProperty.call(this.items, "labels")
      ) {
        return this.items.labels;
      }
      return null;
    },
    labelCountZeroIdx: function() {
      if (this.fullLabels != null && this.fullLabels.length > 1) {
        return this.fullLabels.length - 1;
      } else {
        return 0;
      }
    },
    labelCountZeroIdxMarginStart: function() {
      return this.returnMargins ? 1 : 0;
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
        // this assumes that the first index is the margin value
        this.rangeMin = this.returnMargins ? 1 : 0;
        this.rangeMax = this.fullLabels.length - 1;
      }
    },
    range: function() {
      let labels = this.fullLabels.slice(this.rangeMin, this.rangeMax + 1);
      if (this.returnMargins) {
        // this assumes that the first index is the margin value
        let marginEntry = this.fullLabels.filter(x => x.id === "0");
        this.$emit("input", marginEntry.concat(labels));
      } else {
        this.$emit("input", labels);
      }
    },
    value: function() {
      if (Array.isArray(this.value)) {
        // this assumes that the first index is the margin value
        let minIndex = this.returnMargins ? 1 : 0;

        this.rangeMin = this.fullLabels.findIndex(
          e => e.id === this.value[minIndex].id
        );
        this.rangeMax = this.fullLabels.findIndex(
          e => e.id === this.value[this.value.length - 1].id
        );
      }
    }
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

.v-input--range-slider
  .v-input__control
  .v-messages
  .v-messages__wrapper
  .v-messages__message {
  transform: translate(-11px, 4px) !important;
}

@media screen and (-ms-high-contrast: active),
  screen and (-ms-high-contrast: none) {
  .v-slider__ticks-container {
    position: absolute;
    top: 15px !important;
  }
}
</style>

<template>
  <v-row class="pt-5">
    <v-col class="pt-5">
      <v-range-slider
        :tick-labels="seasons"
        :value="[0, 1]"
        min="0"
        max="3"
        ticks="always"
        tick-size="4"
        thumb-label="always"
        color="primary"
        thumb-color="primary"
        track-color="grey"
        track-fill-color="primary"
      >
        <template v-slot:thumb-label="props">
          <v-icon dark>
            {{ season(props.value) }}
          </v-icon>
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CohortSlider",
  data() {
    return {
      seasons: ["Winter", "Spring", "Summer", "Fall"],
      icons: ["mdi-snowflake", "mdi-leaf", "mdi-fire", "mdi-water"]
    };
  },
  methods: {
    season(val) {
      return this.icons[val];
    }
  }
};
</script>

<style scoped></style>

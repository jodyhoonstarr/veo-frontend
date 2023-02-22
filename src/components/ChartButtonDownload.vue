<template>
  <div class="pl-2">
    <v-tooltip
      :nudge-left="parseInt(nudgeTooltip)"
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          x-small
          dark
          color="white"
          target="_blank"
          :href="url"
          v-on="on"
        >
          <v-icon color="grey">
            {{ icon }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "ChartButtonToggle",
  props: {
    url: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "mdi-plus"
    },
    nudgeTooltip: {
      type: Number | String,
      default: 0
    }
  }
};
</script>

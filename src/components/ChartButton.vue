<template>
  <div class="pl-2">
    <v-tooltip :nudge-left="parseInt(nudgeTooltip)" left>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          x-small
          dark
          :color="value ? 'primary' : 'white'"
          v-on="on"
          @click="handleClick"
        >
          <v-icon :color="value ? 'white' : 'grey'">{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "ChartButton",
  props: {
    value: {
      type: Boolean,
      default: false
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
  },
  methods: {
    handleClick: function() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

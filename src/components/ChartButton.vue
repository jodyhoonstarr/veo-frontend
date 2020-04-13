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
          <v-icon :color="value ? 'white' : 'grey'">{{ computedIcon }}</v-icon>
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
    offIcon: {
      type: String,
      default: null
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
  },

  computed: {
    computedIcon: function() {
      // if both an on and off icon are provided, toggle them
      // otherwise just use the standard icon
      if (!this.value) {
        return this.icon;
      } else if (this.offIcon) {
        return this.offIcon;
      } else {
        return this.icon;
      }
    }
  }
};
</script>

<template>
  <div v-if="this.value" class="pl-2">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn fab x-small dark color="primary" v-on="on" @click="handleClick">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
  <div v-else class="pl-2">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn fab x-small dark color="white" v-on="on" @click="handleClick">
          <v-icon color="grey">{{ icon }}</v-icon>
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
    }
  },
  methods: {
    handleClick: function() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

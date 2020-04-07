<template>
  <v-container class="py-0 px-6 my-n4">
    <v-row justify="end">
      <v-tooltip v-if="this.value" left>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            dark
            color="primary"
            v-on="on"
            @click="handleClick"
          >
            <v-icon>mdi-percent</v-icon>
          </v-btn>
        </template>
        <span>Display as Share of Total</span>
      </v-tooltip>

      <v-tooltip v-else left>
        <template v-slot:activator="{ on }">
          <v-btn fab x-small dark color="white" v-on="on" @click="handleClick">
            <v-icon color="grey">mdi-percent</v-icon>
          </v-btn>
        </template>
        <span>Display as Share of Total</span>
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChartButton",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick: function() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

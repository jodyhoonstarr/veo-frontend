<template>
  <v-card flat class="pa-md-4 mx-lg-auto text-center" :height="height">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col>
          <slot></slot>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "NotificationCard",
  props: {
    height: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped></style>

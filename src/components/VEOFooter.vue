<template>
  <v-footer absolute color="primary" class="font-weight-medium">
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default { name: "VEOFooter" };
</script>

<style lang="scss" scoped></style>

<template>
  <v-app-bar app color="primary" elevation="0">
    <a class="ml-0 px-md-3" href="https://www.census.gov">
      <v-img
        alt="Census Logo"
        contain
        src="@/assets/images/census-logo-white.svg"
        transition="scale-transition"
        width="86"
      />
    </a>
    <v-divider class="mx-4 divider-color" vertical></v-divider>
    <v-toolbar-title class="white--text hidden-xs-only ml-0 pl-md-3">Veterans Employment Outcomes</v-toolbar-title>
    <v-toolbar-title class="white--text hidden-sm-and-up ml-0 pl-md-3">VEO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text>
      <span class="white--text hidden-xs-only">LEHD Home</span>
      <v-icon color="white" right medium>mdi-home</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default { name: "VEOHeader" };
</script>

<style lang="scss" scoped>
.divider-color {
  color: white !important;
  border-color: rgba($color: #fff, $alpha: 0.2) !important;
}
</style>

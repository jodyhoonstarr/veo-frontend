<template>
  <v-toolbar
    color="primary"
    elevation="0"
  >
    <a
      class="ml-0 px-md-3"
      href="https://www.census.gov"
    >
      <v-img
        alt="Census Logo"
        contain
        src="@/assets/images/census-logo-white.svg"
        transition="scale-transition"
        width="86"
        aspect-ratio="1"
      />
    </a>
    <v-divider
      class="mx-4 divider-color"
      vertical
    />
    <v-toolbar-title
      class="white--text hidden-xs-only ml-0 pl-md-3"
    >
      Veteran Employment Outcomes Explorer
    </v-toolbar-title>
    <v-toolbar-title
      class="white--text hidden-sm-and-up ml-0 pl-md-3"
    >
      VEO Explorer
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      text
      target="_blank"
      href="https://lehd.ces.census.gov/"
    >
      <span class="white--text hidden-xs-only">LEHD Home</span>
      <v-icon
        color="white"
        right
        medium
      >
        mdi-home
      </v-icon>
    </v-btn>
  </v-toolbar>
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

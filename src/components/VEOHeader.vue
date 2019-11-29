<template>
  <v-app-bar app color="primary" elevation="0">
    <v-spacer class="hidden-md-and-up"></v-spacer>
    <v-toolbar-title class="ml-0 pl-md-3">
      <a href="https://www.census.gov">
        <v-img
          alt="Census Logo"
          contain
          src="@/assets/images/census-logo-white.svg"
          transition="scale-transition"
          width="86"
        />
      </a>
    </v-toolbar-title>
    <v-spacer class="hidden-md-and-up"></v-spacer>
  </v-app-bar>
</template>

<script>
export default { name: "VEOHeader" };
</script>

<style lang="scss" scoped></style>

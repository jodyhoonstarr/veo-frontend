<template>
  <v-toolbar>
    <v-tabs
      centered
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab to="/">Home</v-tab>
      <v-tab to="/occupation">Occupation</v-tab>
      <v-tab to="/paygrade">Pay Grade</v-tab>
      <v-tab to="/state">State</v-tab>
      <v-tab to="/sector">Sector</v-tab>
      <v-tab to="/age">Age</v-tab>
      <v-tab to="/sex">Sex</v-tab>
      <v-tab to="/raceethnicity">Race/Ethincity</v-tab>
      <v-tab to="/experience">Experience</v-tab>
      <v-tab to="/education">Education</v-tab>
      <v-tab to="/afqt">AFQT</v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
export default { name: "Navbar" };
</script>

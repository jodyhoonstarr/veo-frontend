<template>
  <nav>
    <v-toolbar>
      <v-tabs
        centered
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="tab in tabs" :key="tab.label" :to="tab.route">{{ tab.label }}</v-tab>
      </v-tabs>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      tabs: [
        { route: "/", label: "Home" },
        { route: "/occupation", label: "Occupation" },
        { route: "/paygrade", label: "Pay Grade" },
        { route: "/state", label: "State" },
        { route: "/sector", label: "Sector" },
        { route: "/age", label: "Age" },
        { route: "/sex", label: "Sex" },
        { route: "/raceethnicity", label: "Race/Ethnicity" },
        { route: "/experience", label: "Experience" },
        { route: "/education", label: "Education" },
        { route: "/afqt", label: "AFQT" }
      ]
    };
  }
};
</script>

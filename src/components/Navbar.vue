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

        <template v-for="tab in tabs">
          <!-- tab with no children/dropdown -->
          <v-tab
            v-if="typeof tab.children === 'undefined' || tab.children.length === 0"
            :key="tab.label"
            :to="tab.route"
          >{{ tab.label }}</v-tab>

          <!-- tab with children/dropdown -->
          <v-tab v-else :key="tab.label" :to="tab.route" class="px-0">
            <v-menu bottom left offset-y transition="slide-y-transition">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  text
                  height="100%"
                  min-width="100%"
                  width="100%"
                  class="align-self-center"
                  v-on="on"
                >
                  {{ tab.label }}
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="child in tab.children"
                  :key="child.label"
                  :to="child.route"
                >{{ child.label }}</v-list-item>
              </v-list>
            </v-menu>
          </v-tab>
        </template>
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
        {
          route: "/occupation",
          label: "Occupation",
          children: [
            { route: "/occupationbypaygrade", label: "Occupation by Paygrade" },
            { route: "/occupationbystate", label: "Occupation by State" },
            { route: "/occupationbysector", label: "Occupation by Sector" },
            { route: "/detailedoccupation", label: "Detailed Occupation" }
          ]
        },
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

<style lang="scss" scoped>
.v-btn:hover:before,
.v-btn:focus:before {
  display: none;
}
</style>

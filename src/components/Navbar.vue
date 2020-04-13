<template>
  <nav>
    <v-toolbar>
      <v-tabs
        centered
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
        v-model="activeTab"
      >
        <v-tabs-slider></v-tabs-slider>

        <template v-for="tab in tabs">
          <!-- tab with no children/dropdown -->
          <v-tab
            @click="setActiveTab(tab.route)"
            v-if="
              typeof tab.children === 'undefined' || tab.children.length === 0
            "
            :key="tab.label"
            :to="tab.route"
            >{{ tab.label }}</v-tab
          >

          <!-- tab with children/dropdown -->
          <v-tab
            @click.capture="$event.preventDefault()"
            v-else
            :key="tab.label"
            :to="tab.route"
            class="px-0"
          >
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
                  @click="setActiveTab(tab.route)"
                  v-for="child in tab.children"
                  :key="child.label"
                  :to="child.route"
                  >{{ child.label }}</v-list-item
                >
              </v-list>
            </v-menu>
          </v-tab>
        </template>

        <v-tab class="px-0">
          <v-btn text target="_blank" href="https://lehd.ces.census.gov/data/">
            <span>Help</span>
            <v-icon color="primary" right medium
              >mdi-help-circle-outline</v-icon
            >
          </v-btn>
        </v-tab>
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
        {
          route: "/occupation",
          label: "Military Occupation",
          children: [
            { route: "/occupation/detail", label: "Detailed Occupation" },
            { route: "/occupation/paygrade", label: "Occupation by Paygrade" },
            { route: "/occupation/industry", label: "Occupation by Industry" }
          ]
        },
        {
          route: "/service",
          label: "Service Characteristic",
          children: [
            { route: "/service/afqt", label: "AFQT Range" },
            { route: "/service/yearsofservice", label: "Years of Service" },
            { route: "/service/paygrade", label: "Pay Grade" },
            { route: "/service/occupation", label: "Occupation by Paygrade" }
          ]
        },
        {
          route: "/demographics",
          label: "Demographic",
          children: [
            { route: "/demographics/age", label: "Age" },
            { route: "/demographics/sex", label: "Sex" },
            { route: "/demographics/raceethnicity", label: "Race/Ethnicity" },
            { route: "/demographics/education", label: "Education" }
          ]
        },
        {
          route: "/industry",
          label: "Industry",
          children: [
            { route: "/industry/time", label: "Industry" },
            { route: "/industry/occupation", label: "Occupation by Industry" }
          ]
        }
      ],
      activeTab: null
    };
  },
  methods: {
    setActiveTab: function(tab) {
      this.activeTab = tab;
    }
  },
  mounted() {
    const parentTab = this.tabs.find(tab => {
      if (tab.children) {
        return (
          tab.children.filter(child => child.route === this.$route.path)
            .length > 0
        );
      }
    });
    if (parentTab) {
      this.activeTab = parentTab.route;
    } else if (this.$route.path !== "/") {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-btn:hover:before,
.v-btn:focus:before {
  display: none;
}
</style>

<template>
  <nav>
    <v-toolbar>
      <v-tabs
        v-model="activeTab"
        centered
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
        :hide-slider="hideSlider"
      >
        <v-tabs-slider />

        <template v-for="tab in tabs">
          <!-- tab with no children/dropdown -->
          <v-tab
            v-if="
              typeof tab.children === 'undefined' || tab.children.length === 0
            "
            :key="tab.label"
            :to="tab.route"
            @click="setActiveTab(tab.route)"
          >
            {{ tab.label }}
          </v-tab>

          <!-- tab with children/dropdown -->
          <v-tab
            v-else
            :key="tab.label"
            :to="tab.route"
            class="px-0"
            @click.capture="$event.preventDefault()"
          >
            <v-menu
              left
              bottom
              offset-y
              transition="slide-y-transition"
            >
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
                  <template v-if="isXs">
                    {{ tab.short }}
                  </template>
                  <template v-else>
                    {{ tab.label }}
                  </template>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="child in tab.children"
                    :key="child.label + child.icon"
                    :to="child.route"
                    @click="setActiveTab(tab.route)"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="child.icon" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="child.label"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-tab>
        </template>

        <v-tab class="px-0">
          <v-btn
            text
            target="_blank"
            href="/data/veo_experimental.html"
          >
            <span>Help</span>
            <v-icon
              color="primary"
              right
              medium
            >
              mdi-help-circle-outline
            </v-icon>
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
          label: "Military Specialization",
          short: "Specialization",
          children: [
            {
              route: "/occupation/detail",
              label: "Detailed Occupation",
              icon: "mdi-chart-bar"
            },
            {
              route: "/occupation/paygrade",
              label: "Occupation by Paygrade",
              icon: "mdi-chart-bar"
            },
            {
              route: "/occupation/industry",
              label: "Occupation by Industry",
              icon: "mdi-chart-bar"
            },
            {
              route: "/occupation/state",
              label: "Occupation by State",
              icon: "mdi-chart-bar"
            }
          ]
        },
        {
          route: "/service",
          label: "Service Characteristic",
          short: "Characteristic",
          children: [
            {
              route: "/service/afqt/line",
              label: "AFQT Range",
              icon: "mdi-chart-line"
            },
            {
              route: "/service/afqt/bar",
              label: "AFQT Range",
              icon: "mdi-chart-bar"
            },
            {
              route: "/service/yearsofservice/line",
              label: "Years of Service",
              icon: "mdi-chart-line"
            },
            {
              route: "/service/yearsofservice/bar",
              label: "Years of Service",
              icon: "mdi-chart-bar"
            },
            {
              route: "/service/paygrade/line",
              label: "Pay Grade",
              icon: "mdi-chart-line"
            },
            {
              route: "/service/paygrade/bar",
              label: "Pay Grade",
              icon: "mdi-chart-bar"
            },
            {
              route: "/service/occupation",
              label: "Occupation by Paygrade",
              icon: "mdi-chart-bar"
            }
          ]
        },
        {
          route: "/demographics",
          label: "Demographic",
          short: "Demographic",
          children: [
            {
              route: "/demographics/age/line",
              label: "Age at Exit Cohort",
              icon: "mdi-chart-line"
            },
            {
              route: "/demographics/age/bar",
              label: "Age at Exit Cohort",
              icon: "mdi-chart-bar"
            },
            {
              route: "/demographics/sex/line",
              label: "Sex",
              icon: "mdi-chart-line"
            },
            {
              route: "/demographics/sex/bar",
              label: "Sex",
              icon: "mdi-chart-bar"
            },
            {
              route: "/demographics/raceethnicity/line",
              label: "Race/Ethnicity",
              icon: "mdi-chart-line"
            },
            {
              route: "/demographics/raceethnicity/bar",
              label: "Race/Ethnicity",
              icon: "mdi-chart-bar"
            },
            {
              route: "/demographics/education/line",
              label: "Enlistment Education Level",
              icon: "mdi-chart-line"
            },
            {
              route: "/demographics/education/bar",
              label: "Enlistment Education Level",
              icon: "mdi-chart-bar"
            }
          ]
        },
        {
          route: "/industry",
          label: "Industry",
          short: "Industry",
          children: [
            {
              route: "/industry/line",
              label: "Industry",
              icon: "mdi-chart-line"
            },
            {
              route: "/industry/bar",
              label: "Industry",
              icon: "mdi-chart-bar"
            },
            {
              route: "/industry/occupation",
              label: "Occupation by Industry",
              icon: "mdi-chart-bar"
            }
          ]
        },
        {
          route: "/state",
          label: "State",
          short: "State",
          children: [
            {
              route: "/state/line",
              label: "State",
              icon: "mdi-chart-line"
            },
            {
              route: "/state/bar",
              label: "State",
              icon: "mdi-chart-bar"
            },
            {
              route: "/state/occupation",
              label: "Occupation by State",
              icon: "mdi-chart-bar"
            }
          ]
        }
      ],
      activeTab: 4
    };
  },
  computed: {
    isXs: function() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    hideSlider: function() {
      return this.activeTab === 4;
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
  },
  methods: {
    setActiveTab: function(tab) {
      this.activeTab = tab;
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

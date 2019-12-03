<template>
  <v-content>
    <v-container>
      <Navigation></Navigation>
      <v-layout text-center wrap>
        <v-container pa-0 class="grey lighten-5">
          <v-row dense>
            <v-col order-xs="2" order-sm="1" cols="12" xs="12" sm="4">
              <v-card class="ccard" height="400px">
                Nav Panel
              </v-card>
            </v-col>
            <v-col order-xs="1" order-sm="2" cols="12" xs="12" sm="8">
              <v-card class="ccard" height="400px">
                Chart Panel
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xs="12" sm="12">
              <v-card class="ctable" height="300px">
                Select Panel
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Navigation from "./Navigation.vue";
export default {
  name: "VEOContent",
  components: {
    Navigation
  },
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.ccard {
  height: 50px;
}
.ctable {
  height: 100px;
}
</style>

<template>
  <v-footer class="primary py-5">
    <v-card
      flat
      fluid
      ma-0
      pa-0
      class="primary white--text text-xs-left text-sm-center w-100"
    >
      <template v-for="(link, index) in links">
        <a
          :key="link.label"
          :href="link.url"
          class="white--text xs-12 text-left"
          text-xs-left
        >{{ link.label }}</a>
        <br
          :key="index.toString() + 'b'"
          class="hidden-sm-and-up"
        >
        <v-divider
          v-if="index !== links.length - 1"
          :key="index.toString() + 'd'"
          class="mx-1 shift-down hidden-xs-only"
          vertical
          color="white"
        />
      </template>
      <v-divider class="my-4 divider-color" />

      <v-card-text
        class="white--text quote py-0 text-center"
      >
        Measuring America's People, Places and Economy
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "VEOFooter",
  data: () => ({
    links: [
      {
        label: "Accessibility",
        url:
          "https://www.census.gov/about/policies/privacy/privacy-policy.html#par_textimage_1"
      },
      {
        label: "Information Quality",
        url: "https://www.census.gov/quality/"
      },
      {
        label: "FOIA",
        url: "https://www.census.gov/foia/"
      },
      {
        label: "Data Protection and Privacy Policy",
        url: "https://www.census.gov/privacy/"
      },
      {
        label: "U.S. Department of Commerce",
        url: "https://www.commerce.gov/"
      },
      {
        label: "Release Notes and FAQs",
        url:
          "https://data.census.gov/assets/releasenotes/faqs-release-notes.pdf"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.quote {
  font-size: 17px;
}
.w-100 {
  width: 100%;
}
a {
  font-size: 14px;
  text-decoration: none;
  background-color: transparent;
  border-color: transparent;
}
a:hover {
  text-decoration: underline;
}
.shift-down {
  line-height: 95%;
  display: inline;
}
.divider-color {
  color: white !important;
  border-color: rgba($color: #fff, $alpha: 0.2) !important;
}
</style>

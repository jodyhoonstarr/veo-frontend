<template>
  <v-app>
    <Header />
    <Content />
    <Footer />
  </v-app>
</template>

<script>
import Content from "./components/Content.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",

  components: {
    Header,
    Content,
    Footer
  },

  data: () => ({
    //
  })
};
</script>

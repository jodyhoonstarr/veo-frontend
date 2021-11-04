<template>
  <v-app>
    <v-main>
      <Header />
      <Navbar />
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",

  components: {
    Header,
    Footer,
    Navbar
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

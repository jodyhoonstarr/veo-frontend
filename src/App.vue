<template>
  <v-app>
    <Header />
    <v-content>
      <Navbar />
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

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

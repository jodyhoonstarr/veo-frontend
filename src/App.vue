<template>
  <v-app>
    <VEOHeader />
    <VEOContent />
    <VEOFooter />
  </v-app>
</template>

<script>
import VEOContent from "./components/VEOContent";
import VEOHeader from "./components/VEOHeader";
import VEOFooter from "./components/VEOFooter";

export default {
  name: "App",

  components: {
    VEOHeader,
    VEOContent,
    VEOFooter
  },

  data: () => ({
    //
  })
};
</script>

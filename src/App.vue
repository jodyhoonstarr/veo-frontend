<template>
  <v-app>
    <v-content>
      <VEOHeader />
      <VEOContent />
      <VEOFooter />
    </v-content>
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

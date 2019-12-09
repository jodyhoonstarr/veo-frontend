<template>
  <v-container>
    <h1 class="text-center">This is the Occupation page</h1>
    <v-row>
      <v-col cols="12" xs="12" sm="6">
        <v-btn block outlined color="secondary" to="/detailedoccupation">Detailed Occupation</v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <v-btn block outlined color="secondary" to="/occupationbypaygrade">Occupation by Paygrade</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="6">
        <v-btn block outlined color="secondary" to="/occupationbysector">Occupation by Sector</v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <v-btn block outlined color="secondary" to="/occupationbystate">Occupation by State</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Occupation"
};
</script>

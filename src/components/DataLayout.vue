<template>
  <v-container fluid>
    <v-layout text-center row wrap>
      //TODO remove v-layout is from v1
      <v-container pa-0 class="grey lighten-5">
        <v-row dense>
          <v-col order-xs="2" order-sm="1" cols="12" xs="12" sm="4">
            <v-card tile outlined flat height="400px">Nav Panel</v-card>
          </v-col>
          <v-col order-xs="1" order-sm="2" cols="12" xs="12" sm="8">
            <v-card tile outlined flat height="400px">Chart Panel</v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12">
            <v-card tile outlined flat height="300px">Select Panel</v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "DataLayout"
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

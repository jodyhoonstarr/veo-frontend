<template>
  <div>
    <h1 class="text-center">This is the Occupation by Paygrade page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4">
        <DropDown
          label="Paygrade"
          hint="Select Paygrade"
          :items="paygrades"
          v-model="selectedPaygrade"
          multiple
          close
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="5">
        <DropDown
          label="Occupation"
          hint="Select Occupation"
          :items="occupations"
          v-model="selectedOccupation"
          multiple
          close
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown label="Cohort" hint="Year of discharge" :items="cohorts" v-model="selectedCohort"></DropDown>
      </v-col>
    </SelectBar>
    <ChartArea>
      <ChartCard v-for="paygrade in selectedPaygrade">
        <v-card-title>{{ paygrade.id }}</v-card-title>
        <v-card-subtitle>{{ paygrade.label }}</v-card-subtitle>
        <v-card-text>Chart area here</v-card-text>
      </ChartCard>
    </ChartArea>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";
import ChartArea from "@/components/ChartArea.vue";
import ChartCard from "@/components/ChartCard.vue";

export default {
  name: "OccupationByPaygrade",
  components: {
    SelectBar,
    DropDown,
    ChartArea,
    ChartCard
  },
  data() {
    return {
      selectedPaygrade: null,
      selectedOccupation: null,
      selectedCohort: null,
      paygrades: [
        { id: "E1-E5", label: "Sergeant and below" },
        { id: "E6-E9", label: "Staff Sargeant and higher" }
      ],
      occupations: [
        { id: "10X", label: "Infantry, Gun Crews, and Seamanship Specialists" },
        { id: "11X", label: "Electronic Equipment Repairers" },
        { id: "12X", label: "Communications and Intelligence Specialists" },
        { id: "13X", label: "Health Care Specialists" },
        { id: "14X", label: "Other Allied Professions" },
        { id: "15X", label: "Functional Support and Administration" },
        { id: "16X", label: "Electrical/Mechanical Equipment Repairers" },
        { id: "17X", label: "Craftsworkers" },
        { id: "18X", label: "Service and Supply Handlers" }
      ],
      cohorts: [
        { id: "2000", label: "2000-2003" },
        { id: "2004", label: "2004-2007" },
        { id: "2008", label: "2008-2011" },
        { id: "2012", label: "2012-2015" }
      ]
    };
  }
};
</script>

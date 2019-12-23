<template>
  <div>
    <h1 class="text-center">This is the Occupation by State page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4">
        <DropDown
          label="State"
          hint="Select State"
          :items="states"
          v-model="selectedState"
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
      <ChartCard v-for="state in selectedState" :value="state"></ChartCard>
    </ChartArea>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";
import ChartArea from "@/components/ChartArea.vue";
import ChartCard from "@/components/ChartCard.vue";

export default {
  name: "OccupationByState",
  components: {
    SelectBar,
    DropDown,
    ChartArea,
    ChartCard
  },
  data() {
    return {
      selectedOccupation: null,
      selectedState: null,
      selectedCohort: null,
      occupations: [
        { id: "10X", label: "Infantry, Gun Crews, and Seamanship Specialists" },
        { id: "11X", label: "Electronic Equipment Repairers" },
        { id: "12X", label: "Communications and Intelligence pecialists" },
        { id: "13X", label: "Health Care Specialists" },
        { id: "14X", label: "Other Allied Professions" },
        { id: "15X", label: "Functional Support and Administrtion" },
        { id: "16X", label: "Electrical/Mechanical Equipment epairers" },
        { id: "17X", label: "Craftsworkers" },
        { id: "18X", label: "Service and Supply Handlers" }
      ],
      states: [
        { id: "01", label: "Alabama" },
        { id: "02", label: "Alaska" },
        { id: "04", label: "Arizona" },
        { id: "05", label: "Arkansas" },
        { id: "06", label: "California" },
        { id: "08", label: "Colorado" },
        { id: "09", label: "Connecticut" },
        { id: "10", label: "Delaware" },
        { id: "11", label: "District of Columbia" },
        { id: "12", label: "Florida" },
        { id: "13", label: "Georgia" },
        { id: "15", label: "Hawaii" },
        { id: "16", label: "Idaho" },
        { id: "17", label: "Illinois" },
        { id: "18", label: "Indiana" },
        { id: "19", label: "Iowa" },
        { id: "20", label: "Kansas" },
        { id: "21", label: "Kentucky" },
        { id: "22", label: "Louisiana" },
        { id: "23", label: "Maine" },
        { id: "24", label: "Maryland" },
        { id: "25", label: "Massachusetts" },
        { id: "26", label: "Michigan" },
        { id: "27", label: "Minnesota" },
        { id: "28", label: "Mississippi" },
        { id: "29", label: "Missouri" },
        { id: "30", label: "Montana" },
        { id: "31", label: "Nebraska" },
        { id: "32", label: "Nevada" },
        { id: "33", label: "New Hampshire" },
        { id: "34", label: "New Jersey" },
        { id: "35", label: "New Mexico" },
        { id: "36", label: "New York" },
        { id: "37", label: "North Carolina" },
        { id: "38", label: "North Dakota" },
        { id: "39", label: "Ohio" },
        { id: "40", label: "Oklahoma" },
        { id: "41", label: "Oregon" },
        { id: "42", label: "Pennsylvania" },
        { id: "44", label: "Rhode Island" },
        { id: "45", label: "South Carolina" },
        { id: "46", label: "South Dakota" },
        { id: "47", label: "Tennessee" },
        { id: "48", label: "Texas" },
        { id: "49", label: "Utah" },
        { id: "50", label: "Vermont" },
        { id: "51", label: "Virginia" },
        { id: "53", label: "Washington" },
        { id: "54", label: "West Virginia" },
        { id: "55", label: "Wisconsin" },
        { id: "56", label: "Wyoming" }
      ],
      cohorts: [
        { id: "2000", label: "2000-2007" },
        { id: "2008", label: "2008-2015" }
      ]
    };
  }
};
</script>

<template>
  <div>
    <h1 class="text-center">This is the Occupation by Sector page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4">
        <DropDown
          label="Sector"
          hint="Select NAICS 2-Digit Sector"
          :items="sectors"
          v-model="selectedSector"
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
        <DropDown
          label="Cohort"
          hint="Year of discharge"
          :items="cohorts"
          v-model="selectedCohort"
        ></DropDown>
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";

export default {
  name: "OccupationBySector",
  components: {
    SelectBar,
    DropDown
  },
  data() {
    return {
      selectedOccupation: null,
      selectedSector: null,
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
      sectors: [
        { id: "11", label: "Agriculture, Forestry, Fishing and Hunting" },
        { id: "21", label: "Mining, Quarrying, and Oil and Gas Extraction" },
        { id: "22", label: "Utilities" },
        { id: "23", label: "Construction" },
        { id: "31-33", label: "Manufacturing" },
        { id: "42", label: "Wholesale Trade" },
        { id: "44-45", label: "Retail Trade" },
        { id: "48-49", label: "Transportation and Warehousing" },
        { id: "51", label: "Information" },
        { id: "52", label: "Finance and Insurance" },
        { id: "53", label: "Real Estate and Rental and Leasing" },
        { id: "54", label: "Professional, Scientific, and Technical Services" },
        { id: "55", label: "Management of Companies and Enterprises" },
        {
          id: "56",
          label:
            "Administrative and Support and Waste Management and Remediation Services"
        },
        { id: "61", label: "Educational Services" },
        { id: "62", label: "Health Care and Social Assistance" },
        { id: "71", label: "Arts, Entertainment, and Recreation" },
        { id: "72", label: "Accommodation and Food Services" },
        { id: "81", label: "Other Services (except Public Administration)" },
        { id: "92", label: "Public Administration" }
      ],
      cohorts: [
        { id: "2000", label: "2000-2007" },
        { id: "2008", label: "2008-2015" }
      ]
    };
  }
};
</script>

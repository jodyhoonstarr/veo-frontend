<template>
  <div>
    <h1 class="text-center">This is the Sector page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="9">
        <DropDown
          label="Sector"
          hint="NAICS 2-Digit Sector"
          :items="sectors"
          v-model="selectedSector"
          multiple
          close
          clearable
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown label="Cohort" hint="Year of discharge" :items="cohorts" v-model="selectedCohort"></DropDown>
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";

export default {
  name: "Sector",
  components: {
    SelectBar,
    DropDown
  },
  data() {
    return {
      selectedSector: null,
      selectedCohort: null,
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
        { id: "2000", label: "2000-2001" },
        { id: "2002", label: "2002-2003" },
        { id: "2004", label: "2004-2005" },
        { id: "2006", label: "2006-2007" },
        { id: "2008", label: "2008-2009" },
        { id: "2010", label: "2010-2011" },
        { id: "2012", label: "2012-2013" },
        { id: "2014", label: "2014-2015" }
      ]
    };
  }
};
</script>

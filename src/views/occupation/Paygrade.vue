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
          clearable
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
          clearable
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown label="Cohort" hint="Year of discharge" :items="cohorts" v-model="selectedCohort"></DropDown>
      </v-col>
    </SelectBar>
    <FiltersBar @change="(f) => { filters = f }"></FiltersBar>
    <ChartArea>
      <template v-for="paygrade in selectedPaygrade">
        <ChartCard
          v-if="filteredData != null"
          :value="paygrade"
          :chartData="filteredDataByPaygrade(paygrade)"
        ></ChartCard>
      </template>
    </ChartArea>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";
import FiltersBar from "@/components/FiltersBar.vue";
import ChartArea from "@/components/ChartArea.vue";
import ChartCard from "@/components/ChartCard.vue";
import { csv } from "d3";

export default {
  name: "OccupationByPaygrade",
  components: {
    SelectBar,
    DropDown,
    FiltersBar,
    ChartArea,
    ChartCard
  },
  data() {
    return {
      csvData: null,
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
      ],
      filters: null
    };
  },
  mounted: function() {
    csv("/veoo2p.csv").then(data => {
      this.csvData = data;
    });
  },
  methods: {
    filteredDataByPaygrade: function(paygrade) {
      const paygradeData = this.filteredData.filter(row => {
        return row.paygrade === paygrade.id;
      });
      const result =
        this.filters.cut != null
          ? this.formatForGroupedBarChart(paygradeData)
          : this.formatForBarChart(paygradeData);
      return result;
    },
    formatForGroupedBarChart: function(data) {
      // get the set of available props
      const objKeys = Object.keys(data[0]);

      // find the props/keys that are valid for the filter set
      let keepKeys = objKeys.filter(key => {
        return (
          key
            .toLocaleLowerCase()
            .indexOf(`_${this.filters.type.id.toLocaleLowerCase()}`) > -1 &&
          key
            .toLocaleLowerCase()
            .indexOf(`${this.filters.cut.id.toLocaleLowerCase()}_`) > -1 &&
          key.toLocaleLowerCase().indexOf("status") === -1
        );
      });

      const groupLabels = keepKeys.map(key => {
        // find the group filter that is contained in the key string
        const match = this.filters.group.filters.find(({ id }) => {
          return (
            key.toLocaleLowerCase().indexOf(`${id.toLocaleLowerCase()}_`) > -1
          );
        });
        return match.id;
      });

      // create a lookup using the simple labels
      let keepLookup = Object.assign(
        {},
        ...keepKeys.map((n, index) => ({ [n]: groupLabels[index] }))
      );

      // keep occ code until the label can be passed through
      // FIXME get text labels
      keepKeys.push("dod_occ_code");
      keepLookup["dod_occ_code"] = "label";

      // return a simplified data object with the clean labels
      return data.map(function(o) {
        return Object.assign(
          {},
          ...keepKeys.map(prop => ({ [keepLookup[prop]]: o[prop] }))
        );
      });
    },
    formatForBarChart: function(data) {
      // TODO
      // get the set of available props
      const objKeys = Object.keys(data[0]);

      // find the props/keys that are valid for the filter set
      let keepKeys = objKeys.filter(key => {
        return (
          key
            .toLocaleLowerCase()
            .indexOf(`_${this.filters.type.id.toLocaleLowerCase()}`) > -1 &&
          key.toLocaleLowerCase().indexOf("status") === -1
        );
      });

      let keepLookup = {};
      keepLookup[`y1_${this.filters.type.id.toLocaleLowerCase()}`] = "y1";
      keepLookup[`y5_${this.filters.type.id.toLocaleLowerCase()}`] = "y5";
      keepLookup[`y10_${this.filters.type.id.toLocaleLowerCase()}`] = "y10";

      // keep occ code until the label can be passed through
      // FIXME get text labels
      keepKeys.push("dod_occ_code");
      keepLookup["dod_occ_code"] = "label";

      // return a simplified data object with the clean labels
      return data.map(function(o) {
        return Object.assign(
          {},
          ...keepKeys.map(prop => ({ [keepLookup[prop]]: o[prop] }))
        );
      });
    }
  },
  computed: {
    filteredData: function() {
      if (
        this.selectedCohort != null &&
        this.selectedPaygrade != null &&
        this.selectedOccupation != null &&
        this.filters != null
      ) {
        // filter the selected rows from the data
        return this.csvData.filter(row => {
          return (
            this.selectedCohort.id === row.cohort &&
            this.selectedPaygrade.some(e => e.id === row.paygrade) &&
            this.selectedOccupation.some(e => e.id === row.dod_occ_code)
          );
        });
      } else {
        return null;
      }
    },
    chartType: function() {
      if (this.filters.type.id === "earnings") {
        return "BarChartGrouped";
      } else {
        return "BarChart";
      }
    }
  }
};
</script>

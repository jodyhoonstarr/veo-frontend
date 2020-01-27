<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4">
        <DropDownwRadio
          label="Occupation"
          :items="occupations"
          id="occupation"
          :toggle="activeToggle === 'occupation'"
          @change="handleDropDownToggle"
        ></DropDownwRadio>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <DropDownwRadio
          label="Paygrade"
          :items="paygrades"
          id="paygrade"
          :toggle="activeToggle === 'paygrade'"
          @change="handleDropDownToggle"
        ></DropDownwRadio>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <DropDownwRadio
          label="Cohort"
          id="cohort"
          :items="cohorts"
          :toggle="activeToggle === 'cohort'"
          @change="handleDropDownToggle"
        ></DropDownwRadio>
      </v-col>
    </SelectBar>
    <GetData url="/data/veoo2p.csv" :emit="true" @change="updateCsvData">
      <v-card slot-scope="{ loading }" :loading="loading">
        <v-system-bar color="primary">
          <span v-if="loading" class="white--text">Loading...</span>
          <span v-else-if="filters && activeToggle" class="white--text"
            >{{ filters.type.label }} by
            {{
              activeToggle.charAt(0).toUpperCase() + activeToggle.slice(1)
            }}</span
          >
          <v-spacer></v-spacer>
        </v-system-bar>
        <FiltersBar @change="handleFiltersToggle"></FiltersBar>
      </v-card>
    </GetData>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";
import DropDownwRadio from "@/components/DropDownwRadio.vue";
import FiltersBar from "@/components/FiltersBar.vue";
import ChartArea from "@/components/ChartArea.vue";
import ChartCard from "@/components/ChartCard.vue";
import GetData from "@/components/GetData";

export default {
  name: "OccupationByPaygrade",
  components: {
    SelectBar,
    DropDown,
    DropDownwRadio,
    FiltersBar,
    ChartArea,
    ChartCard,
    GetData
  },
  data() {
    return {
      csvData: null,
      filterData: null,
      paygrade: null,
      occupation: null,
      cohort: null,
      activeToggle: "occupation",
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
  methods: {
    formatForGroupedBarChart: function(data) {
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
    updateCsvData: function({ response }) {
      this.csvData = response;
    },
    handleDropDownToggle: function(data) {
      this[data.id] = data.selected;
      if (data.toggle) {
        this.activeToggle = data.id;
      }
    },
    handleFiltersToggle: function(f) {
      this.filters = f;
    }
  },
  computed: {
    selectData: function() {
      if (
        this.cohort != null &&
        this.paygrade != null &&
        this.occupation != null
      ) {
        // filter the selected rows from the data
        return this.csvData.filter(row => {
          return (
            this.cohort.some(e => e.id === row.cohort) &&
            this.paygrade.some(e => e.id === row.paygrade) &&
            this.occupation.some(e => e.id === row.dod_occ_code)
          );
        });
      } else {
        return null;
      }
    }
    // filterData: function() {
    //   if (this.filters != null && this.selectData != null) {
    //     // get the set of available props
    //     const objKeys = Object.keys(this.selectData[0]);
    //
    //     // find the props/keys that are valid for the data type
    //     const matchInString =
    //         this.filters.type.id.toLocaleLowerCase() === "earnings"
    //             ? "earnings"
    //             : "emp";
    //     const dataTypeKeys = objKeys.filter(key => {
    //       return (
    //           key.toLocaleLowerCase().indexOf(`${matchInString}`) > -1 &&
    //           key.toLocaleLowerCase().indexOf("status") === -1
    //       );
    //     });
    //
    //     let filterKeys = dataTypeKeys.filter(key => {
    //       const f = this.filters.filters;
    //       if (f.hasOwnProperty("percentile") && f.hasOwnProperty("year")) {
    //         const parr = this.toArray(f.percentile);
    //         const yarr = this.toArray(f.year);
    //         return (
    //             parr.some(
    //                 e => key.toLocaleLowerCase().indexOf(`${e.id}_`) > -1
    //             ) &&
    //             yarr.some(e => key.toLocaleLowerCase().indexOf(`${e.id}_`) > -1)
    //         );
    //       } else {
    //         const yarr = this.toArray(f.year);
    //         return yarr.some(
    //             e => key.toLocaleLowerCase().indexOf(`${e.id}_`) > -1
    //         );
    //       }
    //     });
    //
    //     let retvar = filterKeys;
    //     console.log(retvar);
    //     return retvar;
    //   } else {
    //     return null;
    //   }
    // },
  }
};
</script>

<style lang="scss" scoped></style>

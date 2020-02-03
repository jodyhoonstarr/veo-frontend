<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4">
        <GetData url="/metadata/label_dod_occ_code.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
            id="occupation"
            :toggle="activeToggle === 'occupation'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <GetData url="/metadata/label_paygrade_groups.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Paygrade"
            :items="response"
            propname="labels"
            id="paygrade"
            :toggle="activeToggle === 'paygrade'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <GetData url="/metadata/label_4year_cohorts.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            id="cohort"
            :items="response"
            propname="labels"
            :toggle="activeToggle === 'cohort'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData url="/data/veoo2p.csv">
      <ChartCard slot-scope="{ response, loading }" :loading="loading">
        <template v-slot:header>
          <span v-if="loading" class="white--text">Loading...</span>
          <span v-else-if="filters && activeToggle" class="white--text"
            >{{ filters.type.label }} by
            {{
              activeToggle.charAt(0).toUpperCase() + activeToggle.slice(1)
            }}</span
          >
        </template>
        <FiltersBar @change="handleFiltersToggle"></FiltersBar>
      </ChartCard>
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

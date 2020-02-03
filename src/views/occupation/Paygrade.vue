<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
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
      <v-col cols="12" xs="12" sm="4" class="pb-0">
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
      <v-col cols="12" xs="12" sm="4" class="pb-0">
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
    <GetData
      url="/data/veoo2p.csv"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard slot-scope="{ loading }" :loading="loading">
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
        <Chart></Chart>
      </ChartCard>
    </GetData>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";
import DropDownwRadio from "@/components/DropDownwRadio.vue";
import FiltersBar from "@/components/FiltersBar.vue";
import ChartCard from "@/components/ChartCard.vue";
import Chart from "@/components/Chart";
import GetData from "@/components/GetData";
import { GROUPCOLUMN } from "@/constants/lookups.js";

export default {
  name: "OccupationByPaygrade",
  components: {
    SelectBar,
    DropDown,
    DropDownwRadio,
    FiltersBar,
    ChartCard,
    GetData,
    Chart
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
    activeToggleProp: function() {
      return GROUPCOLUMN[this.activeToggle];
    },
    csvDataRows: function() {
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
    },
    csvDataRowsSimple: function() {
      if (this.filters != null && this.csvDataRows != null) {
        // get the set of available props
        const objKeys = Object.keys(this.csvDataRows[0]);

        // get either earnings or emp data without the status flag
        const matchInString =
          this.filters.type.id === "earnings" ? "earnings" : "emp";
        const dataTypeKeys = objKeys.filter(key => {
          return (
            key.toLocaleLowerCase().indexOf(`${matchInString}`) > -1 &&
            key.toLocaleLowerCase().indexOf("status") === -1
          );
        });

        // get only the props defined in the filters
        let filterKeys = dataTypeKeys.filter(key => {
          const f = this.filters.filters;
          if (
            f.hasOwnProperty("percentile") &&
            f.percentile &&
            f.hasOwnProperty("year") &&
            f.year
          ) {
            const p = f.percentile;
            const y = f.year;
            return (
              p.some(e => key.indexOf(`${e.id}_`) > -1) &&
              y.some(e => key.indexOf(`${e.id}_`) > -1)
            );
          } else {
            const y = f.year;
            return y.some(e => key.indexOf(`${e.id}_`) > -1);
          }
        });

        // keep the label for the active group
        filterKeys.push(this.activeToggleProp);

        // filter out the row data to only keep usable props
        return this.csvDataRows.map(row => {
          let result = {};
          filterKeys.forEach(function(key) {
            if (row.hasOwnProperty(key)) {
              result[key] = row[key];
            }
          });
          return result;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

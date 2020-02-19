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
        <Chart
          :chartData="chartData"
          :chartColors="chartColors"
          :chartType="dataType"
        ></Chart>
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
import { arrayIsNullorEmpty } from "@/components/utils";

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
      paygrade: null,
      occupation: null,
      cohort: null,
      activeToggle: "occupation",
      filters: {
        colors: null,
        filters: null,
        type: null
      }
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
      if (f == null) {
        return null;
      }
      if (f.hasOwnProperty("type")) {
        this.filters.type = f.type;
      }
      if (f.hasOwnProperty("filters")) {
        this.filters.filters = f.filters;
      }
      if (f.hasOwnProperty("colors")) {
        this.filters.colors = f.colors;
      }
    }
  },
  computed: {
    dataType: function() {
      if (this.filters.type != null) {
        return this.filters.type.id;
      }
    },
    activeToggleProp: function() {
      return GROUPCOLUMN[this.activeToggle];
    },
    csvDataRows: function() {
      if (
        arrayIsNullorEmpty(this.cohort) ||
        arrayIsNullorEmpty(this.paygrade) ||
        arrayIsNullorEmpty(this.occupation) ||
        arrayIsNullorEmpty(this.csvData)
      ) {
        return null;
      }
      // filter the selected rows from the data
      return this.csvData.filter(row => {
        return (
          this.cohort.some(e => e.id === row.cohort) &&
          this.paygrade.some(e => e.id === row.paygrade) &&
          this.occupation.some(e => e.id === row.dod_occ_code)
        );
      });
    },
    csvDataRowsSimple: function() {
      if (
        arrayIsNullorEmpty(this.filters) ||
        arrayIsNullorEmpty(this.csvDataRows)
      ) {
        return null;
      }
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
          !arrayIsNullorEmpty(f.percentile) &&
          f.hasOwnProperty("year") &&
          !arrayIsNullorEmpty(f.year)
        ) {
          const p = f.percentile;
          const y = f.year;
          return (
            p.some(e => key.indexOf(`${e.id}_`) > -1) &&
            y.some(e => key.indexOf(`${e.id}_`) > -1)
          );
        } else if (f.hasOwnProperty("year") && !arrayIsNullorEmpty(f.year)) {
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
    },
    chartData: function() {
      if (arrayIsNullorEmpty(this.csvDataRowsSimple)) {
        return null;
      }

      // take the selected data and get the unique data property
      // e.g. ['y1_p50', 'y5_p50'] would give ['y1', 'y5']
      const topRow = this.csvDataRowsSimple[0];
      let keyArray = [];
      Object.keys(topRow).map(k => {
        if (k != this.activeToggleProp) {
          keyArray.push(k.split("_"));
        }
      });
      const variableColumn =
        this.filters &&
        this.filters.filters.percentile &&
        Array.isArray(this.filters.filters.percentile) &&
        this.filters.filters.percentile.length > 1
          ? 1
          : 0;

      const useKeys = keyArray.map(k => k[variableColumn]);

      let data = [];
      this.csvDataRowsSimple.map(row => {
        let result = {};

        // find the label using the active group
        result.label = this[this.activeToggle].find(obj => {
          return obj.id === row[this.activeToggleProp];
        }).label;

        // create the simple data
        useKeys.forEach(k => {
          const propName = Object.keys(row).find(prop => {
            return prop.includes(`${k}_`);
          });
          result[k] = row[propName];
        });

        data.push(result);
      });

      return data;
    },
    chartColors: function() {
      if (this.filters != null && this.filters.hasOwnProperty("colors")) {
        return this.filters.colors;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

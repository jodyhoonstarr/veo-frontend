<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_dod_occ_code.json')">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
            id="occupation"
            :selectallable="true"
            v-model="occupationObj"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_paygrade_groups.json')">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Paygrade"
            :items="response"
            propname="labels"
            id="paygrade"
            v-model="paygradeObj"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_4year_cohorts.json')">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            id="cohort"
            :items="response"
            propname="labels"
            :selectallable="true"
            v-model="cohortObj"
          ></DropDownwRadio>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veoo2p.csv')"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard
        slot-scope="{ loading }"
        :loading="loading"
        :filters="filters"
        :active-toggle="activeToggle"
      >
        <FiltersBar chart-type="bar" @change="handleFilters"></FiltersBar>
        <Chart
          chart-type="bar"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
          :chart-label="activeToggle"
          :chart-data-zip="dataPath('downloads/VEO-OccupationByPaygrade.zip')"
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
import {
  createChartData,
  filterRows,
  getChartDataType,
  joinPublicPath,
  simplifiyRows
} from "@/lib/utils";

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
      occupationObj: { selected: null, toggle: false },
      paygradeObj: { selected: null, toggle: true },
      cohortObj: { selected: null, toggle: false },
      activeToggle: "occupation",
      filters: null
    };
  },
  methods: {
    dataPath: function(str) {
      return joinPublicPath(str);
    },
    handleFilters: function(f) {
      if (f == null) {
        return null;
      }
      this.filters = f;
    },
    setActiveToggle: function(changedObj, changedStr) {
      if (changedObj.toggle) {
        this.activeToggle = changedStr;
        // set all the other toggles to false if this one got switched on
        [this.paygradeObj, this.occupationObj, this.cohortObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  },
  watch: {
    paygradeObj: function() {
      this.setActiveToggle(this.paygradeObj, "paygrade");
    },
    occupationObj: function() {
      this.setActiveToggle(this.occupationObj, "occupation");
    },
    cohortObj: function() {
      this.setActiveToggle(this.cohortObj, "cohort");
    }
  },
  computed: {
    occupation: function() {
      return this.occupationObj.selected;
    },
    paygrade: function() {
      return this.paygradeObj.selected;
    },
    cohort: function() {
      return this.cohortObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.paygrade, prop: "paygrade" },
        { data: this.occupation, prop: "dod_occ_code" }
      ];
    },
    chartDataType: function() {
      return getChartDataType(this.filters);
    },
    activeToggleProp: function() {
      return GROUPCOLUMN[this.activeToggle];
    },
    csvDataRows: function() {
      return filterRows(this.csvData, this.dataSelections);
    },
    csvDataRowsSimple: function() {
      return simplifiyRows(
        this.csvDataRows,
        this.filters,
        this.activeToggleProp
      );
    },
    chartData: function() {
      return createChartData(
        this.csvDataRowsSimple,
        this.filters,
        this.activeToggleProp,
        this.dataSelections
      );
    },
    chartColors: function() {
      if (
        this.filters != null &&
        this.filters.hasOwnProperty("colors") &&
        this.filters.colors != null
      ) {
        return this.filters.colors;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

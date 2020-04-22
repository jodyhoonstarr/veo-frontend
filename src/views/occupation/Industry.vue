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
            v-model="occupationObj"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_industry.json')">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Industry"
            :items="response"
            propname="labels"
            v-model="industryObj"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_8year_cohorts.json')">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            id="cohort"
            :items="response"
            propname="labels"
            v-model="cohortObj"
          ></DropDownwRadio>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veoo2ns.csv')"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard
        slot-scope="{ loading }"
        :loading="loading"
        :filters="filters"
        :active-toggle="activeToggle"
      >
        <FiltersBar
          :initial-values="initialFilters"
          chart-type="bar"
          @change="handleFilters"
        ></FiltersBar>
        <Chart
          chart-type="bar"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
          :chart-label="activeToggle"
          :chart-data-zip="dataPath('downloads/VEO-OccupationByIndustry.zip')"
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
import { filterSelect } from "@/lib/filterselect";

export default {
  name: "OccupationByIndustry",
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
      occupationObj: { selected: null, toggle: true },
      industryObj: { selected: null, toggle: false },
      cohortObj: { selected: null, toggle: false },
      activeToggle: "occupation",
      initialFilters: {
        primary: filterSelect("counts", "primary"),
        secondary: filterSelect("counts", "secondary", "all"),
        tertiary: filterSelect("counts", "tertiary", "y10")
        // primary: filterSelect("earnings", "primary"),
        // secondary: filterSelect("earnings", "secondary", "p75"),
        // tertiary: filterSelect("earnings", "tertiary", "y10")
      },
      filters: {
        colors: null,
        filters: null,
        type: null
      }
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
        [this.industryObj, this.occupationObj, this.cohortObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  },
  watch: {
    industryObj: function() {
      this.setActiveToggle(this.industryObj, "industry");
    },
    occupationObj: function() {
      this.setActiveToggle(this.occupationObj, "occupation");
    },
    cohortObj: function() {
      this.setActiveToggle(this.cohortObj, "cohort");
    }
  },
  computed: {
    industry: function() {
      return this.industryObj.selected;
    },
    occupation: function() {
      return this.occupationObj.selected;
    },
    cohort: function() {
      return this.cohortObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.industry, prop: "industry" },
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
      if (this.filters != null && this.filters.hasOwnProperty("colors")) {
        return this.filters.colors;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

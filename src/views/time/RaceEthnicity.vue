<template>
  <div>
    <SelectBar>
      <v-col class="pa-0">
        <v-row class="pa-0">
          <v-col cols="12" xs="12" sm="6" class="pb-0">
            <GetData :url="dataPath('metadata/label_race.json')">
              <DropDownwRadio
                slot-scope="{ response, loading }"
                :loading="loading"
                label="Race"
                :items="response"
                propname="labels"
                id="race"
                v-model="raceObj"
              ></DropDownwRadio>
            </GetData>
          </v-col>
          <v-col cols="12" xs="12" sm="6" class="pb-0">
            <GetData :url="dataPath('metadata/label_ethnicity.json')">
              <DropDownwRadio
                slot-scope="{ response, loading }"
                :loading="loading"
                label="Ethnicity"
                :items="response"
                propname="labels"
                id="ethnicity"
                v-model="ethnicityObj"
              ></DropDownwRadio>
            </GetData>
          </v-col>
        </v-row>
        <v-row class="pa-0">
          <v-col cols="12" xs="12" sm="12" class="pb-0">
            <GetData :url="dataPath('metadata/label_2year_cohorts.json')">
              <cohort-slider
                slot-scope="{ response, loading }"
                :loading="loading"
                :items="response"
                v-model="cohort"
              ></cohort-slider>
            </GetData>
          </v-col>
        </v-row>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veorh.csv')"
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
          chart-type="line"
          @change="handleFilters"
        ></FiltersBar>
        <Chart
          :chart-type="chartType"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-line-styles="chartLineStyles"
          :chart-data-type="chartDataType"
          chart-label="Exit Cohort"
          :chart-data-zip="dataPath('downloads/VEO-RaceEthnicity.zip')"
        ></Chart>
      </ChartCard>
    </GetData>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import GetData from "@/components/GetData";
import DropDownwRadio from "@/components/DropDownwRadio";
import CohortSlider from "@/components/CohortSlider";
import ChartCard from "@/components/ChartCard";
import FiltersBar from "@/components/FiltersBar";
import Chart from "@/components/Chart";
import {
  createChartData,
  filterRows,
  getChartDataType,
  getColorSet,
  joinPublicPath,
  simplifiyRows
} from "@/lib/utils";
import { GROUPCOLUMN } from "@/constants/lookups";
import { filterSelect } from "@/lib/filterselect";

export default {
  name: "RaceEthnicity",
  components: {
    SelectBar,
    GetData,
    DropDownwRadio,
    CohortSlider,
    ChartCard,
    FiltersBar,
    Chart
  },
  data() {
    return {
      name: "raceethnicity",
      chartType: "line",
      csvData: null,
      raceObj: {
        selected: [
          { id: "A1", label: "White Alone" },
          { id: "A2", label: "Black or African American Alone" },
          { id: "A3", label: "American Indian or Alaska Native Alone" },
          { id: "A4", label: "Asian Alone" },
          {
            id: "A5",
            label: "Native Hawaiian or Other Pacific Islander Alone"
          },
          { id: "A6", label: "Some Other Race Alone (Not Used)" },
          { id: "A7", label: "Two or More Race Groups" }
        ],
        toggle: true
      },
      ethnicityObj: { selected: null, toggle: false },
      cohort: null,
      activeToggle: "race",
      initialFilters: {
        primary: filterSelect("earnings", "primary"),
        secondary: filterSelect("earnings", "secondary", "p50"),
        tertiary: filterSelect("earinings", "tertiary", "all")
      },
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
        [this.raceObj, this.ethnicityObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  },
  computed: {
    race: function() {
      return this.raceObj.selected;
    },
    ethnicity: function() {
      return this.ethnicityObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: GROUPCOLUMN["cohort"] },
        { data: this.race, prop: GROUPCOLUMN["race"] },
        { data: this.ethnicity, prop: GROUPCOLUMN["ethnicity"] }
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
        this.activeToggleProp,
        this.chartType === "line"
      );
    },
    chartData: function() {
      return createChartData(
        this.csvDataRowsSimple,
        this.filters,
        this.activeToggleProp,
        this.dataSelections,
        this.chartType === "line"
      );
    },
    chartColors: function() {
      return getColorSet(this.chartType, this.filters, this[this.activeToggle]);
    },
    chartLineStyles: function() {
      if (!this.filters || !this.filters.hasOwnProperty("linestyles")) {
        return null;
      }
      return this.filters.linestyles;
    }
  },
  watch: {
    raceObj: function() {
      this.setActiveToggle(this.raceObj, "race");
    },
    ethnicityObj: function() {
      this.setActiveToggle(this.ethnicityObj, "ethnicity");
    }
  }
};
</script>

<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="6" class="pb-0">
        <GetData :url="dataPath('metadata/label_fipsnum.json')">
          <DropDownwRadio
            id="state"
            v-model="stateObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="State"
            :items="response"
            propname="labels"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="6" class="pb-0">
        <GetData :url="dataPath('metadata/label_2year_cohorts.json')">
          <DropDownwRadio
            id="cohort"
            v-model="cohortObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            :items="response"
            propname="labels"
          ></DropDownwRadio>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veogs.csv')"
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
          :chart-type="chartType"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
          :chart-label="activeToggle"
          :chart-data-zip="dataPath('downloads/VEO-State.zip')"
        ></Chart>
      </ChartCard>
    </GetData>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import GetData from "@/components/GetData";
import DropDownwRadio from "@/components/DropDownwRadio";
import ChartCard from "@/components/ChartCard";
import FiltersBar from "@/components/FiltersBar";
import Chart from "@/components/Chart";
import { GROUPCOLUMN } from "@/constants/lookups";
import {
  createChartData,
  filterRows,
  getChartDataType,
  joinPublicPath,
  simplifiyRows
} from "@/lib/utils";
import { filterSelect } from "@/lib/filterselect";

export default {
  name: "State",
  components: {
    DropDownwRadio,
    SelectBar,
    GetData,
    ChartCard,
    FiltersBar,
    Chart
  },
  data() {
    return {
      name: "state",
      chartType: "bar",
      csvData: null,
      stateObj: {
        selected: [
          { id: "00", label: "National (50 States + DC)" },
          {
            id: "11",
            label: "District of Columbia"
          },
          { id: "24", label: "Maryland" },
          { id: "51", label: "Virginia" }
        ],
        toggle: true
      },
      cohortObj: { selected: null, toggle: false },
      initialFilters: {
        primary: filterSelect("earnings", "primary"),
        secondary: filterSelect("earnings", "secondary", "p50"),
        tertiary: filterSelect("earinings", "tertiary", "all")
      },
      filters: {
        colors: null,
        filters: null,
        type: null
      },
      activeToggle: "state"
    };
  },
  computed: {
    state: function() {
      return this.stateObj.selected;
    },
    cohort: function() {
      return this.cohortObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.state, prop: "geography" }
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
        Object.prototype.hasOwnProperty.call(this.filters, "colors")
      ) {
        return this.filters.colors;
      }
      return null;
    }
  },
  watch: {
    stateObj: function() {
      this.setActiveToggle(this.stateObj, "state");
    },
    cohortObj: function() {
      this.setActiveToggle(this.cohortObj, "cohort");
    }
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
        [this.stateObj, this.cohortObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  }
};
</script>

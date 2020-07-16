<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_dod_occ_code.json')">
          <DropDownwRadio
            id="occupation"
            v-model="occupationObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
            :selectallable="true"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
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
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_8year_cohorts.json')">
          <DropDownwRadio
            id="cohort"
            v-model="cohortObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            :items="response"
            propname="labels"
            :selectallable="true"
          ></DropDownwRadio>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veoo2gs.csv')"
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
          chart-type="bar"
          :disable-nonemp-counts="true"
          disabled-text="This option has been suppressed from the output data"
          @change="handleFilters"
        ></FiltersBar>
        <Chart
          chart-type="bar"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
          :chart-label="activeToggle"
          :chart-data-zip="dataPath('downloads/VEO-OccupationByState.zip')"
        ></Chart>
      </ChartCard>
    </GetData>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
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
  name: "OccupationByState",
  components: {
    SelectBar,
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
      stateObj: {
        selected: [
          { id: "11", label: "District of Columbia" },
          {
            id: "24",
            label: "Maryland"
          },
          { id: "51", label: "Virginia" }
        ],
        toggle: true
      },
      cohortObj: { selected: null, toggle: false },
      activeToggle: "state",
      filters: null
    };
  },
  computed: {
    occupation: function() {
      return this.occupationObj.selected;
    },
    state: function() {
      return this.stateObj.selected;
    },
    cohort: function() {
      return this.cohortObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.state, prop: "geography" },
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
        Object.prototype.hasOwnProperty.call(this.filters, "colors") &&
        this.filters.colors != null
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
    occupationObj: function() {
      this.setActiveToggle(this.occupationObj, "occupation");
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
        [this.stateObj, this.occupationObj, this.cohortObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <SelectBar>
      <v-col
        cols="12"
        xs="12"
        sm="4"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_dod_occ_code.json')">
          <DropDownwRadio
            id="occupation"
            v-model="occupationObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
          />
        </GetData>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="4"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_industry.json')">
          <DropDownwRadio
            v-model="industryObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Industry"
            :items="response"
            propname="labels"
          />
        </GetData>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="4"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_8year_cohorts.json')">
          <DropDownwRadio
            id="cohort"
            v-model="cohortObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            :items="response"
            propname="labels"
          />
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veoo2ns.csv')"
      :emit="true"
      @change="({ response }) => (csvData = response)"
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
          disabled-text="Not available by job characteristics"
          @change="handleFilters"
        />
        <Chart
          chart-type="bar"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
          :chart-label="activeToggle"
          :chart-data-zip="dataPath('downloads/VEO-OccupationByIndustry.zip')"
        />
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
  name: "OccupationByIndustry",
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
      industryObj: {
        selected: [
          { id: "00", label: "All NAICS Sectors" },
          {
            id: "11",
            label: "Agriculture, Forestry, Fishing and Hunting"
          },
          { id: "21", label: "Mining, Quarrying, and Oil and Gas Extraction" }
        ],
        toggle: true
      },
      cohortObj: { selected: null, toggle: false },
      activeToggle: "occupation",
      filters: {
        colors: null,
        filters: null,
        type: null
      }
    };
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
  }
};
</script>

<style lang="scss" scoped></style>

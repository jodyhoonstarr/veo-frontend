<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_education.json')">
          <DropDownNoRadio
            id="education"
            v-model="education"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Enlistment Education Level"
            :items="response"
            propname="labels"
          ></DropDownNoRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="8" class="pb-0">
        <GetData :url="dataPath('metadata/label_2year_cohorts.json')">
          <cohort-slider
            v-model="cohort"
            slot-scope="{ response, loading }"
            :loading="loading"
            :items="response"
            :hide-margins="true"
          ></cohort-slider>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veoe.csv')"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard
        slot-scope="{ loading }"
        :loading="loading"
        :filters="filters"
        active-toggle="Education Level at Enlistment"
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
          :chart-data-zip="dataPath('downloads/VEO-Education.zip')"
        ></Chart>
      </ChartCard>
    </GetData>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import GetData from "@/components/GetData";
import DropDownNoRadio from "@/components/DropDownNoRadio";
import CohortSlider from "@/components/CohortSlider";
import ChartCard from "@/components/ChartCard";
import FiltersBar from "@/components/FiltersBar";
import Chart from "@/components/Chart";
import { GROUPCOLUMN } from "@/constants/lookups";
import {
  createChartData,
  filterRows,
  getChartDataType,
  getColorSet,
  joinPublicPath,
  simplifiyRows
} from "@/lib/utils";
import { filterSelect } from "@/lib/filterselect";

export default {
  name: "Education",
  components: {
    DropDownNoRadio,
    SelectBar,
    GetData,
    CohortSlider,
    ChartCard,
    FiltersBar,
    Chart
  },
  data() {
    return {
      name: "education",
      chartType: "line",
      csvData: null,
      education: [
        { id: "F1", label: "General Educational Development (GED) test" },
        { id: "F2", label: "High school diploma" },
        { id: "F3", label: "Some college or higher" }
      ],
      cohort: null,
      initialFilters: {
        primary: filterSelect("earnings", "primary"),
        secondary: filterSelect("earnings", "secondary", "p50"),
        tertiary: filterSelect("earinings", "tertiary", "all")
      },
      filters: {
        colors: null,
        filters: null,
        type: null
      }
    };
  },
  computed: {
    dataColumn: function() {
      // AKA activeToggleProp in the bar view
      // in lines this is a fixed column
      return GROUPCOLUMN[this.name];
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.education, prop: this.dataColumn }
      ];
    },
    chartDataType: function() {
      return getChartDataType(this.filters);
    },
    csvDataRows: function() {
      return filterRows(this.csvData, this.dataSelections);
    },
    csvDataRowsSimple: function() {
      return simplifiyRows(
        this.csvDataRows,
        this.filters,
        this.dataColumn,
        this.chartType === "line"
      );
    },
    chartData: function() {
      return createChartData(
        this.csvDataRowsSimple,
        this.filters,
        this.dataColumn,
        this.dataSelections,
        this.chartType === "line"
      );
    },
    chartColors: function() {
      return getColorSet(this.chartType, this.filters, this.education);
    },
    chartLineStyles: function() {
      if (
        !this.filters ||
        !Object.prototype.hasOwnProperty.call(this.filters, "linestyles")
      ) {
        return null;
      }
      return this.filters.linestyles;
    }
  },
  methods: {
    handleFilters: function(f) {
      if (f == null) {
        return null;
      }
      this.filters = f;
    },
    dataPath: function(str) {
      return joinPublicPath(str);
    }
  }
};
</script>

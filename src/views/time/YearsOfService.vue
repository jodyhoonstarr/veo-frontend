<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData :url="dataPath('metadata/label_yosgrp.json')">
          <DropDownNoRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Years of Service Group"
            :items="response"
            propname="labels"
            id="experience"
            v-model="experience"
          ></DropDownNoRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="8" class="pb-0">
        <GetData :url="dataPath('metadata/label_2year_cohorts.json')">
          <cohort-slider
            slot-scope="{ response, loading }"
            :loading="loading"
            :items="response"
            v-model="cohort"
          ></cohort-slider>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veox.csv')"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard
        slot-scope="{ loading }"
        :loading="loading"
        :filters="filters"
        active-toggle="Years of Service"
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
          :chart-data-zip="dataPath('downloads/VEO-YearsOfService.zip')"
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
  simplifiyRows,
  getChartDataType,
  getColorSet,
  joinPublicPath
} from "@/lib/utils";
import { filterSelect } from "@/lib/filterselect";

export default {
  name: "YearsOfService",
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
      name: "yearsofservice",
      chartType: "line",
      csvData: null,
      experience: [
        { id: "A1", label: "0-5 years" },
        { id: "A2", label: "6-19 years" },
        { id: "A3", label: "20+ years" }
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
        { data: this.experience, prop: this.dataColumn }
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
      return getColorSet(this.chartType, this.filters, this.experience);
    },
    chartLineStyles: function() {
      if (!this.filters || !this.filters.hasOwnProperty("linestyles")) {
        return null;
      }
      return this.filters.linestyles;
    }
  }
};
</script>

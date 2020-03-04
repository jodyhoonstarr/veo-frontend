<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData url="/metadata/label_afqtgrp.json">
          <DropDownNoRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="AFQT"
            :items="response"
            propname="labels"
            id="afqt"
            v-model="afqt"
          ></DropDownNoRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="8" class="pb-0">
        <GetData url="/metadata/label_2year_cohorts.json">
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
      url="/data/veot.csv"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard slot-scope="{ loading }" :loading="loading">
        <template v-slot:header>
          <span v-if="loading" class="white--text">Loading...</span>
          <span v-else-if="filters.type[0] != null" class="white--text"
            >{{ filters.type[0].label }} by AFQT over Time
          </span>
        </template>
        <FiltersBar
          chart-type="line"
          @change="handleFiltersToggle"
        ></FiltersBar>
        <Chart
          chart-type="line"
          :loading="false"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
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
  getChartDataType
} from "@/components/utils";

export default {
  name: "AFQT",
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
      name: "afqt",
      csvData: null,
      afqt: null,
      cohort: null,
      filters: {
        colors: null,
        filters: null,
        type: null
      }
    };
  },
  methods: {
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
    dataColumn: function() {
      // AKA activeToggleProp in the bar view
      // in lines this is a fixed column
      return GROUPCOLUMN[this.name];
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.afqt, prop: this.dataColumn }
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
        true
      );
    },
    chartData: function() {
      return createChartData(
        this.csvDataRowsSimple,
        this.filters,
        this.dataColumn,
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

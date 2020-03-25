<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData url="/metadata/label_sex.json">
          <DropDownNoRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Sex"
            :items="response"
            propname="labels"
            id="sex"
            v-model="sex"
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
      url="/data/veos.csv"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard
        slot-scope="{ loading }"
        :loading="loading"
        :filters="filters"
        active-toggle="Sex"
      >
        <FiltersBar chart-type="line" @change="handleFilters"></FiltersBar>
        <Chart
          :chart-type="chartType"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-line-styles="chartLineStyles"
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
  getChartDataType,
  getColorSet
} from "@/lib/utils";

export default {
  name: "Sex",
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
      name: "sex",
      chartType: "line",
      csvData: null,
      sex: null,
      cohort: null,
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
        { data: this.sex, prop: this.dataColumn }
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
      return getColorSet(this.chartType, this.filters, this.sex);
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

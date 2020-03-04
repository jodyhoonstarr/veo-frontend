<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData url="/metadata/label_dod_occ_code.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Occupation"
            :items="response"
            propname="labels"
            id="occupation"
            :toggle="activeToggle === 'occupation'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData url="/metadata/label_industry.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Industry"
            :items="response"
            propname="labels"
            id="industry"
            :toggle="activeToggle === 'industry'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="pb-0">
        <GetData url="/metadata/label_4year_cohorts.json">
          <DropDownwRadio
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Cohort"
            id="cohort"
            :items="response"
            propname="labels"
            :toggle="activeToggle === 'cohort'"
            @change="handleDropDownToggle"
          ></DropDownwRadio>
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      url="/data/veoo2ns.csv"
      :emit="true"
      @change="({ response }) => (this.csvData = response)"
    >
      <ChartCard slot-scope="{ loading }" :loading="loading">
        <template v-slot:header>
          <span v-if="loading" class="white--text">Loading...</span>
          <span v-else-if="filters && activeToggle" class="white--text"
            >{{ filters.type.label }} by
            {{
              activeToggle.charAt(0).toUpperCase() + activeToggle.slice(1)
            }}</span
          >
        </template>
        <FiltersBar chart-type="bar" @change="handleFiltersToggle"></FiltersBar>
        <Chart
          chart-type="bar"
          :loading="loading"
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
import DropDown from "@/components/DropDown.vue";
import DropDownwRadio from "@/components/DropDownwRadio.vue";
import FiltersBar from "@/components/FiltersBar.vue";
import ChartCard from "@/components/ChartCard.vue";
import Chart from "@/components/Chart";
import GetData from "@/components/GetData";
import { GROUPCOLUMN } from "@/constants/lookups.js";
import { createChartData, filterRows, simplifiyRows } from "@/components/utils";

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
      industry: null,
      occupation: null,
      cohort: null,
      activeToggle: "occupation",
      filters: {
        colors: null,
        filters: null,
        type: null
      }
    };
  },
  methods: {
    handleDropDownToggle: function(data) {
      this[data.id] = data.selected;
      if (data.toggle) {
        this.activeToggle = data.id;
      }
    },
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
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.industry, prop: "industry" },
        { data: this.occupation, prop: "dod_occ_code" }
      ];
    },
    chartDataType: function() {
      if (this.filters.type != null) {
        return this.filters.type.id;
      }
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

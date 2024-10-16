<template>
  <div>
    <SelectBar>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_yosgrp.json')">
          <DropDownwRadio
            id="experience"
            v-model="experienceObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Years of Service Group"
            :items="response"
            propname="labels"
          />
        </GetData>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_2year_cohorts.json')">
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
      :url="dataPath('data/veox.csv')"
      :emit="true"
      @change="({ response }) => (csvData = response)"
    >
      <ChartCard
        slot-scope="{ loading }"
        :loading="loading"
        :filters="filters"
        :active-toggle="
          activeToggle === 'yearsofservice' ? 'Years of Service' : activeToggle
        "
      >
        <FiltersBar
          chart-type="bar"
          @change="handleFilters"
        />
        <Chart
          :chart-type="chartType"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
          :chart-label="
            activeToggle === 'yearsofservice'
              ? 'Years of Service'
              : activeToggle
          "
          :chart-data-zip="dataPath('downloads/VEO-YearsOfService.zip')"
        />
      </ChartCard>
    </GetData>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import GetData from "@/components/GetData.vue";
import DropDownwRadio from "@/components/DropDownwRadio.vue";
import ChartCard from "@/components/ChartCard.vue";
import FiltersBar from "@/components/FiltersBar.vue";
import Chart from "@/components/Chart.vue";
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
  name: "YearsOfService",
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
      name: "yearsofservice",
      chartType: "bar",
      csvData: null,
      experienceObj: {
        selected: [
          { id: "A1", label: "0-5 Years" },
          { id: "A2", label: "6-19 Years" },
          {
            id: "A3",
            label: "20+ Years"
          }
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
      activeToggle: "yearsofservice"
    };
  },
  computed: {
    experience: function() {
      return this.experienceObj.selected;
    },
    cohort: function() {
      return this.cohortObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.experience, prop: "yosgrp" }
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
    experienceObj: function() {
      this.setActiveToggle(this.experienceObj, "yearsofservice");
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
        [this.experienceObj, this.cohortObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  }
};
</script>

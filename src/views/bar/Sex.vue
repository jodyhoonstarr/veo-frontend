<template>
  <div>
    <SelectBar>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_sex.json')">
          <DropDownwRadio
            id="sex"
            v-model="sexObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Sex"
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
      :url="dataPath('data/veos.csv')"
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
          @change="handleFilters"
        />
        <Chart
          :chart-type="chartType"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-data-type="chartDataType"
          :chart-label="activeToggle"
          :chart-data-zip="dataPath('downloads/VEO-Sex.zip')"
        />
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
  name: "Sex",
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
      name: "sex",
      chartType: "bar",
      csvData: null,
      sexObj: {
        selected: [
          { id: "1", label: "Male" },
          { id: "2", label: "Female" }
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
      activeToggle: "sex"
    };
  },
  computed: {
    sex: function() {
      return this.sexObj.selected;
    },
    cohort: function() {
      return this.cohortObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.sex, prop: "sex" }
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
    sexObj: function() {
      this.setActiveToggle(this.sexObj, "sex");
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
        [this.sexObj, this.cohortObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  }
};
</script>

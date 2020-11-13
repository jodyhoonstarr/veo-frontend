<template>
  <div>
    <SelectBar>
      <v-col cols="12" xs="12" sm="6" class="pb-0">
        <GetData :url="dataPath('metadata/label_paygrade.json')">
          <DropDownwRadio
            id="paygrade"
            v-model="paygradeObj"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Paygrade"
            :items="response"
            propname="labels"
            :selectallable="true"
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
      :url="dataPath('data/veop.csv')"
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
          :chart-data-zip="dataPath('downloads/VEO-Paygrade.zip')"
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
  name: "Paygrade",
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
      name: "paygrade",
      chartType: "bar",
      csvData: null,
      paygradeObj: {
        selected: [
          { id: "E1", label: "Private" },
          { id: "E2", label: "Private (PV2)" },
          { id: "E3", label: "Private First Class (PFC)" },
          { id: "E4", label: "Corporal (CPL) or Specialist (SPC)" },
          { id: "E5", label: "Sergeant (SGT)" },
          { id: "E6", label: "Staff Sergeant (SSG)" },
          {
            id: "E79",
            label:
              "Sergeant First Class (SFC), Master Sergeant (MSG) or First Sergeant (1SG), and Sergeant Major (SGM), Command Sergeant Major (CSM), or Sergeant Major of the Army (SMA)"
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
      activeToggle: "paygrade"
    };
  },
  computed: {
    paygrade: function() {
      return this.paygradeObj.selected;
    },
    cohort: function() {
      return this.cohortObj.selected;
    },
    dataSelections: function() {
      return [
        { data: this.cohort, prop: "cohort" },
        { data: this.paygrade, prop: "paygrade" }
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
    paygradeObj: function() {
      this.setActiveToggle(this.paygradeObj, "paygrade");
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
        [this.paygradeObj, this.cohortObj]
          .filter(o => o !== changedObj)
          .forEach(o => (o.toggle = false));
      }
    }
  }
};
</script>

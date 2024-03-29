<template>
  <div>
    <SelectBar>
      <v-col
        cols="12"
        xs="12"
        sm="4"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_paygrade.json')">
          <DropDownNoRadio
            id="paygrade"
            v-model="paygrade"
            slot-scope="{ response, loading }"
            :loading="loading"
            label="Paygrade"
            :items="response"
            propname="labels"
            :selectallable="true"
          />
        </GetData>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="8"
        class="pb-0"
      >
        <GetData :url="dataPath('metadata/label_2year_cohorts.json')">
          <cohort-slider
            v-model="cohort"
            slot-scope="{ response, loading }"
            :loading="loading"
            :items="response"
            :hide-margins="true"
          />
        </GetData>
      </v-col>
    </SelectBar>
    <GetData
      :url="dataPath('data/veop.csv')"
      :emit="true"
      @change="({ response }) => (csvData = response)"
    >
      <ChartCard
        slot-scope="{ loading }"
        :loading="loading"
        :filters="filters"
        active-toggle="Paygrade"
      >
        <FiltersBar
          :initial-values="initialFilters"
          chart-type="line"
          @change="handleFilters"
        />
        <Chart
          :chart-type="chartType"
          :loading="loading"
          :chart-data="chartData"
          :chart-colors="chartColors"
          :chart-line-styles="chartLineStyles"
          :chart-data-type="chartDataType"
          chart-label="Exit Cohort"
          :chart-data-zip="dataPath('downloads/VEO-Paygrade.zip')"
        />
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
  name: "Paygrade",
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
      name: "paygrade",
      chartType: "line",
      csvData: null,
      paygrade: [
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
        { data: this.paygrade, prop: this.dataColumn }
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
      return getColorSet(this.chartType, this.filters, this.paygrade);
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

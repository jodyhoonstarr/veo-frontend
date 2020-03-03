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
            v-model="cohorts"
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
        <FiltersBar @change="handleFiltersToggle"></FiltersBar>
        <!--      <Chart-->
        <!--          chart-type="line"-->
        <!--          :loading="loading"-->
        <!--          :chart-data="chartData"-->
        <!--          :chart-colors="chartColors"-->
        <!--          :chart-data-type="chartDataType"-->
        <!--      ></Chart>-->
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

export default {
  name: "AFQT",
  components: {
    DropDownNoRadio,
    SelectBar,
    GetData,
    CohortSlider,
    ChartCard,
    FiltersBar
  },
  data() {
    return {
      csvData: null,
      afqt: null,
      cohorts: null,
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
  }
};
</script>

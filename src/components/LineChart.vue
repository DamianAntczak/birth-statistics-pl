<script setup lang="ts">

import { computed, ref, watch } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, type ChartData
} from 'chart.js'
import { Line } from 'vue-chartjs'
import * as chartConfig from '../common/chartConfig.ts'
import type { GraphData } from '../common/GraphData.ts'
import type { StatsType } from "../common/StatsType.ts";
import YearStatsRepository from "../repositories/YearStatsRepository.ts";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  hospital?: any,
  statsType?: string
}>()

const chartData = ref<ChartData<'line'>>({
  labels: [],
  datasets: []
});

const options = computed(() => {
  return chartConfig.createOptions(props.statsType);
})

const datasetLabels = chartConfig.datasetLabels;
const datasetColors = chartConfig.datasetColors;

async function updateChart(hospital: any, statsType: StatsType) {
  if (!hospital) return;

  const data = await YearStatsRepository.getGraphData(hospital.voivodeshipCode, hospital.id);

  if (data) {

    chartData.value = {
      labels: data.years,
      datasets: [
        {
          label: datasetLabels.get(statsType),
          backgroundColor: datasetColors.get(statsType),
          data: data.statistics[statsType]
        }
      ]
    }
  }
}

watch(
  [() => props.hospital, () => props.statsType],
  ([newHospital, newStatsType]) => {

    if (newHospital && newStatsType) {
      updateChart(newHospital, newStatsType as StatsType);
    }
  }
);


</script>

<template>
  <figure v-if="statsType">
    <Line :data="chartData" :options="options" />
  </figure>
</template>

<style scoped></style>
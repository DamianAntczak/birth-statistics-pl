<script setup lang="ts">

import { computed, onMounted, ref, watch } from "vue";
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
import { StatsType } from "../common/StatsType.ts";
import YearStatsRepository from "../repositories/YearStatsRepository.ts";
import polandStats from '../assets/poland-stats.json';


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
  poland?: boolean,
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

async function updateChart(poland: boolean, hospital: any, statsType: StatsType) {
  if(poland) {
    chartData.value = {
      labels: polandStats.years,
      datasets: [
        {
          label: datasetLabels.get(statsType),
          backgroundColor: datasetColors.get(statsType),
          data: polandStats.statistics[statsType]
        }
      ]
    }
  }

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
      updateChart(false, newHospital, newStatsType as StatsType);
    }
  }
);

onMounted(() => {
  console.log('onMounted');
  if(props.poland) {
    updateChart(true, null, props.statsType as StatsType);
  }
});

</script>

<template>
  <figure v-if="statsType">
    <Line :data="chartData" :options="options" />
  </figure>
</template>

<style scoped></style>
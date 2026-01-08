<script setup lang="ts">

import {computed, ref, watch} from "vue";
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
import jsonData from '../assets/year-stats-PL-PO.json';
import type { GraphData } from '../common/GraphData.ts'


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
  hospitalId?: string
  statsType?: string
}>()

const data: { graphDataMap: GraphData } = jsonData;

const chartData =  ref<ChartData<'line'>>({
  labels: [],
  datasets: []
});

const options = computed(() => {
  return chartConfig.createOptions(props.statsType);
})

const datasetLabels = chartConfig.datasetLabels;
const datasetColors = chartConfig.datasetColors;

function updateChart(hospitalId: any, statsType: string) {

  chartData.value = {
    labels: data.graphDataMap[hospitalId].years,
    datasets: [
      {
        label: datasetLabels.get(statsType),
        backgroundColor: datasetColors.get(statsType),
        data: data.graphDataMap[hospitalId].statistics[statsType]
      }
    ]
  }
}

watch(
    [() => props.hospitalId, () => props.statsType],
    ([newHospitalId, newStatsType], [oldHospitalId, oldStatsType]) => {

      if (newHospitalId && newStatsType) {
        updateChart(newHospitalId, newStatsType);
      }
    }
);


</script>

<template>
  <Line :data="chartData" :options="options" />
</template>

<style scoped>

</style>
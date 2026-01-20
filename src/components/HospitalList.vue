<script setup lang="ts">

import type {GraphData} from "../common/GraphData.ts";

import hospitals from '../assets/hospitals.json';
import jsonData from '../assets/year-stats-PL-PO.json';
import {StatsType} from "../common/StatsType.ts";
import {h, ref} from "vue";
import {NButton} from "naive-ui";
import {useRouter} from "vue-router";

const data: { graphDataMap: GraphData } = jsonData;
const router = useRouter();

function createCols() {
  return [
    {
      title: 'Szpital',
      key: 'name',
      children: [
        {
          title: 'Nazwa',
          key: 'name',
          render(row: any) {
            return h(
                NButton,
                {
                  size: 'small',
                  text: true,
                  tag: 'a',
                  onClick: () => router.push({name: 'StatsHospital', params: {hospitalId: row.id}})
                },
                { default: () => row.name }
            )
          }
        },
        {
          title: 'Miasto',
          key: 'city'
        }
      ]
    },
    {
      title: 'Statystyki',
      key: 'statistics',
      children: [
        {
          title: 'Urodzenia',
          key: 'births',
          children: [
            {title: '2010', key: 'births2010'},
            {title: '2024', key: 'births2024'}
          ]
        },
        {
          title: 'Cesarskie cięcia [%]',
          key: 'cesareans',
          children: [
            {title: '2010', key: 'cesareans2010'},
            {title: '2025', key: 'cesareans2025'}
          ]
        },
        {
          title: 'Nacięcia krocza [%]',
          key: 'episiotomies',
          children: [
            {title: '2010', key: 'episiotomies2010'},
            {title: '2025', key: 'episiotomies2025'}
          ]
        }
      ]
    }
  ]
}

function createData() {
  return hospitals.map(hospital => {
    const hospitalStats = data.graphDataMap[hospital.id];
    return {
      id: hospital.id,
      name: hospital.name,
      city: hospital.city,
      births2010: hospitalStats.statistics[StatsType.Births][0],
      births2024: hospitalStats.statistics[StatsType.Births][13],
      cesareans2010: hospitalStats.statistics[StatsType.Cesareans][0],
      cesareans2025: hospitalStats.statistics[StatsType.Cesareans][14],
      episiotomies2010: hospitalStats.statistics[StatsType.Episiotomies][0],
      episiotomies2025: hospitalStats.statistics[StatsType.Episiotomies][14]
    };
  });
}

const dataTable = ref(createData())
const columns = ref(createCols())
const pagination = ref({
  pageSize: 10
})


</script>

<template>
  <h2>Lista oddziałów położniczych w Wielkopolsce:</h2>
  <n-data-table
      :data="dataTable"
      :columns="columns"
      :single-line="false"
      :pagination="pagination"
  />
</template>

<style scoped>
</style>
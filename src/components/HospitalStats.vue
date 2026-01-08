<script setup lang="ts">

import SelectHospital from "./SelectHospital.vue";
import LineChart from "./LineChart.vue";
import SelectStatsType from "./SelectStatsType.vue";
import {ref} from "vue";

const statsType = ref()
const hospitalId = ref()

function onStatsTypeChanged(event: any) {
  statsType.value = event
}

function onHospitalIdChanged(event: any) {
  hospitalId.value = event
}

</script>

<template>
  <n-flex id="container"
          justify="center">
    <n-page-header title="Statystyki porodów dla szpitali"
                   subtitle="na podstawie z danych NFZ*"
    >
      <template #avatar>
        <n-avatar
            src="favicon.svg"
        />
      </template>
    </n-page-header>
    <SelectHospital @hospitalIdChanged="onHospitalIdChanged($event)"/>
    <SelectStatsType
        @statsTypeChanged="onStatsTypeChanged($event)"/>
    <n-divider/>
    <LineChart
        :hospital-id="hospitalId"
        :stats-type="statsType"/>
    <n-ellipsis style="margin-top: 10px">
      *Dane pochodzą z portalu <a href="https://ezdrowie.gov.pl/portal/home/badania-i-dane/zdrowe-dane/monitorowanie/porody-opieka-okoloporodowa">https://ezdrowie.gov.pl</a><br/>
      W przypadku roku 2025 dane podane są dla I półrocza
    </n-ellipsis>
  </n-flex>
</template>

<style scoped>
#container{
  margin-top: 30px;
  margin-left: 25%; margin-right: 25%;
}
</style>
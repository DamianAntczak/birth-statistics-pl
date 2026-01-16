<script setup lang="ts">

import SelectHospital from "./SelectHospital.vue";
import LineChart from "./LineChart.vue";
import SelectStatsType from "./SelectStatsType.vue";
import {ref} from "vue";
import {useHead} from "@unhead/vue";

const statsType = ref()
const hospitalId = ref()
const hospitalName = ref()

useHead({
  title: () => hospitalName.value ? 'Statystyki porodów 2010-2025 | ' + hospitalName.value : 'Statystyki porodów w Polsce 2010–2025 | Szpitale',
  meta: [
    {
      name: 'description',
      content: () => 'Interaktywne wykresy statystyk porodowych dla ' + (hospitalName.value ? hospitalName.value: 'szpitali' ) + ' z lat 2010–2025: liczba porodów, odsetek cięć cesarskich, odsetek nacięć krocza oraz odsetek znieczuleń.'
    }
  ],
  script: () => [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Hospital',
        name: hospitalName.value,
        url: 'https://statystykiporodow.netlify.app/hospital/' + hospitalId.value,
        medicalSpecialty: 'Obstetrics'
      })
    }
  ]
})

function onStatsTypeChanged(event: any) {
  statsType.value = event
}

function onHospitalChanged(payload: any) {
  hospitalId.value = payload.hospitalId
  hospitalName.value = payload.hospitalName
}


</script>

<template>
  <n-grid cols="10" item-responsive responsive="screen">
    <n-grid-item span="0 m:1 l:2">
    </n-grid-item>
    <n-grid-item span="10 m:8 l:6">
      <div class="content-container">

        <n-page-header title="Statystyki porodów dla szpitali"
                       subtitle="na podstawie z danych NFZ*"
        >
          <template #avatar>
            <n-avatar
                src="/favicon.svg"
            />
          </template>
        </n-page-header>
        <n-divider/>
        <SelectHospital
            @hospitalChanged="onHospitalChanged"
            :stats-type="statsType"
        />
        <n-flex justify="center">
          <SelectStatsType
              @statsTypeChanged="onStatsTypeChanged($event)"/>
        </n-flex>
        <n-divider/>
        <h2 v-if="hospitalName">Statystyki porodów w {{hospitalName}}</h2>
        <figure>
          <LineChart
              :hospital-id="hospitalId"
              :stats-type="statsType"/>
        </figure>
        <n-ellipsis style="margin-top: 10px">
          *Dane pochodzą z portalu <a
            href="https://ezdrowie.gov.pl/portal/home/badania-i-dane/zdrowe-dane/monitorowanie/porody-opieka-okoloporodowa">https://ezdrowie.gov.pl</a><br/>
          W przypadku roku 2025 dane podane są dla I półrocza
        </n-ellipsis>
      </div>
    </n-grid-item>
    <n-grid-item span="0 m:1 l:2">
    </n-grid-item>
  </n-grid>
</template>

<style scoped>
div.content-container {
  margin: 30px 10px;
}
</style>
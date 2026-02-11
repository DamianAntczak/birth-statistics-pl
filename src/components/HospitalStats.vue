<script setup lang="ts">

import SelectHospital from "./SelectHospital.vue";
import LineChart from "./LineChart.vue";
import SelectStatsType from "./SelectStatsType.vue";
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import Map from "./Map.vue";
import hospitals from '../assets/hospitals.json';

const statsType = ref()
const hospitalId = ref()
const hospital = ref()
const center = ref();

const route = useRoute();

useHead(() => {
  const hospitalId = route.params.hospitalId as string;
  if (!hospitalId) return {}

  const hospital = hospitals.find(h => h.id === hospitalId);
  const years = '2010–2025';

  return {
    title: hospital
      ? `Statystyki porodów ${hospital.city} ${years} | ${hospital.name}`
      : `Statystyki porodów w Polsce ${years} | Szpitale`,
    meta: [
      {
        name: 'description',
        content: hospital
          ? `Interaktywne statystyki porodów w ${hospital.name} w ${hospital.city} z lat ${years}. Liczba porodów, odsetek cięć cesarskich, nacięć krocza oraz znieczuleń.`
          : `Interaktywne statystyki porodów w szpitalach w Polsce z lat ${years}. Liczba porodów, cesarskie cięcia, nacięcia krocza oraz znieczulenia.`
      }
    ],
    script: () => [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Hospital',
          name: hospital?.name,
          url: 'https://statystykiporodow.pl/szpitale/' + hospitalId,
          medicalSpecialty: 'Obstetrics'
        })
      }
    ]
  }
}
);

function onStatsTypeChanged(event: any) {
  statsType.value = event
}

function onHospitalChanged(payload: any) {
  hospitalId.value = payload.hospitalId
  hospital.value = payload.hospital;
  center.value = { latitude: payload.hospital.latitude, longitude: payload.hospital.longitude };
}


</script>

<template>
  <div>
    <SelectHospital @hospitalChanged="onHospitalChanged" :stats-type="statsType" />
    <SelectStatsType @statsTypeChanged="onStatsTypeChanged($event)" />
    <h1 v-if="hospital" class="m-2">Statystyki porodów – {{ hospital.name }} w {{ hospital.city }}</h1>
    <h1 v-else class="m-2">Statystyki porodów w Polsce 2010-2025</h1>
    <LineChart :hospital="hospital" :stats-type="statsType" />
    <Panel header="Źródło danych">
      Dane pochodzą z portalu <a
        href="https://ezdrowie.gov.pl/portal/home/badania-i-dane/zdrowe-dane/monitorowanie/porody-opieka-okoloporodowa">https://ezdrowie.gov.pl</a><br />
      W przypadku roku 2025 dane podane są dla I półrocza
    </Panel>
    <Divider />
    <Map :center="center" v-if="center" :zoom="14" />
  </div>
</template>

<style scoped></style>
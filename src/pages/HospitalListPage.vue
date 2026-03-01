<script setup lang="ts">

import hospitals from '../assets/hospitals.json';
import { StatsType } from "../common/StatsType.ts";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import YearStatsRepository from "../repositories/YearStatsRepository.ts";
import { useHead } from '@unhead/vue';

const router = useRouter();
const hospitalArray = ref([]);
const sortKey = ref();
const sortField = ref();
const sortOrder = ref();
const sortOptions = ref([
  { label: 'Odsetek nacięć od najwyższego', value: '!episiotomies2025' },
  { label: 'Odsetek nacięć od najniższego', value: 'episiotomies2025' },
]);
const nameOrCity = ref<string>();

useHead({
  title: 'Statystyki porodów w Polsce 2010-2025 | Lista porodówek',
  meta: [{
    name: 'description',
    content: 'Sprawdź, jak rodzi się w Twoim regionie. Wybierz porodówkę z listy i śprawdź statystyki.'
  }]
});

async function createData() {
  const data = await Promise.all(

    hospitals.map(async hospital => {
      const hospitalStats = await YearStatsRepository.getGraphData(hospital.voivodeshipCode, hospital.id);
      return {
        id: hospital.id,
        name: hospital.name,
        city: hospital.city,
        voivodeshipCode: hospital.voivodeshipCode,
        births2010: hospitalStats.statistics[StatsType.Births][0],
        births2024: hospitalStats.statistics[StatsType.Births][14],
        cesareans2010: hospitalStats.statistics[StatsType.Cesareans][0],
        cesareans2025: hospitalStats.statistics[StatsType.Cesareans][15],
        episiotomies2010: hospitalStats.statistics[StatsType.Episiotomies][0],
        episiotomies2025: hospitalStats.statistics[StatsType.Episiotomies][15]
      };
    }));

  return data;
}

function getArrowClass(oldValue: number, newValue: number) {
  const diff = newValue - oldValue;
  if (Math.abs(diff) <= 3.0) {
    return 'pi pi-arrow-right';
  }

  if (diff > 0) {
    return diff <= 6.0
      ? 'pi pi-arrow-up-right'
      : 'pi pi-arrow-up';
  }

  return diff >= -6.0
    ? 'pi pi-arrow-down-right'
    : 'pi pi-arrow-down';
}

const show2025 = (item: any) => {
  return item.births2024 !== 0;
}

const onSortChange = (event) => {
  const value = event.value.value;
  const sortValue = event.value;
  console.log('onSortChange')

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1;
    sortField.value = value.replace('!', '');
    sortKey.value = sortValue;
  }
  else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
}


const filterHospitals = computed(() => {
  if (!nameOrCity.value) return hospitalArray.value;
  return hospitalArray.value.filter(item =>
    item.name.toLowerCase().includes(nameOrCity.value?.toLowerCase())
    || item.city.toLowerCase().includes(nameOrCity.value?.toLowerCase()))
});

const mapVoivodeshipCodeToName = (voivodeshipCode) => {
  switch (voivodeshipCode) {
    case 'PL-DS': return 'dolnośląskie';
    case 'PL-KP': return 'kujawsko-pomorskie';
    case 'PL-LB': return 'lubuskie';
    case 'PL-LD': return 'łódzkie';
    case 'PL-LU': return 'lubelskie';
    case 'PL-MA': return 'małopolskie';
    case 'PL-MZ': return 'mazowieckie';
    case 'PL-OP': return 'opolskie';
    case 'PL-PD': return 'podlaskie';
    case 'PL-PK': return 'podkarpackie';
    case 'PL-PM': return 'pomorskie';
    case 'PL-SK': return 'świętokrzyskie';
    case 'PL-SL': return 'śląskie';
    case 'PL-WN': return 'warmińsko-mazurskie';
    case 'PL-WP': return 'wielkopolskie';
    case 'PL-ZP': return 'zachodniopomorskie';
  }
};

onMounted(async () => {
  hospitalArray.value = await createData();
})

</script>

<template>
  <h1 class="m-4">Lista porodówek w Polsce</h1>
  <p class="m-4">
    Zobacz, ile rocznie porodów odbywa się w danym szpitalu oraz jaki jest odsetek cesarskich cięć, nacięć krocza i
    znieczuleń – na podstawie danych NFZ.
  </p>
  <DataView :value="filterHospitals" paginator :sortField="sortField" :sortOrder="sortOrder" :rows="10">
    <template #header>
      <div class="flex flex-col">
        <label for="nameOrCity">Nazwa lub miejscowość</label>
        <InputText id="nameOrCity" type="text" v-model="nameOrCity" />
      </div>

      <Select v-if="false" v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sortowanie"
        @change="onSortChange" />
    </template>
    <template #list="slotProps">
      <div class="flex flex-col">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <div class="flex flex-col sm:flex-row sm:items-center p-5 gap-4 m-2 rounded-lg shadow-lg border">
            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
              <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                <div>
                  <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.city }} -
                    <span class="font-normal">
                      {{ mapVoivodeshipCodeToName(item.voivodeshipCode) }}
                    </span>
                  </span>
                  <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                </div>
                <div class="flex flex-row-reverse md:flex-row gap-2">
                  <Button icon="pi pi-chart-line" label="Sprawdź statystyki"
                    class="flex-auto md:flex-initial whitespace-nowrap mt-5"
                    :onClick="() => router.push({ name: 'StatsHospital', params: { hospitalId: item.id } })"></Button>
                </div>
              </div>
              <div class="flex flex-col md:items-end gap-8">
                <div class="grid grid-cols-4 grid-rows-4 gap-4">
                  <div></div>
                  <div class="font-bold">2010</div>
                  <div></div>
                  <div class="font-bold" v-if="show2025(item)">2025</div>
                  <div class="row-start-2 font-bold">
                    Cięcia cesarskie
                  </div>
                  <div class="row-start-2">{{ item.cesareans2010 }}%</div>
                  <template v-if="show2025(item)">
                    <div class="row-start-2"><i :class="getArrowClass(item.cesareans2010, item.cesareans2025)"></i>
                    </div>
                    <div class="row-start-2">{{ item.cesareans2025 }}%</div>
                  </template>
                  <div class="row-start-3 font-bold">
                    Nacięcia krocza
                  </div>
                  <div class="row-start-3">{{ item.episiotomies2010 }}%</div>
                  <template v-if="show2025(item)">
                    <div class="row-start-3"><i
                        :class="getArrowClass(item.episiotomies2010, item.episiotomies2025)"></i></div>
                    <div class="row-start-3">{{ item.episiotomies2025 }}%</div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<style scoped></style>
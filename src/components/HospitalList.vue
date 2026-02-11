<script setup lang="ts">

import hospitals from '../assets/hospitals.json';
import { StatsType } from "../common/StatsType.ts";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import YearStatsRepository from "../repositories/YearStatsRepository.ts";

const router = useRouter();


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
        births2024: hospitalStats.statistics[StatsType.Births][13],
        cesareans2010: hospitalStats.statistics[StatsType.Cesareans][0],
        cesareans2025: hospitalStats.statistics[StatsType.Cesareans][14],
        episiotomies2010: hospitalStats.statistics[StatsType.Episiotomies][0],
        episiotomies2025: hospitalStats.statistics[StatsType.Episiotomies][14]
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

function show2025(item: any) {
  return item.births2024 !== 0;
}

const dataTable = ref([]);

onMounted(async () => {
  dataTable.value = await createData();
})

</script>

<template>

  <DataView :value="dataTable" paginator :rows="10">
    <template #list="slotProps">
      <div class="flex flex-col">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <div class="flex flex-col sm:flex-row sm:items-center p-5 gap-4 m-2 rounded-lg shadow-lg border">
            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
              <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                <div>
                  <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.city }} -
                    <span class="font-normal"><template v-if="item.voivodeshipCode === 'PL-PO'">wielkopolskie</template>
                    <template v-if="item.voivodeshipCode === 'PL-MZ'">mazowieckie</template></span>
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
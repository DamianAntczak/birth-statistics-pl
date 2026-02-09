<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {StatsType} from "../common/StatsType.ts";
import {Baby0203m, SurgicalSterilization, Syringe, VascularSurgeryOutline} from "healthicons-vue";
import SelectButton from 'primevue/selectbutton';


const router = useRouter();
const route = useRoute();

const hospitalId = route.params.hospitalId as string;

const statisticType = ref('');

const types = [
      {
        value: StatsType.Births,
        label: 'Liczba porodów'
      },
      {
        value: StatsType.Cesareans,
        label: 'Odsetek cięć cesarskich'
      },
      {
        value: StatsType.Episiotomies,
        label: 'Odsetek nacięć krocza',
      },
      {
        value: StatsType.Anesthesias,
        label: 'Odsetek znieczuleń'
      }
    ]
;

const emit = defineEmits({statsTypeChanged: (_value: string) => true})


watch(statisticType, (newValue) => {
  router.push({name: 'StatsDetail', params: {hospitalId: hospitalId, statsType: newValue}})
  statisticTypeChanged(statisticType.value)
});

watch(() => route.params.statsType, (newValue) => {
  if (newValue && statisticType.value !== newValue) {
    statisticType.value = newValue.toString();
    statisticTypeChanged(statisticType.value)
  }
}, {immediate: true});


function statisticTypeChanged(value: any) {
  emit('statsTypeChanged', value)
}

</script>

<template>
  <div class="card flex justify-center">
    <SelectButton v-model="statisticType" :options="types"
                  optionLabel="label" option-value="value" size="small">
      <template #option="slotProps">
        <Baby0203m v-if="slotProps.option.value === StatsType.Births"/>
        <VascularSurgeryOutline v-else-if="slotProps.option.value === StatsType.Cesareans"/>
        <SurgicalSterilization v-else-if="slotProps.option.value === StatsType.Episiotomies"/>
        <Syringe v-if="slotProps.option.value === StatsType.Anesthesias"/>
        <span>{{slotProps.option.label}}</span>
      </template>
    </SelectButton>
  </div>

</template>

<style scoped>
@media (max-width: 640px) {
  .p-selectbutton {
    flex-direction: column;
  }

  .p-selectbutton .p-button {
    width: 100%;
  }
}
</style>
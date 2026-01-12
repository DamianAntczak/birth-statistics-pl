<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import hospitals from '../assets/hospitals.json';


const router = useRouter();
const route = useRoute();

const hospitalId = ref();

const props = defineProps<{
  statsType?: string
}>()

const emit = defineEmits({hospitalChanged:
      (_payload: {hospitalId: string, hospitalName?: string}) => true}
)

function hospitalIdChanged(id: string) {
  const hospitalName = Object.values(hospitals).find(hospital => hospital.value === id)?.label;
  emit('hospitalChanged', {hospitalId: id, hospitalName: hospitalName})
}

watch(hospitalId, (_newValue) => {
  if(props.statsType !== undefined) {
    router.push({name: 'StatsDetail', params: {hospitalId: _newValue, statsType: props.statsType}})
  } else {
    router.push({name: 'StatsHospital', params: {hospitalId: _newValue}})
  }
});

watch(() => route.params.hospitalId, (newValue) => {
  if (newValue && hospitalId.value !== newValue) {
    hospitalId.value = newValue.toString();
    hospitalIdChanged(hospitalId.value)
  }
}, { immediate: true });

</script>

<template>
  <n-form-item label="Szpital" label-placement="left" style="width: 100%">
    <n-select name="hospitals" id="hospitals"
              :options="hospitals"
              placeholder="Wybierz szpital"
              v-model:value="hospitalId"
              @update:value="hospitalIdChanged"
    />
  </n-form-item>
</template>

<style scoped>

</style>
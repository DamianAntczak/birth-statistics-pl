<script setup lang="ts">
import {computed, h, ref, type VNodeChild, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import hospitals from '../assets/hospitals.json';
import {Hospital} from "healthicons-vue";
import Select from 'primevue/select';


const router = useRouter();
const route = useRoute();

const hospitalId = ref();
const selectedHospitalId = computed({
  get() {
    return hospitals.find(hospital => hospital.id === hospitalId.value) || null;
  },
  set(value) {
    if (value) {
      hospitalId.value = value.id
    } else {
      hospitalId.value = null;
    }
  }
});


const props = defineProps<{
  statsType?: string
}>()

const emit = defineEmits({hospitalChanged:
      (_payload: {hospitalId: string, hospital?: any}) => true}
)

function hospitalIdChanged(id: string) {
  const hospital = Object.values(hospitals).find(hospital => hospital.id === id);
  emit('hospitalChanged', {hospitalId: id, hospital: hospital})
}

watch(hospitalId, (_newValue) => {
  if(props.statsType !== undefined) {
    router.push({name: 'StatsDetail', params: {hospitalId: _newValue, statsType: props.statsType}})
  } else {
    router.push({name: 'StatsHospital', params: {hospitalId: _newValue}})
  }
  hospitalIdChanged(_newValue)
});

watch(() => route.params.hospitalId, (newValue) => {
  if (newValue && hospitalId.value !== newValue) {
    hospitalId.value = newValue.toString();
    hospitalIdChanged(hospitalId.value)
  }
}, { immediate: true });

</script>

<template>
  <div class="card flex flex-col items-center gap-4">
    <Select v-model="selectedHospitalId" :options="hospitals" size="small" id="hospitals"
      placeholder="Wybierz szpital" filter :filter-fields="['name','city']" fluid>
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
          <div><Hospital height="18px" style="vertical-align: -0.25em"/> {{slotProps.value?.name}} | {{slotProps.value?.city}}</div>
        </div>
        <span v-else>{{slotProps.placeholder}}</span>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <div><Hospital height="18px" style="vertical-align: -0.25em"/> {{slotProps.option.name}} | {{slotProps.option.city}}</div>
        </div>
      </template>
    </Select>
  </div>
</template>

<style scoped>

</style>
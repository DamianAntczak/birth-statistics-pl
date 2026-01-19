<script setup lang="ts">
import {h, ref, type VNodeChild, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import hospitals from '../assets/hospitals.json';
import {NIcon, type SelectOption} from "naive-ui";
import {Hospital} from "healthicons-vue";


const router = useRouter();
const route = useRoute();

const hospitalId = ref();

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
});

watch(() => route.params.hospitalId, (newValue) => {
  if (newValue && hospitalId.value !== newValue) {
    hospitalId.value = newValue.toString();
    hospitalIdChanged(hospitalId.value)
  }
}, { immediate: true });

function renderLabel(option: SelectOption): VNodeChild {
  return [
    h(
        NIcon,
        {
          style: {
            verticalAlign: '-0.15em',
            marginRight: '4px'
          }
        },
        {
          default: () => h(Hospital)
        }
    ),
    option.name as string,
    ' | ',
    option.city as string
  ]
}

function filter(pattern: string, option: any) {
  return  option?.name.toLowerCase().includes(pattern.toLowerCase()) ||
      option?.city.toLowerCase().includes(pattern.toLowerCase())
}

</script>

<template>
  <n-form-item label="Szpital" label-placement="left" style="width: 100%">
    <n-select name="hospitals" id="hospitals"
              :options="hospitals"
              filterable
              placeholder="Wybierz szpital"
              :render-label="renderLabel"
              :filter="filter"
              value-field="id"
              v-model:value="hospitalId"
              @update:value="hospitalIdChanged"
    />
  </n-form-item>
</template>

<style scoped>

</style>
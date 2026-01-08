<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const options = [
  {label: 'Specjalistyczny Zespół Opieki Zdrowotnej Nad Matką i Dzieckiem w Poznaniu', value: '150003180'},
  {
    label: 'Ginekologiczno-Położniczy Szpital Kliniczny Uniwersytetu Medycznego im. Karola Marcinkowskiego w Poznaniu',
    value: '150000001'
  },
  {label: 'Szpital Miejski im. Franciszka Raszei', value: '150000072'},
  {label: 'Szpital Wojewódzki w Poznaniu', value: '150000038'}
]

const router = useRouter();
const route = useRoute();

const hospitalId = ref();

const emit = defineEmits({hospitalIdChanged: (value: string) => true})

function hospitalIdChanged(value: any) {
  emit('hospitalIdChanged', value)
}

watch(hospitalId, (newValue) => {
  if (router && route) {
    router.push({
      query: {
        ...route.query,
        hospitalId: newValue
      }
    });
  }
});

watch(() => route.query.hospitalId, (newValue) => {
  if (newValue && hospitalId.value !== newValue) {
    hospitalId.value = newValue.toString();
    hospitalIdChanged(hospitalId.value)
  }
}, { immediate: true });

</script>

<template>
  <n-form-item label="Szpital" label-placement="left" style="width: 100%">
    <n-select name="hospitals" id="hospitals"
              :options="options"
              placeholder="Wybierz szpital"
              v-model:value="hospitalId"
              @update:value="hospitalIdChanged"
    />
  </n-form-item>
</template>

<style scoped>

</style>
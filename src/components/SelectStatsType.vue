<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {StatsType} from "../common/StatsType.ts";

const router = useRouter();
const route = useRoute();


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
        label: 'Odsetek nacięć krocza'
      },
      {
        value: StatsType.Anesthesias,
        label: 'Odsetek znieczuleń'
      }
    ]
;

const emit = defineEmits({statsTypeChanged: (value: string) => true})


watch(statisticType, (newValue) => {
    router.push({
      query: {
        ...route.query,
        statsType: newValue
      }
    });
    statisticTypeChanged(statisticType.value)
});

watch(() => route.query.statsType, (newValue) => {
  if (newValue && statisticType.value !== newValue) {
    statisticType.value = newValue.toString();
    statisticTypeChanged(statisticType.value)
  }
}, { immediate: true });




function statisticTypeChanged(value: any) {
  emit('statsTypeChanged', value)
}

</script>

<template>
  <n-radio-group
      v-model:value="statisticType"
      @update:value="statisticTypeChanged">
    <n-radio-button
        v-for="type in types"
        :key="type.value"
        :value="type.value"
        :label="type.label"

    />
  </n-radio-group>
</template>

<style scoped>


</style>
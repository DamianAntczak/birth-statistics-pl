<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {StatsType} from "../common/StatsType.ts";
import {Baby0203m, SurgicalSterilization, Syringe, VascularSurgeryOutline} from "healthicons-vue";
import {NIcon} from "naive-ui";

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
  router.push({name: 'StatsDetail', params: {statsType: newValue}})
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
  <n-radio-group
      v-model:value="statisticType"
      @update:value="statisticTypeChanged">
    <n-radio-button
        v-for="type in types"
        :key="type.value"
        :value="type.value"
    >
      <div>
        <n-icon size="2em" class="type-icon">
          <Baby0203m v-if="type.value === StatsType.Births"/>
          <VascularSurgeryOutline v-else-if="type.value === StatsType.Cesareans"/>
          <SurgicalSterilization v-else-if="type.value === StatsType.Episiotomies"/>
          <Syringe v-if="type.value === StatsType.Anesthesias"/>
        </n-icon>
        {{ type.label }}
      </div>
    </n-radio-button>
  </n-radio-group>
</template>

<style scoped>
.type-icon {
  vertical-align: -0.35em;
  margin-right: 8px;
}
</style>
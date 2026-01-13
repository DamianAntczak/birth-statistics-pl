<script setup lang="ts">
import HospitalStats from "./components/HospitalStats.vue";
import {HealthiconsProvider} from "healthicons-vue";
</script>

<template>
  <HealthiconsProvider
      :icon-props="{}"
  >
    <HospitalStats/>
  </HealthiconsProvider>
</template>

<style scoped>


</style>

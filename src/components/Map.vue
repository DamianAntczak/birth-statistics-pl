<script setup lang="ts">
import {ref} from "vue";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";

const map = ref<any>(undefined);

const zoom = ref(14);

defineProps<{
  latitude: number,
  longitude: number
}>();

</script>

<template>
  <div style="height:600px;" v-if="longitude && longitude">
    <LMap ref="map" v-model:zoom="zoom" :center="[latitude, longitude]">
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></LTileLayer>
      <LMarker :lat-lng="[latitude, longitude]"/>
    </LMap>
  </div>
</template>

<style scoped>

</style>
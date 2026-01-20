<script setup lang="ts">
import {ref} from "vue";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";

const map = ref<any>(undefined);

const zoom = ref(14);

defineProps<{
  latitude: number
  longitude: number
}>();

</script>

<template>
  <div style="height:600px;" v-if="longitude && longitude">
    <l-map ref="map" v-model:zoom="zoom" :center="[latitude, longitude]"
           :use-global-leaflet="false">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="[latitude, longitude]"/>
    </l-map>
  </div>
</template>

<style scoped>

</style>
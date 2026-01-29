<script setup lang="ts">
import {LMap, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {type PropType, ref} from "vue";

import hospitals from '../assets/hospitals.json'
import L from 'leaflet'

const mapRef = ref<any>(null);

interface Coordinates {
  latitude: number;
  longitude: number;
}

defineProps({
  center: {
    type: Object as PropType<Coordinates>,
    default: () => ({latitude: 52.33333, longitude: 17.23333}),
    required: false
  },
  zoom: {
    type: Number,
    default: 7.5
  }
});


function onMapReady() {
  const map = mapRef.value.leafletObject

  const cluster = L.markerClusterGroup()

  hospitals.forEach(h => {
    cluster.addLayer(
        L.marker([h.latitude, h.longitude])
            .bindTooltip(h.name)
            .on('click', () => window.location.href = '/szpital/' + h.id)
    )
  })

  map.addLayer(cluster)
}

</script>

<template>
  <div style="height:600px;">
    <l-map ref="mapRef" :zoom="zoom" :center="[center.latitude, center.longitude]"
           :maxZoom="19"
           :use-global-leaflet="true"
           @ready="onMapReady">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      />
    </l-map>
  </div>
</template>

<style scoped>

</style>
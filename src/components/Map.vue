<script setup lang="ts">
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { type PropType, ref } from "vue";

import hospitals from '../assets/hospitals.json'
import { useRouter } from "vue-router";

const router = useRouter();
const mapRef = ref<any>(null);

interface Coordinates {
  latitude: number;
  longitude: number;
}

defineProps({
  center: {
    type: Object as PropType<Coordinates>,
    default: () => ({ latitude: 52.33333, longitude: 17.23333 }),
    required: false
  },
  zoom: {
    type: Number,
    default: 7.5
  }
});


async function onMapReady() {
  if (typeof window === 'undefined') return;

  const L = await import('leaflet');

  window.L = L;

  await import('leaflet.markercluster');

  const map = mapRef.value.leafletObject;

  const cluster = L.markerClusterGroup();

  hospitals.forEach(hospital => {
    cluster.addLayer(
      L.marker([hospital.latitude, hospital.longitude])
        .bindTooltip(hospital.name)
        .on('click', () => { router.push({ name: 'StatsHospital', params: { hospitalId: hospital.id } }) })
    )
  })

  map.addLayer(cluster)
}

</script>

<template>
  <div>
    <client-only>
      <div style="height:600px;">
        <l-map ref="mapRef" :zoom="zoom" :center="[center.latitude, center.longitude]" :maxZoom="19"
          :use-global-leaflet="true" @ready="onMapReady">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
            name="OpenStreetMap" />
        </l-map>
      </div>
    </client-only>
  </div>
</template>

<style scoped></style>
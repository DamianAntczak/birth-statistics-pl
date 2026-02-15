<script setup lang="ts">
import Supercluster from 'supercluster'
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
    default: () => ({ latitude: 52.191097, longitude: 19.355406 }),
    required: false
  },
  zoom: {
    type: Number,
    default: 6
  }
});


async function onMapReady() {
  if (typeof window === 'undefined') return
  const L = (await import('leaflet')).default

  const map = mapRef.value.leafletObject

  const points = hospitals.map(hospital => ({
    type: 'Feature',
    properties: {
      hospitalId: hospital.id,
      name: hospital.name
    },
    geometry: {
      type: 'Point',
      coordinates: [hospital.longitude, hospital.latitude]
    }
  }))

  const index = new Supercluster({
    radius: 120,
    maxZoom: 18
  })

  index.load(points)

  const layer = L.layerGroup()

  function renderClusters() {
    layer.clearLayers()

    const bounds = map.getBounds()
    const zoom = map.getZoom()

    const clusters = index.getClusters(
      [
        bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()
      ],
      zoom
    )

    clusters.forEach(feature => {
      const [lng, lat] = feature.geometry.coordinates
      const { cluster, point_count } = feature.properties

      if (cluster) {
        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            html: `<div class="cluster">${point_count}</div>`,
            className: 'cluster-wrapper',
            iconSize: [40, 40]
          })
        })

        marker.on('click', () => {
          map.setView([lat, lng], zoom + 2)
        })

        layer.addLayer(marker)
      } else {
        const marker = L.marker([lat, lng])
          .bindTooltip(feature.properties.name)
          .on('click', () => {
            router.push({
              name: 'StatsHospital',
              params: { hospitalId: feature.properties.hospitalId }
            })
          })

        layer.addLayer(marker)
      }
    })
  }

  map.on('moveend zoomend', renderClusters)

  renderClusters()
  map.addLayer(layer)
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
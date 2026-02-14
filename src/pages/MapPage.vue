<script setup lang="ts">
import Map from '../components/Map.vue';
import { useHead } from "@unhead/vue";


useHead({
    title: 'Statystyki porodów w Polsce 2010-2025 | Mapa porodówek',
    meta: [{
        name: 'description',
        content: 'Sprawdź, jak rodzi się w Twoim regionie. Wybierz porodówkę na mapie i śprawdź statystyki.'
    }]
})

</script>

<template>
    <div>
        <h1>Mapa porodówek w Polsce</h1>
        <p class="mt-1 mb-4">
            Zobacz, ile rocznie porodów odbywa się w danym szpitalu oraz jaki jest odsetek cesarskich cięć, nacięć krocza i znieczuleń – na podstawie danych NFZ.
        </p>
        <Map />
    </div>
</template>

<style scoped></style>
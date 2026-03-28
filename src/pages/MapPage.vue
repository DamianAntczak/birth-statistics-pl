<script setup lang="ts">
import Map from '../components/Map.vue';
import { useHead } from "@unhead/vue";
import { ref } from "vue";


useHead({
    title: 'Statystyki porodów w Polsce 2010-2025 | Mapa porodówek',
    meta: [{
        name: 'description',
        content: 'Sprawdź, jak rodzi się w Twoim regionie. Wybierz porodówkę na mapie i śprawdź statystyki.'
    }]
})

const showAll = ref(false);

</script>

<template>
    <Card class="mt-4">
        <template #content>

            <h1>Mapa porodówek w Polsce</h1>

            <Divider/>

            <p class="mt-1 mb-4">
                Zobacz, ile rocznie porodów odbywa się w danym szpitalu oraz jaki jest odsetek cesarskich cięć, nacięć
                krocza i znieczuleń – na podstawie danych NFZ.
            </p>
            <Card class="mt-2 mb-2">
                <template #content>
                    <div class="flex items-center gap-3">

                        <ToggleSwitch inputId="active" v-model="showAll" />
                        <label for="active">Wyświetlaj również archiwalne porodówki</label>
                    </div>
                </template>
            </Card>
            <Card>
                <template #content>
                    <Map :show-all="showAll" />
                </template>
            </Card>
        </template>
    </Card>
</template>

<style scoped></style>
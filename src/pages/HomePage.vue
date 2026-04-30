<script setup lang="ts">
import { useRouter } from 'vue-router';
import hospitals from '../assets/hospitals.json';
import { StatsType } from "../common/StatsType.ts";
import LineChart from '../components/LineChart.vue';

const hospitalArray = Object.values(hospitals);
const hospitalSize = hospitalArray.length;

const router = useRouter();

function goToRandomHospital() {
    const random = Math.floor(Math.random() * hospitalSize);
    const hospital = hospitalArray[random];
    router.push({ name: 'StatsHospital', params: { hospitalId: hospital.id } })
}

</script>
<template>
    <p hidden>
        Projekt powstał w odpowiedzi na <a
            href="https://app.powerbi.com/view?r=eyJrIjoiNGM0OWM5ZWMtYTdmYS00NzRkLTkxYjQtOTMxNjExNDhhN2FhIiwidCI6IjJlNzcwYzE2LWMwNzEtNDA1Mi04MzdjLTU0NWJlZTBiMzQwYyIsImMiOjl9"
            target="_blank">raport interaktywny</a>,
        który nie dostarcza wystarczającej wartości kobietom poszukującym szpitala do porodu.
        W szczególności brakuje w nim procentowego wskaźnika porodów z nacięciem krocza, a także możliwości analizy
        zmian w czasie z powodu braku wizualizacji trendów.
    </p>
    <p>
        Celem projektu jest stworzenie narzędzia, które w przejrzysty i dostępny sposób prezentuje kluczowe wskaźniki
        jakości opieki okołoporodowej.
        Dzięki temu użytkowniczki i użytkownicy mogą łatwiej porównywać szpitale i podejmować bardziej świadome decyzje dotyczące
        wyboru miejsca porodu.
    </p>

    <div class="chart-container">
        <Card>
            <template #title>
                Odsetek cięć cesarskich w Polsce w latach 2010-2025
            </template>
            <template #content>
                <LineChart :poland="true" :stats-type="StatsType.Cesareans"/>
            </template>
        </Card>

        <Card>
            <template #title>
                Odsetek nacięć krocza w Polsce w latach 2010-2025
            </template>
            <template #content>
                <LineChart :poland="true" :stats-type="StatsType.Episiotomies"/>
            </template>
        </Card>
    </div>

    <Card style="width: 25rem; overflow: hidden" hidden>
        <template #title>Losowe statystyki</template>
        <template #content>Przejdź do statystyk losowego szpitala</template>
        <template #footer>
            <Button label="Losuj" @click="goToRandomHospital" />
        </template>
    </Card>
</template>

<style scoped>
.chart-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 1rem;
  padding-top: 20px;
}
</style>
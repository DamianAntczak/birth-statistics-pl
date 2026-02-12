<script setup lang="ts">
import { HealthiconsProvider } from "healthicons-vue";
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";


const menuItems = ref<MenuItem[] | undefined>([
  {
    label: 'Statystki porodów',
    icon: 'pi pi-chart-line',
    url: '/'
  },
  {
    label: 'Lista szpitali',
    icon: 'pi pi-list',
    url: '/szpitale'
  },
  {
    label: 'Mapa porodówek',
    icon: 'pi pi-map',
    url: '/mapa'
  }
]);

</script>

<template>
  <HealthiconsProvider :icon-props="{ 'height': '1.75em' }">
    <nav class="card">
      <menubar :model="menuItems">
        <template #start>
          <Image src="/favicon.svg" alt="Logo statystykiporodow.pl" width="50" />
        </template>
      </menubar>
    </nav>
    <div class="max-w-7xl mx-auto px-*">
      <RouterView />
      <footer>
        <div style="text-align: center">
          <Button label="Primary" variant="text">
            <i class="pi pi-list" />
            <RouterLink to="/szpitale">Lista oddziałów położniczych</RouterLink>
          </Button>
          |
          <Button label="primary" variant="text">
            <i class="pi pi-map" />
            <RouterLink to="/mapa">Mapa oddziałów położniczych</RouterLink>
          </Button>
        </div>
      </footer>
    </div>
  </HealthiconsProvider>
</template>

<style scoped></style>
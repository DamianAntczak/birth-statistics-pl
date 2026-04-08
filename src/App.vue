<script setup lang="ts">
import { HealthiconsProvider } from "healthicons-vue";
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import { useRoute } from "vue-router";


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

const route = useRoute();


</script>

<template>
  <HealthiconsProvider :icon-props="{ 'height': '1.75em' }">
    <nav class="card">
      <menubar :model="menuItems">
        <template #start>
          <Image src="/favicon.svg" alt="Logo statystykiporodow.pl" width="50" />
        </template>
        <template #item="{ item, props }">
          <router-link v-if="item.url" v-slot="{ href, navigate, isActive }" :to="item.url" custom>
            <a :href="href" v-bind="props.action" @click="navigate" :class="{ 'active-menu-item': isActive }">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
          </router-link>
        </template>
      </menubar>
    </nav>
    <div class="max-w-7xl mx-auto px-*">
      <Card class="mt-4">
        <template #content>
            <h1 class="text-4xl font-bold">{{ route.meta.title }}</h1>

            <Divider/>
            <RouterView />

          </template>
        </Card>
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

<style scoped>
a.active-menu-item {
  color: #e86a92ff;
}
</style>
<script setup lang="ts">
import {HealthiconsProvider, Temple} from "healthicons-vue";
import type {MenuItem} from "primevue/menuitem";
import {ref} from "vue";


const menuItems = ref<MenuItem | undefined>([
  {
    label: 'Statystki porodów',
    icon: 'pi pi-home',
    url: '/'
  }
]);

</script>

<template>
  <HealthiconsProvider
      :icon-props="{'height': '1.75em'}"
  >
    <nav class="card">
      <menubar :model="menuItems" >
        <template #start>
          <Image src="/favicon.svg" alt="Logo statystykiporodow.pl" width="50" />
        </template>
      </menubar>
    </nav>
    <n-config-provider>
      <n-grid cols="10" item-responsive responsive="screen">
        <n-grid-item span="0 m:1">
        </n-grid-item>
        <n-grid-item span="10 m:8">
          <div class="content-container">
            <header>
              <n-page-header title="Statystyki porodów dla szpitali"
                             subtitle="na podstawie z danych NFZ*"
              >
                <n-divider/>
                <template #avatar>
                  <n-avatar
                      src="/favicon.svg"
                  />
                </template>
              </n-page-header>
            </header>
            <RouterView/>
            <footer>
              <n-divider/>
              <div style="text-align: center">
                <n-button text tag="a" href="/szpital">Lista oddziałów położniczych w Wielkopolsce</n-button>
                |
                <n-button text tag="a" href="/mapa">Mapa oddziałów położniczych w Wielkopolsce</n-button>
              </div>
            </footer>
          </div>
        </n-grid-item>
        <n-grid-item span="0 m:1">
        </n-grid-item>
      </n-grid>
    </n-config-provider>
  </HealthiconsProvider>
</template>

<style scoped>
div.content-container {
  margin: 30px 10px;
}
</style>
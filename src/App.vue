<script setup lang="ts">
import {HealthiconsProvider} from "healthicons-vue";
</script>

<template>
  <HealthiconsProvider
      :icon-props="{}"
  >
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
                <n-button text tag="a" href="/hospital">Lista oddziałów położniczych w Wielkopolsce</n-button>
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
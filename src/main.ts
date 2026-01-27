import {createApp} from 'vue'
import './style.css'
import naive from "naive-ui";
import App from './App.vue'
import PrimeVue from 'primevue/config';
import {createRouter, createWebHistory} from "vue-router";
import {createHead} from '@unhead/vue/client'
import HospitalStats from "./components/HospitalStats.vue";
import HospitalList from "./components/HospitalList.vue";
import Map from "./components/Map.vue";
import Aura from '@primeuix/themes/aura';

import 'leaflet.markercluster'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import {Menubar, Image} from "primevue";

const routes = [

    {
        path: '/',
        name: 'StatsRoot',
        component: HospitalStats
    },
    {
        path: '/mapa',
        name: 'AllMap',
        component: Map
    },
    {
        path: '/szpital',
        name: 'HospitalList',
        component: HospitalList
    },
    {
        path: '/szpital/:hospitalId',
        name: 'StatsHospital',
        component: HospitalStats
    },
    {
        path: '/szpital/:hospitalId/:statsType',
        name: 'StatsDetail',
        component: HospitalStats
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);
app.use(naive);
app.use(router);
app.use(createHead());
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Menubar', Menubar);
app.component('Image', Image);
app.mount('#app');

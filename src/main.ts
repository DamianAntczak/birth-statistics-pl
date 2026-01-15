import {createApp} from 'vue'
import './style.css'
import naive from "naive-ui";
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import { createHead } from '@unhead/vue/client'
import HospitalStats from "./components/HospitalStats.vue";

const routes = [

    {
        path: '/',
        name: 'StatsRoot',
        component: HospitalStats
    },
    {
        path: '/hospital/:hospitalId',
        name: 'StatsHospital',
        component: HospitalStats
    },
    {
        path: '/hospital/:hospitalId/statsType/:statsType',
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
app.use(createHead())
app.mount('#app');

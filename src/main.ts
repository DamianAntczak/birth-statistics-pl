import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import {createHead} from '@unhead/vue/client'
import HospitalStatsPage from "./pages/HospitalStatsPage.vue";
import HospitalListPage from "./pages/HospitalListPage.vue";
import HomePage from './pages/HomePage.vue';
import MapPage from './pages/MapPage.vue';
import Aura from '@primeuix/themes/aura';


import 'leaflet/dist/leaflet.css'
import 'primeicons/primeicons.css'

import {Menubar, Image} from "primevue";

const routes = [

    {
        path: '/',
        name: 'StatsRoot',
        component: HospitalStatsPage,
        meta: { title: 'Statystyki porodów w Polsce 2010-2025'}
    },
    {
        path: '/mapa',
        name: 'AllMap',
        component: MapPage,
        meta: { title: 'Mapa porodówek w Polsce' }
    },
    {
        path: '/szpitale',
        name: 'HospitalList',
        component: HospitalListPage,
        meta: { title: 'Lista porodówek w Polsce' }
    },
    {
        path: '/szpitale/:hospitalId',
        name: 'StatsHospital',
        component: HospitalStatsPage,
        meta: { title: 'Statystyki porodów w Polsce 2010-2025' }
    },
    {
        path: '/szpitale/:hospitalId/:statsType',
        name: 'StatsDetail',
        component: HospitalStatsPage,
        meta: { title: 'Statystyki porodów w Polsce 2010-2025' }
    }
]


export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    const head = createHead()

    ctx.app.use(head)

    ctx.head = head

    ctx.app.use(PrimeVue, {
      theme: {
        preset: Aura,
      },
    })

    ctx.app.component('Menubar', Menubar)
    ctx.app.component('Image', Image)

  }
)